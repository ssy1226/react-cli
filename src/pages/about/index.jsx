import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd-mobile';

import './index.scss'

const About = () => {
  const history = useHistory()
  const toYearly = () => {
    history.push('/yearly')
  }
  const toDaily = () => {
    history.push('/daily')
  }

  return (
    <div className="about-page">
      <Button block color='primary' size='large' onClick={toDaily}>
        查看日报
      </Button>
      <Button block color='primary' size='large' onClick={toYearly}>
        查看年报
      </Button>
    </div>
  )
}

export default About
