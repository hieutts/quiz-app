import React from "react";
import Welcome from "./Welcome/Welcome"
import Header from "../MainLayout/Header/Header";

export default function ScreenQuiz() {
  return  (
    <div className="quiz">
    <Header/>
    <Welcome/>
    </div>
  )
}
