import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-[500px] '>
    <p className='text-[34px] font-semibold text-[#2B2D42] mb-10'>Admin Panel</p>
     <div className='flex gap-x-10'>
      <Link to="/material" className='w-fit px-10 py-4 h-[50px] bg-[#2B2D42] text-white '>Upload test</Link>
      <Link to="/admintest" className='w-fit px-10 py-4 h-[50px] bg-[#2B2D42] text-white '>All Tests</Link>
      </div>
    </div>
  )
}

export default Dashboard
