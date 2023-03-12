import React, {useState, useEffect} from 'react';
import { Form, Input, Button,Picker,TextArea,Selector } from 'antd-mobile';
import { FormInstance } from 'antd-mobile/es/components/form/form';
import s from './index.module.scss';

function Index() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<any>({ label: '日报', value: '1' });
  const [selectLable, setSelectLable] = useState<any>([]);
  const basicColumns = [
    [
      { label: '日报', value: '1' },
      { label: '年报', value: '2' },
    ]
  ]
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
  const onFinishYear = (values)=>{
    console.log('onFinishYear',values);

  }
  const onFinishDay = (values)=>{
    console.log('onFinishDay',values);
  }
  const formRef = React.createRef<FormInstance>();
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
                disabled={selectLable.indexOf(`${idx}`)<0&&selectLable.length>2}
                onChange={(val)=>{
                  if(val.length>0){
                    const selectId = val[0];
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
