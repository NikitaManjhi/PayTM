import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='flex items-center'>
        <div className='font-bold pr-2 text-lg'>
            Your Balance: 
        </div>
        <div className='font-semibold text-lg'>
            Rs {balance}
        </div>
    </div>
  )
}

export default Balance