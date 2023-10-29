import React, { useEffect, useRef, useState } from "react";
import Welcome from "./Welcome/Welcome"
import Header from "../MainLayout/Header/Header";
import Exam from "./Exam/Exam";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import './ScreenQuiz.scss'
import Result from "./Result/Result";

export default function ScreenQuiz() {
  const { id } = useParams();
  const [listQues, setListQues] = useState([]);
  const isLoadQuestion = useRef(false)
  const [score, SetScore] = useState(null);
  const [valid, SetValid] = useState(false);
  const [isSubmitted, SetIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchListQues = async () => {
      try {
        const module = await import('./QuizService');
        const questions = await module.getListQuestions(id);
        setListQues(questions);
        isLoadQuestion.current = true;
      } catch (error) {
        console.error("Occurs error when getting list", error);
      }
    };
    fetchListQues();
  }, []);

  console.log(listQues)
  return (
    <>
      <div className="quiz">
        <Header />
        {
        (!valid) ?
          <Welcome valid={valid} SetValid={SetValid} />
          :
          (
            (isLoadQuestion.current) ?
            (isSubmitted ?
              (score === null ? <Loading /> : <Result />)
              :
              <Exam listQues={listQues} isSubmitted={isSubmitted} SetIsSubmitted={SetIsSubmitted} score={score} SetScore={SetScore} />)
            :
            <Loading />)
            }
      </div>
    </>
  )
}
