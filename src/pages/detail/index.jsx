import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Cascader } from 'antd-mobile';
import s from './index.module.scss';
import { useHistory } from 'react-router-dom'
import IndexApi from '@/api/index'

const Detail=()=> {
  const history = useHistory()
  const [type,setType] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deptData, setDeptData] = useState({id:'',name: ''});
  const [optionData, setOptionData] = useState([]);
  const setCookie = (cname,cvalue,exdays)=>
  {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  const onFinish = (values)=>{
    console.log(values);
    if(type){
      
      IndexApi.saveLogin(values).then((res)=>{
        const {code,data} =res; 
        if(code==0){
          setCookie('token', data.token, 1)
          history.push('/index');
        }
      })
    } else{
      IndexApi.saveRegister(values).then((res)=>{
        const {code} =res; 
        if(code===0){
          setType(true)
        }
        
      })
    }
    
  }
  const formateData = (data)=>{
    const tempData = data.map(item=>{
      item.label = item.dept_name;
      item.value = item.id;
      if(item.children){
        formateData(item.children);
      }
      return item;
    })
    return tempData;
  }
  let formRef = React.createRef();
  useEffect(()=>{
    IndexApi.getDeptList().then((res)=>{
      setOptionData(formateData(res.data));
    })
  },[])
  return (
    <div className={s.login_page}>
      <Form
        name='form'
        ref={formRef}
        layout='horizontal'
        onFinish={onFinish}
        mode='card'
        footer={
          <Button block type='submit' color='primary' size='large'>
            {type?'登录':'注册'}
          </Button>
        }
      >
        <Form.Item label='姓名' name='name' rules={[{ required: true }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='身份证号' name='identity' rules={[{ required: true }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        {
          !type&&<Form.Item label='部门' name='dept_id' rules={[{ required: true }]}>
            <Input placeholder='请选择'
              onFocus={() => {
                setVisible(true)
              }}
              value={deptData.name}
            />
            <Cascader
              options={optionData}
              visible={visible}
              onConfirm={(val, extend) => {
                const {items} = extend;
                const item = items[items.length-1];
                const names = items.map(dept=>dept?.label);
                formRef.current.setFieldValue('dept_id', item&&item.value)
                setDeptData({id: item&&item.value, name:names.join('-')});
              }}
              onClose={() => {
                setVisible(false)
              }}
            />
            
          </Form.Item>
        }
      </Form>
      <div className={s.changeType}>
        <a onClick={()=>{
          setType(!type)
        }}>{type?'注册':'登录'}</a>
      </div>
    </div>
  )
}

export default Detail
