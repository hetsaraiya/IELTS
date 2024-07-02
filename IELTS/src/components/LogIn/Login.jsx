import React, {useState} from 'react'
const VITE_REACT_APP_SERVER = import.meta.env.VITE_REACT_APP_SERVER;
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';

const Login = ({onLoginSuccess}) => {
    const [togglePage, setTogglePage] = useState("Log In")
    const [loginValues, setLoginValues] = useState({username: "", email: "", password: ""})
    const [error, setError] = useState("")

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setLoginValues({...loginValues, [name]: value});
        console.log(loginValues)
    }

    const navigate = useNavigate();
  
    
const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      const formData = new FormData();
      formData.append('username', loginValues.username);
      formData.append('email', loginValues.email);
      formData.append('password', loginValues.password);
  
      try {
        const response = await axios.post( VITE_REACT_APP_SERVER + "/api/signup/",
        formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
  
        alert(`Sign Up successful! Access token: ${response.data.access}`);
        console.log(response.data)
      } catch (error) {
        setError('Sign Up failed! ' + (error.response ? error.response.data.error : 'Network error'));
      }
    };

    const [signUpValues, setSignUpValues] = useState({username: "", password: ""})
    const [error2, setError2] = useState("")

    const handleChange2 = (e) =>{
        const {name, value} = e.target;
        setSignUpValues({...signUpValues, [name]: value});
        console.log(signUpValues)
    }
  
    
const handleSubmit2 = async (e) => {
      e.preventDefault();
      setError("");
  
      const formData = new FormData();
      formData.append('username', signUpValues.username);
      formData.append('password', signUpValues.password);
  
      try {
        const response = await axios.post( VITE_REACT_APP_SERVER + "/api/login/",
        formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
  
        alert(`Login successful!`);
        onLoginSuccess();
        navigate("/dashboard")
        console.log(response.data)
      } catch (error) {
        setError2('Login failed! ' + (error.response ? error.response.data.error : 'Network error'));
        alert(error2);
      }
    };
    
  return (
    <div className='flex font-prompt'>
      {/* {togglePage === "Sign Up" && 
      <form onSubmit={handleSubmit} className='lg:w-[75%] w-full h-screen lg:my-10 flex flex-col items-center justify-center '>
      <p className='md:text-[60px] font-semibold text-[36px] text-[#2B2D42]'>Sign Up</p>

      <div className='flex flex-col mt-[60px] lg:w-[50%] md:w-[70%] w-[82%] '>
      <label className='font-medium md:text-[30px] mb-[20px] text-[24px] text-[#2B2D42]'>Username</label>
      <input type='text' id='username' name='username' value={loginValues.username} onChange={handleChange} required className='w-full p-4  h-[60px] border rounded-[14px] '/>
      </div>
       
      <div className='flex flex-col mt-[60px] lg:w-[50%] md:w-[70%] w-[82%] '>
      <label className='font-medium md:text-[30px] mb-[20px] text-[24px] text-[#2B2D42]'>Email Id</label>
      <input type='email' id='email' name='email' value={loginValues.email} onChange={handleChange} required className='w-full p-4  h-[60px] border rounded-[14px] '/>
      </div>
      <div className='flex flex-col mt-[34px] lg:w-[50%] md:w-[70%] w-[82%]'>
      <label className='font-medium md:text-[30px] text-[24px] mb-[20px] text-[#2B2D42]'>Password</label>
      <input type='password' id='password' name='password' value={loginValues.password} onChange={handleChange} required className='w-full p-4 h-[60px] border rounded-[14px] '/>
      </div>

      <button className='lg:w-[50%] md:w-[70%] w-[82%] h-[60px] hover:bg-white border border-transparent hover:border-[#2B2D42] hover:text-[#2B2D42] duration-500 transition-all bg-[#2B2D42] text-white rounded-[14px] md:text-[30px] text-[24px] font-medium mt-[80px] '>Sign Up</button>
      <p onClick={()=>setTogglePage("Log In")} className='text-[#2B2D42] cursor-pointer text-[24px] font-light underline mt-8 '>Log In</p>
    </form>
      } */}

      {togglePage === "Log In" && 
      <form onSubmit={handleSubmit2} className='lg:w-[75%] w-full h-screen lg:my-10 flex flex-col items-center justify-center '>
      <p className='md:text-[60px] font-semibold text-[36px] text-[#2B2D42]'>Log In</p>

      <div className='flex flex-col mt-[60px] lg:w-[50%] md:w-[70%] w-[82%] '>
      <label className='font-medium md:text-[30px] mb-[20px] text-[24px] text-[#2B2D42]'>Username</label>
      <input type='text' id='username' name='username' value={signUpValues.username} onChange={handleChange2} required className='w-full p-4  h-[60px] border rounded-[14px] '/>
      </div>
       
      {/* <div className='flex flex-col mt-[60px] lg:w-[50%] md:w-[70%] w-[82%] '>
      <label className='font-medium md:text-[30px] mb-[20px] text-[24px] text-[#2B2D42]'>Email Id</label>
      <input type='email' id='email' name='email' value={loginValues.email} onChange={handleChange} required className='w-full p-4  h-[60px] border rounded-[14px] '/>
      </div> */}
      <div className='flex flex-col mt-[34px] lg:w-[50%] md:w-[70%] w-[82%]'>
      <label className='font-medium md:text-[30px] text-[24px] mb-[20px] text-[#2B2D42]'>Password</label>
      <input type='password' id='password' name='password' value={signUpValues.password} onChange={handleChange2} required className='w-full p-4 h-[60px] border rounded-[14px] '/>
      </div>

      <button className='lg:w-[50%] md:w-[70%] w-[82%] h-[60px] hover:bg-white border border-transparent hover:border-[#2B2D42] hover:text-[#2B2D42] duration-500 transition-all bg-[#2B2D42] text-white rounded-[14px] md:text-[30px] text-[24px] font-medium mt-[80px] '>Log In</button>
      {/* <p onClick={()=>setTogglePage("Sign Up")} className='text-[#2B2D42] cursor-pointer text-[24px] font-light underline mt-8 '>Sign Up</p> */}
    </form>
      }
      
      <div className='bg-pink-300 w-[25%] h-screen hidden lg:block '>
        <img src='/assets/sideImg.png' className='w-full h-full'/>
      </div>
    </div>
  )
}

export default Login
