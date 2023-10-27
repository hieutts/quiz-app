import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { useParams } from "react-router-dom";
import './Exam.scss'
import Card from "../../../components/Card/Card";

export default function Exam() {
  const { id } = useParams();
  const [listQues, setListQues] = useState([]);
  const [currentIndex, SetCurrentIndex] = useState(0);

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
  }, [listQues,id]);
  
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
    
  return (
    <div className="exam">
      exam
       <Card data={listQues} currentIndex={currentIndex} SetCurrentIndex={SetCurrentIndex}/>
      <div className="wrapper-submit">
        {currentIndex >= (listQues.length - 1) ?
          <CustomButton className='submit-btn' onClick={HandleSubmit} large >Submit</CustomButton>
          : <CustomButton className='submit-btn' disabled large >Submit</CustomButton>
        }
        <div className="time">
        {/* {minutes< 10 ? `0${minutes}`: minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
        </div>
      </div>
    </div>
  );
}
