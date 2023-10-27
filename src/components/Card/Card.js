import React, { useState } from "react";
import './Card.scss'
import CustomButton from "../CustomButton";

export default function Card({listQues, currentIndex, SetCurrentIndex}) {
    
    const HandleNext = () => {
      if (currentIndex < listQues.length - 1)
        SetCurrentIndex(currentIndex + 1);
    }
    const HandlePrev = () => {
      if (currentIndex > 0)
        SetCurrentIndex(currentIndex - 1);
    }
    const HandleChooseAns = (ansId, quesId) => () => {
      const answerKey = `answer_${quesId}`
      localStorage.setItem(answerKey, ansId);
      HandleNext()
    }
    const answersIndex = ['A', 'B', 'C', 'D'];
    console.log('111111111');
  
    // const answerSort = import('../../../uitls/StringManage')
    // .then(fn => fn.getSortAnswer(listQues[currentIndex].answer))
    // const answerSort = listQues[currentIndex] && listQues[currentIndex].answer.sort(() => Math.random() - 0.5)


  return (
    <div>
       {/* {listQues[currentIndex] &&
        <div className="wrapper-exam">
          <div className="question">
            <div className="title">Question {currentIndex + 1}/{listQues.length}</div>
            <div className="question-content">
              {listQues[currentIndex].content}
            </div>
          </div>
          <div className="answers">
            {answersIndex.map((answerIndex, index) => {
              return (
                <div className="answer" key={index} onClick={HandleChooseAns(listQues[currentIndex].answer[index].id, listQues[currentIndex].id)}>
                  <span className="index">{answerIndex}</span>
                  <CustomButton className="ans-content"  >{listQues[currentIndex].answer[index].content}</CustomButton>
                </div>
              )
            })}
          </div>
          <div className="btn-move">
            {currentIndex > 0 ? (<CustomButton className='pre-btn' onClick={HandlePrev} >Pre</CustomButton>)
              : (<CustomButton className='pre-btn' disabled>Pre</CustomButton>)}
            {currentIndex < (listQues.length - 1) ? <CustomButton className='next-btn' onClick={HandleNext}>Next</CustomButton>
              : <CustomButton className='next-btn' disabled>Next</CustomButton>}
          </div>
        </div>

      }  */}
    </div> 
  )
}
