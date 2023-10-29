import React, { useMemo } from "react";
import './Card.scss'
import CustomButton from "../CustomButton";

export default function Card({ listQues, currentIndex, SetCurrentIndex }) {

    const HandleNext = () => {
        if (currentIndex < listQues.length - 1)
            SetCurrentIndex(currentIndex + 1);
    }
    const HandlePrev = () => {
        if (currentIndex > 0)
            SetCurrentIndex(currentIndex - 1);
    }
    const HandleChooseAns = (ansId, quesId) => () => {
        HandleNext()
        const answerKey = `answer_${quesId}`
        localStorage.setItem(answerKey, ansId);
    }

    const answersIndex = ['A', 'B', 'C', 'D'];
    const answerSort = useMemo(() => {

        return listQues[currentIndex].answer.sort(() => Math.random() - 0.5);
    }, [listQues, currentIndex]);

    return (

        <div className="wrapper-exam">
            <div className="question">
                <div className="title">Question {currentIndex + 1}/{listQues.length}</div>
                <div className="question-content">
                    {listQues[currentIndex]?.content}
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
