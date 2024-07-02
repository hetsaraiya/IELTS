import React from 'react'

const AboutUs = () => {
  return (
    <div>
      <div className='flex flex-col items-start'>
          <div className="w-[177px] md:w-[200px] lg:w-[300px] md:h-[65px] h-[36px] lg:h-[65px] border-b-[2px] lg:border-b-[4px] border-b-[#2B2D42]  
            mx-10 md:mx-16  lg:mx-48 lg:mt-20  mt-10 flex items-center  ">
          <p className='text-[20px] md:text-[28px] lg:text-[38px] text-[#2B2D42] font-medium  font-prompt'>About Us</p>
          </div>

          <div className='mt-5'>
            <p className='text-[18px] font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '>Welcome to IELTS Visa, your go-to resource for free IELTS practice tests! We are dedicated to helping students worldwide achieve their best possible scores on the IELTS exam. 
                Our platform provides unlimited access to high-quality practice tests in the Listening and Reading categories, allowing you to practice as often as you need to feel confident and prepared.</p>
          </div>
      </div>

      <div className='flex flex-col items-start'>
          <div className="w-[177px] md:w-[200px] lg:w-[300px] md:h-[65px] h-[36px] lg:h-[65px] border-b-[2px] lg:border-b-[4px] border-b-[#FF467A]
            mx-10 md:mx-16  lg:mx-48 mt-10 lg:mt-20 flex items-center  ">
          <p className='text-[20px] md:text-[28px] lg:text-[38px] text-[#ff467a] font-medium  font-prompt'>Our Mission</p>
          </div>

          <div className='mt-5'>
            <p className='text-[18px] font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '>At IELTS Visa, our mission is simple: to provide accessible, effective, and user-friendly IELTS practice materials to students everywhere. We understand the importance of the IELTS exam for your academic and professional goals, and we are committed to supporting your journey towards success.</p>
          </div>
      </div>

      <div className='flex flex-col items-start'>
          <div className="w-[190px] md:w-[250px] lg:w-[350px] md:h-[65px] h-[36px] lg:h-[65px] border-b-[2px] lg:border-b-[4px] border-b-[#2B2D42]   
         mx-10 md:mx-16  lg:mx-48 mt-10 lg:mt-20 flex items-center  ">
          <p className='text-[20px] md:text-[28px] lg:text-[38px] text-[#2b2d42] font-medium font-prompt'>What We Offer</p>
          </div>

          <ul className='mt-5'>
            <li className='text-[18px]  font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '><b>Unlimited Practice Tests:</b> Take as many practice tests as you want in the Listening and Reading categories. Our extensive library of questions is designed to closely mimic the actual IELTS exam, helping you familiarize yourself with the test format and question types.</li>
            <li className='text-[18px] mt-3 font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '><b>Realistic Test Experience:</b> Our practice tests are timed and structured just like the real exam, providing you with a realistic test-taking experience. This helps you manage your time effectively and improve your test-taking strategies.</li>
            <li className='text-[18px] mt-3 font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '><b>Instant Feedback:</b> Receive instant feedback on your performance, including detailed explanations for each question. Understand your strengths and areas for improvement to focus your study efforts effectively.</li>
            <li className='text-[18px] mt-3 font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '><b>User-Friendly Interface:</b> Our platform is designed to be intuitive and easy to use, so you can focus on your practice without any distractions. Whether you’re at home or on the go, our website is accessible from any device.</li>
          </ul>
      </div>

      <div className='flex flex-col items-start'>
          <div className="w-[190px] md:w-[250px] lg:w-[350px] md:h-[65px] h-[36px] lg:h-[65px] border-b-[2px] lg:border-b-[4px] border-b-[#ff467a]   
         mx-10 md:mx-16  lg:mx-48 mt-10 lg:mt-20 flex items-center  ">
          <p className='text-[20px] md:text-[28px] lg:text-[38px] text-[#ff467a] font-medium font-prompt'>Why Choose Us?</p>
          </div>

          <ul className='mt-5'>
            <li className='text-[18px]  font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '><b>Continuous Improvement:</b> We are constantly updating and expanding our question database to ensure that you have access to the latest and most relevant practice materials. Your feedback is invaluable to us, and we are committed to continuously improving our platform based on your needs.</li>
            <li className='text-[18px] mt-3 font-medium text-[#303030] lg:px-48 md:px-16 px-10  leading-9 '><b>Completely Free:</b> Unlike many other IELTS practice resources, our website is completely free. We believe that everyone should have access to high-quality test preparation materials, regardless of their financial situation.</li>
          </ul>
      </div>
    </div>
  )
}

export default AboutUs
