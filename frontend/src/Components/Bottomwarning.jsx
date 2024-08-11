import React from 'react'
import { Link } from 'react-router-dom'

const Bottomwarning = ({to,label,buttonText}) => {
  return (
    <div className='flex justify-center text-sm py-2'>
        <div>
            {label}
        </div>
        <Link className='underline pointer pl-1 cursor-pointer' to={to}>{buttonText}</Link>
    </div>
  )
}

export default Bottomwarning