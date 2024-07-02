import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
    return (
        <>
            <div className="relative">

                <div>

                    {/* /////////Image//////// */}
                    <div className="relative">
                        <img src="/assets/Main.jpg" alt="Main" className=" lg:h-[530px] w-full brightness-50 object-cover" />
                        <div className="absolute  left-9 top-10 md:left-0 md:right-0 md:top-40 text-start md:text-center text-white  z-10">
                            <p className="text-[34px] md:text-[50px] lg:text-[60px] font-semibold font-prompt">Get Ready for your IELTS</p>
                        </div>
                    </div>

                    {/* ////////learning and reading//////// */}
                    <div className="  bg-[#FFFFFF] flex flex-row gap-6 items-center justify-center absolute left-0 right-0 md:-bottom-32 -bottom-20  mx-auto md:w-[440px] md:h-[240px] w-[280px] h-[150px] ">

                        <Link to="/testcards">
                        <div className=" h-[100px] md:h-[160px]  w-[100px] md:w-[160px] bg-[#2B2D42] flex flex-col items-center justify-center">
                            <div>
                                <img src="/assets/headphones.jpg" alt="headphones" className="w-[50px]md:w-[80px] h-[50px] md:h-[80px]" />
                            </div>
                            <p className="text-white text-[10px] md:text-[18px]  pt-2 md:pt-4 font-prompt">Listening Test</p>

                        </div>
                        </Link>

                        <Link to="/readingtestcards">
                        <div className="h-[100px] md:h-[160px] w-[100px] md:w-[160px] bg-[#2B2D42] flex flex-col items-center justify-center">
                            <div>
                                <img src="/assets/book.jpg" alt="book" className="w-[50px] md:w-[80px] h-[50px] md:h-[80px]" />
                            </div>
                            <p className="text-white text-[10px] md:text-[18px] pt-2 md:pt-4 font-prompt">Reading Test</p>

                        </div>
                        </Link>
                    </div>

                </div>
            </div>



            {/* ////////About us/////// */}
            <div className="w-[150px] md:w-[220px] lg:w-[280px] md:h-[55px] h-[36px] lg:h-[65px] bg-[#FF467A]  rounded-r-[50px]  mx-10 md:mx-16  lg:mx-48 mt-24 md:mt-44 flex items-center">
                <p className="text-[#ffff] text-[18px]  md:text-[26px] lg:text-[40px] font-medium px-6 font-prompt">About us</p>
            </div>



            {/* ///////content//////// */}
            <div className="px-10 md:px-16 lg:px-48 text-[18px] font-medium text-[#303030] ">
                <p className="pt-8 lg:w-[700px]">Welcome to IELTS Visa, your go-to resource for free IELTS practice tests! We are dedicated to helping students worldwide achieve their best possible scores on the IELTS exam. 
                Our platform provides unlimited access to high-quality practice tests in the Listening and Reading categories, allowing you to practice as often as you need to feel confident and prepared.</p>
            </div>
        </>
    )
}

export default Herosection
