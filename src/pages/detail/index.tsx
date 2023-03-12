import React, {useEffect,useState} from 'react';
import { Form, Input, Button, Cascader } from 'antd-mobile';
import s from './index.module.scss';
import { FormInstance } from 'antd-mobile/es/components/form/form';


const Detail=()=> {
  const [type,setType] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deptData, setDeptData] = useState<any>({id:'',name: ''});
  const onFinish = (values)=>{
    console.log(values);
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
  let formRef = React.createRef<FormInstance>();
const optionData = [
  {
      "id": 1,
      "parent_id": 0,
      "dept_name": "某科技公司",
      "children": [
          {
              "id": 2,
              "parent_id": 1,
              "dept_name": "研发部",
              "children": [
                  {
                      "id": 5,
                      "parent_id": 2,
                      "dept_name": "UI",
                  }
              ]
          },
          {
              "id": 3,
              "parent_id": 1,
              "dept_name": "设计部",
              "children": [
                  {
                      "id": 4,
                      "parent_id": 3,
                      "dept_name": "UE",
                      "children": [
                        {
                          "id": 6,
                          "dept_name": "测试",
                        }
                      ]
                  }
              ]
          }
      ]
  }
];
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
              options={formateData(optionData)}
              visible={visible}
              onConfirm={(val, extend) => {
                const {items} = extend;
                const item = items[items.length-1];
                const names = items.map(dept=>dept?.label);
                console.log(formRef.current)
                formRef.current?.setFieldValue('dept_id', item&&item.value)
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
