import React, { useEffect } from "react";
import './Result.scss'
import icon from "../../../assets/IconCongra.png";
import CustomButton from "../../../components/CustomButton";
export default function Result({ score }) {
    useEffect(() => {

        import('../../../uitls/StringManage')
            .then((fn) => fn.removeListAnswer());

    }, [score])


    return (
        <div className="result">
            <div className="img-wrapper"> <img src={icon} alt="icon" className="congraIcon" /></div>
            <div className="notice-score">
                <div className="congra-mess">Congratulation !!!</div>
                <div className="score">Your score: {score}</div>
            </div>
            <CustomButton large rounded className='btn-back' to={'/'}> Take other quiz</CustomButton>
        </div>
    )
}
