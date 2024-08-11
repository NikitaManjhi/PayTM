import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
const sendMoney = () => {
    const [searchParams]=useSearchParams();
    const name=searchParams.get("name");
    const id=searchParams.get("id");
    const [amount,setAmount]=useState(0);
    
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='shadow-xl p-4 flex flex-col  bg-white rounded-xl'>
            <div className='w-full text-center px-16 pb-10'>
                <h1 className='font-semibold text-3xl'>Send Money</h1>
            </div>
            <div className='flex items-center gap-3 w-full text-left'>
                <div className='h-10 w-10 bg-green-500 rounded-full flex justify-center items-center'>
                    {name.charAt(0).toUpperCase()}
                </div>
                <div className='text-xl font-medium  '>{name}</div>
            </div>
            <div>
                <h1 className='text-md font-semibold py-2' >Amount (in Rs.)</h1>
                <input type="text" placeholder='Enter amount' className='border border-gray-400 w-full rounded-md p-1' onChange={(e)=>{setAmount(e.target.value)}}/>
            </div>
            <div className=' pt-4 w-full'>
            <button type="button" className="text-white bg-green-500 hover:bg-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 w-full" onClick={(e)=>{
                axios.post("http://localhost:3000/api/v1/account/transfer",
                    {
                        to: id,
                        amount
                    },{
                        headers : {
                            Authorization : "Bearer " + localStorage.getItem("token")
                        }
                    }
                )
            }}>Initiate Transfer</button>
            </div>
        </div>
    </div>
  )
}

export default sendMoney