import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { useParams } from "react-router-dom";
import './Exam.scss'

export default function Exam() {
  const { id } = useParams();
  const [listQues, setListQues] = useState([]);

  useEffect(() => {
    const fetchListQues = async () => {
      try {
        const module = await import('../QuizService');
        const questions = await module.getListQuestions(id);
        setListQues(questions);
      } catch (error) {
        console.error("Occurs error when getting list", error);
      }
    };
    fetchListQues();
    console.log(listQues)
  }, [id]);
  const [currentIndex, SetCurrentIndex] = useState(0);
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

  // const answerSort = import('../../../uitls/StringManage')
  // .then(fn => fn.getSortAnswer(listQues[currentIndex].answer))
  const answerSort = useCallback (listQues[currentIndex] && listQues[currentIndex].answer.sort(() => Math.random() - 0.5))
  const answerRecord = [];
  let score =0;
  const HandleSubmit = () => {

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('answer')) {

        let key = localStorage.key(i).split("_");
        let value = localStorage.getItem(localStorage.key(i));
        answerRecord.push({idQues: key[1], idAnswer :value })
      }
      console.log(answerRecord)
    }

    const sendResult = async () => {
      try {
        const fn = await import('../../../uitls/StringManage');
         score = await fn.resultOfQuiz(answerRecord, listQues);
      }
      catch (e) {
        console.log(e)
      }
    }
    sendResult();
    console.log(score);
  }
  const [remainingTime, SetRemainingTime] =useState(60)
  const [minutes, SetMinutes] = useState(1)
  const [seconds, SetSeconds] = useState(0)
  useEffect(()=> { 
    const timerId = setInterval(()=> {
      SetRemainingTime(pre =>  pre-1);
      console.log("SetRemainingTime")
    }, 1000
    )
  // //   let minutesNow = Math.floor(remainingTime / 60);
  //    let secondsNow = remainingTime % 60;
  //     SetMinutes(minutesNow)
  //     SetSeconds(secondsNow)
  // const  displayTime = ()=> {
  //  let minutesNow = Math.floor(remainingTime / 60);
  //  let secondsNow = remainingTime % 60;
  //   SetMinutes(minutesNow)
  //   SetSeconds(secondsNow)
  //   SetRemainingTime(remainingTime-1)
  //   console.log(`Thời gian còn lại: ${minutes} phút ${seconds} giây`);
  // }
  // displayTime();
  // const interval = setInterval( () => {
  //   remainingTime--; 
  //   displayTime();  
  // }, 1000)
     
   return ()=> 
      {
        clearInterval(timerId);  
          HandleSubmit();
        }
      
       
    
  
}, [])
  return (
    <div className="exam">
      {listQues[currentIndex] &&
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
                <div className="answer" key={index} onClick={HandleChooseAns(answerSort[index].id, listQues[currentIndex].id)}>
                  <span className="index">{answerIndex}</span>
                  <CustomButton className="ans-content"  >{answerSort[index].content}</CustomButton>
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

      }
      <div className="wrapper-submit">
        {currentIndex >= (listQues.length - 1) ?
          <CustomButton className='submit-btn' onClick={HandleSubmit} large >Submit</CustomButton>
          : <CustomButton className='submit-btn' disabled large >Submit</CustomButton>
        }
        <div className="time">
        {minutes< 10 ? `0${minutes}`: minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
    </div>
  );
}
