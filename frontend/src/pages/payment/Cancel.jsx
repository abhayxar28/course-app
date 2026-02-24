
import React from 'react'

export default function Cancel() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-green-100'>
        <div className='bg-white p-10 rounded-2xl shadow-lg text-center'>
            <h1 className='text-3xl font-bold text-red-700'>Payment Cancelled!</h1>
            <p className='mt-4 text-gray-600'>Something went wrong, please try again.</p>
        </div>
    </div>
  )
}
