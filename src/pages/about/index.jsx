import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button,Space } from 'antd-mobile';
import s from './index.module.scss';

const About = () => {
  const history = useHistory()
  const toYearly = () => {
    history.push('/yearly')
  }
  const toDaily = () => {
    history.push('/daily')
  }

  return (
    <div className={s.about_page}>
      <Space direction='vertical' block>
        <Button block color='primary' size='large' onClick={toDaily}>
          查看日报
        </Button>
        <Button block color='primary' size='large' onClick={toYearly}>
          查看年报
        </Button>
      </Space>
    </div>
  )
}

export default About
