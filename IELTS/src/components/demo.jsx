import React from 'react'

const Demo = () => {
  return (
    <div>
      
      <div className='container w-[200px] bg-pink-200 border border-black h-[200px]'>
        
        <div className='img-div w-full h-[40%] '>
           <img src='/assets/Main.jpg' className='w-full h-full'/>
        </div>

        <div className='names-div bg-white w-full h-[60%]'>
          <p>Name</p>
          <p>Occupation</p>
        </div>
      </div>


    </div>
  )
}

export default Demo
