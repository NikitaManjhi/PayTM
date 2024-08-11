import React from "react"
import Heading from "../Components/Heading"
import Subheading from "../Components/Subheading"
import Inputbox from "../Components/Inputbox"
import Button from "../Components/Button"
import Bottomwarning from "../Components/Bottomwarning"
import axios from "axios"
const Signin = () => {
  return (
    <div className="bg-slate-400 w-screen h-screen flex justify-center items-center ">
        <div className="flex justify-center items-center flex-col bg-white w-80 rounded-lg py-2 px-4">
            <Heading label={"Sign in"}/>
            <Subheading label={" Enter your credentials to access your account. "} />
            <Inputbox label={"Email"} placeholder={"john@gmail.com"}/>
            <Inputbox label={"Password"} placeholder={"Password"}/>
            <div className="pt-4">
            <Button label={"Sign in"} onClick={async ()=>{
              const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstname,
                lastname,
                password
              });
              console.log(response.data);
              localStorage.setItem("token",response.data.token)
            }}/>
            </div>
            <Bottomwarning to={"/signup"} label={"Don't have a Account? "} buttonText={"Sign up"}/>
        </div>
    </div>
  )
}

export default Signin