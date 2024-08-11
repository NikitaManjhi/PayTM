import React from 'react'

const Inputbox = ({label,placeholder,onChange}) => {
  return (
    <div className='w-full'>
        <div className='font-medium pt-4 pb-1'>{label}</div>
        <input type="text" className='border p-1 w-full rounded border-slate-800 font-thin' placeholder={placeholder} onChange={onChange} />
    </div>
  )
}

export default Inputbox