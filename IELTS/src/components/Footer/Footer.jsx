import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
    const handleLinkClick = () => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
      };

    return (
        <div className="flex md:flex-row flex-col items-center justify-between px-10 mt-10  border-t-[1px] border-t-[#303030]">

            <Link to={"/"} className="w-[180px] h-[40px] flex items-center justify-center">
                <div>
                <img src='/assets/ieltsLogo.svg' className='w-full h-full object-contain'/>
                </div>
            </Link>
            <p className='text-[14px] font-medium text-[#303030] font-prompt'>&copy; 2024 All Rights Reserved IELTS Visa.in</p> 
            <div className='flex'>
            <p className='text-[14px] font-medium text-[#303030] font-prompt'>Design and Develop by</p> <Link to="https://pruthatek.com" className='pl-1 underline text-[14px] font-medium text-[#303030] font-prompt'>Pruthatek</Link>  
            </div> 
            

        </div>
    )
}

export default Footer
