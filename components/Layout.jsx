import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn('credentials', { username, password });
    } catch (error) {
        console.error('Помилка авторизації:', error.message);
        return error.message;
    }
  };

  if (!session) {
    return (
      <>
        <div className='bg-white w-screen h-screen flex items-center'>
          <div className='flex flex-col items-center text-center w-full'>
            <div className='border p-5 shadow-containerShadow'>
              <h2 className='text-orange-400 text-bold text-2xl mb-2'>Welcome!</h2>
              <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <input
                  onChange={e => setUserName(e.target.value)}
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  value={username}
                  type="text"
                  name="username"
                  placeholder='Enter your username...'
                  required
                />
                <input
                  onChange={e => setPassword(e.target.value)}
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  value={password}
                  type="password"
                  name="password"
                  placeholder='Enter your password...'
                  required
                />
                <button
                  type="submit"
                  className='bg-orange-400 text-white p-1 px-2 text-base font-semibold
                          hover:scale-105 duration-300'
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='bg-orange-400 min-h-screen flex'>

      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div className='bg-white flex-grow p-4'>
        {children}
      </div>
    </div>
  )
}

export default Layout;