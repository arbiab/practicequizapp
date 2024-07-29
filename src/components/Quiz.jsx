import React from 'react'
import { useState } from 'react'
import QUESTIONS from '../questions'
const Quiz = () => {
    const[userAnswers , setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length
  return (
    <div id='question'>
   <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
   </div>
  )
}

export default Quiz
