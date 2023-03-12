import React from 'react'
import { useHistory } from 'react-router-dom'

import './index.scss'

const About = () => {
  const history = useHistory()
  const toDetail = () => {
    history.push('/detail')
  }

  return (
    <div className="about-page">
      
    </div>
  )
}

export default About
