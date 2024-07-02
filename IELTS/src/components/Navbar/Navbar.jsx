import React, { useState }  from 'react';
import { AlignJustify } from 'lucide-react';
import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };


    return (
        <nav>


            {/* /////// for large devices//////// */}
            <div className="hidden lg:flex flex-row items-center justify-center gap-24 py-2 border-b border-[#303030]">

                {/* ///////logo///////// */}
                <NavLink to={"/"} className="w-[200px] h-[50px] flex justify-center items-center ">
                <div>
                <img src='/assets/ieltsLogo.svg' className='w-full h-full object-contain'/>
                </div>
                   
                </NavLink>
                

                {/* ///////Navlinks/////// */}
                <div className="flex flex-row items-center text-[#303030] font-semibold text-[16px] justify-center gap-14 font-prompt uppercase">
                <NavLink to={"/"}>
                            <div><p>Home</p></div>
                        </NavLink>

                        <NavLink to={"/testcards"}>
                            <div><p>listening</p></div>
                        </NavLink>

                        <NavLink to={"/readingtestcards"}>
                            <div><p>Reading</p></div>
                        </NavLink>

                        <NavLink to={"/aboutus"}>
                            <div><p>About  us</p></div>
                        </NavLink>

                        <NavLink to={"/contactus"}>
                            <div><p>Contact us</p></div>
                        </NavLink>

                </div>
            </div>




            {/* ////// for small devices///////// */}
            <div className="lg:hidden flex flex-row items-center justify-between px-10 py-4 border-b border-[#303030]">

                <NavLink to={"/"} className="w-[200px] h-[50px] flex items-center justify-center">
                <div>
                <img src='/assets/ieltsLogo.svg' className='w-full h-full object-contain'/>
                </div>
                </NavLink>

                <div>
                    <AlignJustify color="#303030" size={35} onClick={toggleNav} className="cursor-pointer" />
                </div>

                {/* sidebar mobile menu */}
                <div className={`lg:hidden fixed h-full w-screen  top-0 right-0 z-50 ${isOpen ? "block" : "hidden"}`}>
                    <section className="text-[#303030] bg-white flex flex-col font-semibold text-[16px]  absolute right-0 top-0 h-full p-8 gap-8 w-full md:text-[30px] font-prompt uppercase   z-50 ">

                        <X color="#303030" size={40} className="mt-0 mb-8  cursor-pointer" onClick={toggleNav} />
                        <NavLink to={"/"} onClick={toggleNav}>
                            <div><p>Home</p></div>
                        </NavLink>

                        <NavLink to={"/testcards"} onClick={toggleNav}>
                            <div><p>listening</p></div>
                        </NavLink>

                        <NavLink to={"/readingtestcards"} onClick={toggleNav}>
                            <div><p>Reading</p></div>
                        </NavLink>

                        <NavLink to={"/aboutus"} onClick={toggleNav}>
                            <div><p>About  us</p></div>
                        </NavLink>

                        <NavLink to={"/contactus"} onClick={toggleNav}>
                            <div><p>Contact us</p></div>
                        </NavLink>

                    </section>

                </div>




            </div>


        </nav>
    )
}

export default Navbar
