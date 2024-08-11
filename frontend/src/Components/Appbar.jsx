import React from 'react'

const Appbar = () => {
  return (
    <div>
        <div className='flex justify-between h-14 shadow'>
            <div className='flex flex-col justify-center h-full ml-4'>
                PayTM App
            </div>
            <div className='flex'>
                <div className='flex flex-col justify-center mr-4 h-full text-lg'>
                    Hello
                </div>
                <div className='flex flex-col justify-center h-12 w-12 rounded-full bg-slate-400 mt-1 mr-2'>
                    <div className='flex justify-center items-center text-xl h-full'>
                        U
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Appbar