import React, { useState } from 'react';
import axios from "axios";

const Layout = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);


    const handleClick = async () => {
        try {
            await axios.post("http://localhost:3000/api/login", {username, password});
            setLogin(true);
        } catch(err) {
            console.log(error);
        }
    }

  return (
    <>
    <div className='bg-white w-screen h-screen flex items-center'>
        <div className='flex flex-col items-center text-center w-full'>
            <div className='border p-5 shadow-containerShadow'>
                <h2 className='text-orange-400 text-bold text-2xl mb-2'>Welcome!</h2>
                <form className='flex flex-col gap-2'>  
                <input 
                onChange={(e) => setUsername(e.target.value)}
                type="text" 
                placeholder='Enter your username...'
                />
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder='Enter your password...'
                />
                <button 
                    onClick={handleClick}
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