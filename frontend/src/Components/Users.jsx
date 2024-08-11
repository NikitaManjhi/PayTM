import React, { useEffect, useState } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Users = () => {
    const [user,setUser]=useState([]);
    const [filter, setFilter] = useState("");
    // implement debouncing here
    // add logic in backend so that we dont get our own name
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then(response => {
            setUser(response.data.user);
        })
    },[filter])
  return (
    <div className='w-full'>
        <div className='font-semibold text-lg mb-3'>
            User
        </div>
        <div>
            <input type="text" placeholder='Search User..' className='border border-slate-400 rounded-lg p-1 w-full' onChange={(e)=>{setFilter(e.target.value)}} />
        </div>
        <div className='my-2'>
            {user.map((user)=>{return <User user={user} key={user._id}/>})}
        </div>
    </div>
  )
}

const User = ({user}) => {
    const navigate=useNavigate();

    return (
        <div className='flex w-full justify-between '>
            <div className='flex justify-center items-center'>
            <div className='h-10 w-10 rounded-full bg-slate-400 font-medium text-lg flex justify-center items-center mr-2'>
                {user.username.charAt(0).toUpperCase()}
                
            </div>
            <div className='flex justify-center items-center text-lg'>
            {user.username}
            </div>
            </div>
            <Button label={"Send Money"} onClick={(e)=>{
                navigate(`/send?id=${user._id}&name=${user.username}`)
            }}/>

           
        </div>
    )
}

export default Users