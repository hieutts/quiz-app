import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../../components/CustomButton";

import './Exam.scss'
import Card from "../../../components/Card/Card";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Exam({ listQues, isSubmitted, SetIsSubmitted, score, SetScore}) {
  const [currentIndex, SetCurrentIndex] = useState(0);
  const [remainingTime, SetRemainingTime] = useState(5);

  const mins = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;
  const timeRef = useRef(0)
  const isSubmittedRef = useRef(false);
  const answerRecord = [];
  // const nav = useNavigate();
  const HandleSubmit = () => {
    SetIsSubmitted(true);
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('answer')) {

        let key = localStorage.key(i).split("_");
        let value = localStorage.getItem(localStorage.key(i));
        answerRecord.push({ idQues: key[1], idAns: value })
      }
    }
     console.log(score)
    console.log(answerRecord)

  }
  //   const sendResult = async () => {
  //     try {
  //       const fn = await import('../../../uitls/StringManage');
  //        score = await fn.resultOfQuiz(answerRecord, listQues);
  //     }
  //     catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   sendResult();
  //   console.log(score);
  // }

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timeRef.current >= 0) {
        SetRemainingTime((prevTime) => {
          timeRef.current = prevTime - 1;
          return (prevTime - 1)
        });
      } else {
        if (!isSubmittedRef.current) {
          HandleSubmit();
        }
        clearInterval(timerId)
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (

    <div className="exam">
      <Card listQues={listQues} currentIndex={currentIndex} SetCurrentIndex={SetCurrentIndex} />
      <div className="wrapper-submit">
        {/* {currentIndex >= (listQues.length - 1) ? */}
          <CustomButton className='submit-btn'
            onClick={() => {
              isSubmittedRef.current = true;
              HandleSubmit();
            }}
            large
            rounded
          >
            Submit
          </CustomButton>
          {/* : <CustomButton className='submit-btn' disabled large >Submit</CustomButton>
        } */}
        <div className="time">
          {remainingTime >= 0 ? (
            `${mins < 10 ? `0${mins}` : ` ${mins}`}:${secs < 10 ? `0${secs}` : ` ${secs}`}`
          ) : (
            <div>Time out</div>
          )}
        </div>
      </div>
    </div>
  );

}
