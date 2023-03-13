import React, {useState, useEffect} from 'react';
import { Form, Input, Button,Picker,TextArea,Selector,Toast } from 'antd-mobile';
import s from './index.module.scss';
import IndexApi from '@/api/index'

function Index() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState({ label: '日报', value: '1' });
  const [selectLable, setSelectLable] = useState([]);
  const [initialValues,setInitialValues] = useState({});
  const basicColumns = [
    [
      { label: '日报', value: '1' },
      { label: '年报', value: '2' },
    ]
  ]
  const mapOptions = {
    '宣传惠企政策情况':'0',
    '了解企业需求情况':'1',
    '助企纾难解困情况':'2',
    '指导企业党建情况':'3',
    '营商环境监督情况':'4',
    '办理实事好事情况':'5',
    '其他工作情况':'1',
  }
  const options = [
    [{
      label: '宣传惠企政策情况',
      value: '0',
    }],
    [{
      label: '了解企业需求情况',
      value: '1',
    }],
    [{
      label: '助企纾难解困情况',
      value: '2',
    }],
    [{
      label: '指导企业党建情况',
      value: '3',
    }],
    [{
      label: '营商环境监督情况',
      value: '4',
    }],
    [{
      label: '办理实事好事情况',
      value: '5',
    }],
    [{
      label: '其他工作情况',
      value: '5',
    }],
  ];
  useEffect(()=>{
    if(type.value==1){
      IndexApi.getDailyStatus().then(res=>{
        console.log(res);
        const {code,data} =res; 
        if(code==0&&data.report){
          const {type,content}=data.report[0];
          let result = {};
          result[type]=content;
          setInitialValues(data.report);
        }
      })
    } else {
      IndexApi.getYearlyStatus().then(res=>{
        const {code,data} =res; 
        if(code==0&&data.report){
          setInitialValues(data.report[0]);
          setSelectLable(mapOptions[data.report[0].type])
        }
      })
    }
  },[type])
  const onFinishYear = (values)=>{
    const report=[ 
      {
          "type": "年度报告",
          "content": values.content
     }
    ]
    IndexApi.saveYearlyReport({report}).then(res=>{
      const {code} = res
      if(code==0){
        Toast.show({
          icon: 'success',
          content: '保存成功',
        })
      }
    }
    )
    console.log('onFinishYear',values);

  }
  const onFinishDay = (values)=>{
    const key = Object.keys(values);
    const report = [{type:options[key[0]][0].label,content:values[key[0]]}]
    IndexApi.saveDailyReport({report}).then(res=>{
      const {code} = res
      if(code==0){
        Toast.show({
          icon: 'success',
          content: '保存成功',
        })
      }
    }
    )
    console.log('onFinishDay',values);
  }
  const formRef = React.createRef();
  return (
    <div className={s.editPage}>
      <Form layout='horizontal'>
        <Form.Item label='填写类型'>
        <Input placeholder='请选择'
            onFocus={() => {
              setVisible(true)
            }}
            value={type.label}
          />
          <Picker
            columns={basicColumns}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            onConfirm={(v,extend) => {
              setType(extend.items[0])
            }}
          />
        </Form.Item>
      </Form>
      {type.value=='2'?
        <Form
         layout='horizontal'
         initialValues={initialValues}
         onFinish={onFinishYear}
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
        }>
          <Form.Item label='' name='content'>
            <TextArea
                placeholder='请输入内容'
                autoSize={{ minRows: 3, maxRows: 10 }}
              />
          </Form.Item>
        </Form>:
        
        <Form
          ref={formRef}
          onFinish={onFinishDay}
          footer={
            <Button block type='submit' color='primary' size='large'>
              提交
            </Button>
        }
        >
          {
          options.map((item,idx)=>{
            return <>
            <Form.Item label=''>
              <Selector
                columns={1}
                options={item}
                disabled={selectLable.indexOf(`${idx}`)<0&&selectLable.length>0}
                onChange={(val)=>{
                  if(val.length>0){
                    const selectId = val[0];
                    console.log('selectId',selectId);
                    if(selectLable.indexOf(selectId)<0){

                      setSelectLable([...selectLable, val[0]]);
                    }
                  }else {
                    let data = [...selectLable];
                    data.splice(selectLable.indexOf(`${idx}`),1);
                    setSelectLable(data);
                  }
                }}
              />
            </Form.Item>
            {selectLable.indexOf(`${idx}`)>-1&&<Form.Item label={item[0].label} name={item[0].value}>
              <TextArea
                  placeholder='请输入内容'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  maxLength={60}
                />
            </Form.Item>}
            </>
          })
        }
        </Form>
      }
    </div>
  )
}

export default Index
