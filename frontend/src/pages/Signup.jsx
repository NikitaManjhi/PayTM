import React, { useState } from 'react'
import Heading from '../Components/Heading'
import Subheading from '../Components/Subheading'
import Inputbox from '../Components/Inputbox'
import Button from '../Components/Button'
import Bottomwarning from '../Components/Bottomwarning'
import axios from 'axios'
const Signup = () => {
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  return (
    <div className="bg-slate-400 w-screen h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center flex-col bg-white w-80 rounded-lg py-2 px-4">
        <Heading label={"Sign Up"}/>
        <Subheading label={" Enter your information to create an account. "} />
        <Inputbox label={"User Name"} placeholder={"John"} onChange={(e)=>{setUsername(e.target.value)}}/>
        <Inputbox label={"Email"} placeholder={"Email"} onChange={(e)=>{setEmail(e.target.value)}}/>
        <Inputbox label={"Password"} placeholder={"Password"} onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className="pt-4">
        <Button label={"Sign Up"} onClick={async ()=>{
          const response = await axios.post("http://localhost:3000/api/v1/user/signup",
            {
              username,
              email,
              password
            }
          );
          localStorage.setItem("token",response.data.token);
        }}/>
        </div>
        <Bottomwarning to={"/signin"} label={"Already have a account?"} buttonText={"Login"}/>
      </div>
    </div>
  )
}

export default Signup