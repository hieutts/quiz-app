import React, { useRef } from "react";
import CustomButton from "../../../components/CustomButton";
import './Welcome.scss'

export default function Welcome({valid, SetValid}) {
  const inputCodeRef = useRef();
  const HandleCheckOpenCode = async () => {
    const inputValue = inputCodeRef.current.value;
    const isCorrectOpenCode= await import('../../../uitls/StringManage')
      .then(fn => {
        return fn.isCorrectOpenCode(inputValue,'111')
      })
      console.log('1',isCorrectOpenCode)
     isCorrectOpenCode ? SetValid(true): SetValid(false);
  }

  return (
    <div className="welcome ">
      <p className="title">Welcome to Quiz </p>
      <input type="password"
        ref={inputCodeRef}
        className="input-code"
        placeholder="Open code ..."
      />
      <CustomButton className='btn-open' large rounded
        onClick={HandleCheckOpenCode}
        >Start now</CustomButton>
    </div>
  )
}
