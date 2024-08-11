import React from 'react'
import Appbar from '../Components/Appbar'
import Balance from '../Components/Balance'
import User from '../Components/Users'
const Dashboard = () => {
  return (
    <div className=''>
      <Appbar/>
      <div className='m-3'>
        <Balance balance={"100000"}/>
      </div>

      <div className='m-3'>
        <User/>
      </div>
      
    </div>
  )
}

export default Dashboard