import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
    <div className='bg-white w-screen h-screen flex items-center'>
        <div className='flex flex-col items-center text-center w-full'>
            <div className='border p-5'>
                <h2 className='text-orange-400 text-bold text-2xl mb-2'>Welcome!</h2>
                <form className='flex flex-col gap-2'>  
                <input type="text" placeholder='Enter your username...'></input>
                <input type="password" placeholder='Enter your password...'></input>
                <button 
                    className='bg-orange-400 text-white p-1 px-2 text-base font-semibold
                        hover:scale-105 duration-300
                        '>
                        Login
                </button>
                </form>
            </div>
        </div>
    </div>
</>
  )
}

export default Layout;