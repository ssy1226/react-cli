import React, {useState, useEffect} from 'react';
import { Form, Input, Button,Picker,TextArea,Selector,Toast } from 'antd-mobile';
import s from './index.module.scss';
import IndexApi from '@/api/index'

function Index() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState({ label: '日报', value: '1' });
  const [status,setStatus] = useState(0);
  const [reportId,setReportID] = useState();
  const [dailyform] = Form.useForm();
  const [yearlyform] = Form.useForm();
  const basicColumns = [
    [
      { label: '日报', value: '1' },
      { label: '年报', value: '2' },
    ]
  ]
  const options = [
    {
      label: '宣传惠企政策情况',
      value: '宣传惠企政策情况',
    },
    {
      label: '了解企业需求情况',
      value: '了解企业需求情况',
    },
    {
      label: '助企纾难解困情况',
      value: '助企纾难解困情况',
    },
    {
      label: '指导企业党建情况',
      value: '指导企业党建情况',
    },
    {
      label: '营商环境监督情况',
      value: '营商环境监督情况',
    },
    {
      label: '办理实事好事情况',
      value: '办理实事好事情况',
    },
    {
      label: '其他工作情况',
      value: '其他工作情况',
    },
  ];
  useEffect(()=>{
    if(type.value==1){
      IndexApi.getDailyStatus().then(res=>{
        console.log(res);
        const {code,data} =res; 
        if(code==0&&data.report){
          const {type,content}=data.report[0];
          dailyform.setFieldsValue({type:[type],content})
          setReportID(data.id);
          setStatus(data.status)
        }
      })
    } else {
      IndexApi.getYearlyStatus().then(res=>{
        const {code,data} =res; 
        if(code==0&&data.report){
          yearlyform.setFieldValue(data.report[0])
          setReportID(data.id)
          setStatus(data.status)
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
    IndexApi.saveYearlyReport({report,id:reportId,status:0,}).then(res=>{
      const {code} = res
      if(code==0){
        Toast.show({
          icon: 'success',
          content: '保存成功',
        })
      }
    }
    )
  }
  const onFinishDay = (values)=>{
    const report = [{content:values.content,type:values.type[0]}]
    IndexApi.saveDailyReport({report,status:0,id:reportId}).then(res=>{
      const {code} = res
      if(code==0){
        Toast.show({
          icon: 'success',
          content: '保存成功',
        })
      }
    }
    )
  }
  
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
         form={yearlyform}
         onFinish={onFinishYear}
          footer={
            <Button block type='submit' color='primary' size='large' disabled={status>0}>
              提交
            </Button>
        }>
          <Form.Item label='' name='content'>
            <TextArea
                placeholder='请输入内容'
                disabled={status>0}
                autoSize={{ minRows: 3, maxRows: 10 }}
              />
          </Form.Item>
        </Form>:
        
        <Form
          form={dailyform}
          onFinish={onFinishDay}
          footer={
            <Button block type='submit' color='primary' size='large' disabled={status>0}>
              提交
            </Button>}
        >
          <Form.Item label="内容" name='content'>
            <TextArea
                placeholder='请输入内容'
                disabled={status>0}
                autoSize={{ minRows: 3, maxRows: 5 }}
                maxLength={60}
              />
          </Form.Item>
          <Form.Item label='类型' name='type'>
            <Selector
              columns={2}
              disabled={status>0}
              options={options}
            />
          </Form.Item>
        </Form>
      }
    </div>
  )
}

export default Index