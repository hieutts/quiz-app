import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScreenHome from "./layout/ScreenHome/ScreenHome";
import ScreenQuiz from "./layout/ScreenQuiz/ScreenQuiz";
import Exam from "./layout/ScreenQuiz/Exam/Exam";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<ScreenHome />} />
        <Route path='/quiz/:id' element={<ScreenQuiz />}/>
        <Route path='/quiz/:id/questions' element={<Exam />} />

      </Routes>
    </BrowserRouter>
  )
}
