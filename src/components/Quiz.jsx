import React from 'react'
import { useState , useCallback } from 'react'
import QuestionTimer from './QuestionTimer'
import QUESTIONS from '../questions'
import QuizComplete from '../assets/quiz-complete.png'
const Quiz = () => {
    const [answeredState , setAnswerState] = useState('')
    const[userAnswers , setUserAnswers] = useState([])
    const activeQuestionIndex = answeredState === '' ? userAnswers.length : userAnswers.length-1;
 
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length
    const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer) {
      setAnswerState('answered')
       setUserAnswers((prevUserAnswers)=>{
        return [...prevUserAnswers , selectedAnswer]
       })
      setTimeout(()=>{
        if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct')
        }else {
          setAnswerState('wrong')
        }
        setTimeout(()=> {
          setAnswerState('')
        },2000);
      },1000)
    },[activeQuestionIndex])
    const handleSkipAnswer = useCallback(()=> handleSelectAnswer(null) , [handleSelectAnswer])
    if (quizIsComplete) {
      return <div id='summary'>
        <img src={QuizComplete} alt="Trophy icon" />
        <h2>Quiz Completed</h2>
      </div>
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    
    shuffledAnswers.sort(()=> Math.random()-0.5)
  return (
    <div id="quiz">
    <div id='question'>
      <QuestionTimer  key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
   <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
   <ul id='answers'>
   
    {shuffledAnswers.map((answer)=> {
      const isSelected = userAnswers[userAnswers.length -1] === answer
      let cssClasses = ''
      if (answeredState === 'answered' && isSelected){
              cssClasses='selected'
      }
      if ((answeredState === 'correct' || answeredState ==='wrong') && isSelected) {
        cssClasses =answeredState
      }
     return(
       <li key={answer} className='answer'><button className={cssClasses} onClick={()=>handleSelectAnswer(answer)}>{answer}</button></li>
    )}
        
    )}
   </ul>
   </div>
   </div>
  )
}

export default Quiz
