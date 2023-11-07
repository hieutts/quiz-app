import React, { useEffect, useMemo, useRef, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import './Exam.scss'
import Card from "../../../components/Card/Card";

export default function Exam({ listQues, isSubmitted, SetIsSubmitted, score, SetScore }) {
  const [isOpen, SetIsOpen] = useState(false);
  const [remainingTime, SetRemainingTime] = useState(300);
  const mins = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;
  const timeRef = useRef(0)
  const isSubmittedRef = useRef(false);
  const answerRecord = [];
  const initialRecord = useMemo (() => {
      listQues.map((ques )=>localStorage.setItem(`answer_${ques.id}`, null) )
  }, [listQues])
  const HandleSubmit = () => {
    SetIsSubmitted(true);

    // qua string manage
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('answer')) {

        let key = localStorage.key(i).split("_");
        let value = localStorage.getItem(localStorage.key(i));
        answerRecord.push({ idQues: key[1], idAns: value })
      }
    }
    const sendResult = async () => {
      try {
        const fn = await import('../../../uitls/StringManage');
        score = await fn.resultOfQuiz(answerRecord, listQues);
        SetScore(score);
      }
      catch (e) {
        console.log(e)
      }
    }
    sendResult();
  }

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
<>
  
      <div className="exam">
        <Card listQues={listQues}  />
        <div className="wrapper-submit">
          <CustomButton className='submit-btn'
            onClick={() => {
              SetIsOpen(true)
            }}
            large
            rounded
          >
            Submit
          </CustomButton>
           
  
  
          <div className="time">
            {remainingTime >= 0 ? (
              `${mins < 10 ? `0${mins}` : ` ${mins}`}:${secs < 10 ? `0${secs}` : ` ${secs}`}`
            ) : (
              <div>Time out</div>
            )}
          </div>
        </div>
        
      </div>
       {isOpen &&
        <div className="dialog">
         <div className="dialog-wrapper">
           <div className="dialog-content">
               <div className="dialog-title">Confirm submit</div>
               <div className="dialog-question">Are you ready to submit this quiz?</div>
            </div>
             <div className="dialog-btn">
               <CustomButton onClick={() => {
                 SetIsOpen(false);
                 isSubmittedRef.current = true;
                 HandleSubmit();
               }}
                 rounded medium
                 className="btn-option">Submit</CustomButton>
               <CustomButton onClick={() => SetIsOpen(false)} 
               rounded medium
                 className="btn-option">Cancel</CustomButton>
             </div>
           </div>
         
       </div>}
</>
  );

}
