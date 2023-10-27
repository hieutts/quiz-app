import React from "react";
import CustomButton from "../../components/CustomButton";
import './ScreenHome.scss'
import Header from "../MainLayout/Header/Header";
import banner from "../../assets/banner.png";
import { useNavigate } from "react-router-dom";


export default function ScreenHome() {
  const nav = useNavigate();
  const HandleClick = async () => {
    const id = await
      import('../ScreenQuiz/QuizService')
        .then(api => {
          return api.getQuizId();
        })
    return nav(`quiz/${id}`)
  }
  return (
    <div className="home">
      <Header />
      <div className="banner">
        <img src={banner} alt="banner" className="background" />

        <div className="slogan">Challenge Your Knowledge with Every Question!</div>
        <CustomButton onClick={HandleClick} text className='btn-take'>Play</CustomButton>
      </div>

    </div>
  )
}