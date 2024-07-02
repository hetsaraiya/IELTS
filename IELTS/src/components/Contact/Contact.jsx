import React from 'react'
import { useState } from 'react';
import { Send } from 'lucide-react';

const Contact = () => {

    const [result, setResult] =useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "e96d8bc1-810e-4624-a292-c0d31c263aa7");
        
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };
    return (
        <>
            <div className="px-10 md:px-16 lg:px-48">
                <p className="text-[20px] md:text-[30px] lg:text-[44px] text-[#303030]  font-medium pt-12 pb-8 font-prompt">Contact Us </p>
                <form action="" onSubmit={onSubmit}>
                    <div className=" w-[95%] mx-auto flex flex-col items-center justify-center gap-y-5 md:w-[470px] h-[380px] md:h-[450px] lg:w-[600px] bg-[#2B2D42] mb-32">
                            <input type="text" name="name" id="name" placeholder="Name" required className=" h-[40px]  w-[260px] mx-auto  md:h-[60px]  md:w-[350px] lg:w-[450px]   pl-4  focus-within:outline-none placeholder:font-prompt placeholder:text-[#303030] font-normal " />
                            <input type="text" name="Email" id="Email" placeholder="Email" required  className=" h-[40px] md:h-[60px] w-[260px] mx-auto md:w-[350px] lg:w-[450px] pl-4  focus-within:outline-none placeholder:font-prompt placeholder:text-[#303030] font-normal " />
                            <textarea name="Message" id="Message" cols="30" rows="5" required className="focus-within:outline-none placeholder:font-prompt placeholder:text-[#303030] font-normal resize-none pl-4 pt-4 w-[260px] mx-auto  md:w-[350px] lg:w-[450px] " placeholder="Message" ></textarea>
                            <button type="submit" className="  w-[260px] mx-auto md:w-[350px] lg:w-[450px] mt-1  h-[40px] md:h-[60px] bg-[#ffff] flex flex-row items-center justify-center gap-4  font-prompt font-medium text-[#303030] ">Send Message  <Send size={20} color="#303030" />
                            </button>
                            <p className='text-white'>{result}</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Contact
