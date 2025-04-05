
import GetUserImage from '@/components/sections/dashboard/GetUserImage'
import React from 'react'

const dashboardPage = () => {
  
  return (
    <div className='text-xl'>
      <div>
        <h1 className='text-4xl font-bold tracking-wide '>Dashboard </h1>
      </div>

      <div className='mt-9'>
        <GetUserImage/>
      </div>
    </div>
  )
}

export default dashboardPage
