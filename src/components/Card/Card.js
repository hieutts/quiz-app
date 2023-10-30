import React, {   useMemo, useRef, useState } from "react";
import './Card.scss'
import CustomButton from "../CustomButton";

export default function Card({ listQues, currentIndex, SetCurrentIndex }) {
    const idAnsChoose = useRef();
    const idQuesChoose = listQues[currentIndex].id;
    const HandleNext = () => {
        if (currentIndex < listQues.length - 1)
            SetCurrentIndex(currentIndex + 1);
    }
    const HandlePrev = () => {
        if (currentIndex > 0)
            SetCurrentIndex(currentIndex - 1);
    }
    const HandleChooseAns = (ansId, quesId) => {
        const answerKey = `answer_${quesId}`
        localStorage.setItem(answerKey, ansId);
    }

    const answersIndex = ['A', 'B', 'C', 'D'];
    const answerSort = useMemo(() => {
        return listQues[currentIndex].answer.sort(() => Math.random() - 0.5);
    }, [listQues, idQuesChoose]);

    const HandleClickAnswer = (idAns, idQues) => () => {
        idAnsChoose.current = idAns;
        HandleChooseAns(idAns, idQues);

    }

     
    
    const answersChoose = useMemo(() => {
        const answerId = localStorage[`answer_${idQuesChoose}`]
        return answerId;
    }, [idQuesChoose, idAnsChoose.current])
     console.log(answersChoose)

    const HandleClickRemove = (idAns, idQues) => () => {
        const removeItem = localStorage[`answer_${idQues}`]
        if (removeItem ===  idAns.toString()) {
            localStorage.setItem(`answer_${idQues}`, null);
            idAnsChoose.current = null;
        }
    }
    return (

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
                        answersChoose != answerSort[index].id ? (<div className="answer" key={index}
                            onClick={

                                HandleClickAnswer(answerSort[index].id, listQues[currentIndex].id)

                            }
                        >
                            <span className="index">{answerIndex}</span>
                            <CustomButton className="ans-content">{answerSort[index].content}</CustomButton>
                        </div>)
                            :
                            <div key={index} className="answer-choose"
                            >
                                  
                            <CustomButton className="ans-content-choose">{answerSort[index].content}</CustomButton>
                            <span className="remove-btn"
                                 onClick={HandleClickRemove(answerSort[index].id, listQues[currentIndex].id)}
                                 >&times;</span>
                            </div>
                    )
                })}
            </div>
            <div className="btn-move">
                {currentIndex > 0 ?
                    (<CustomButton className='pre-btn' onClick={HandlePrev} rounded
                    >Pre</CustomButton>)
                    : (<CustomButton className='pre-btn' disabled rounded>Pre</CustomButton>)}
                {currentIndex < (listQues.length - 1) ?
                    <CustomButton className='next-btn' onClick={HandleNext}
                        rounded
                    >Next</CustomButton>
                    : <CustomButton className='next-btn' disabled rounded>Next</CustomButton>}
            </div>
        </div>
    )
}
