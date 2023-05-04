import { useFormik } from "formik";
import Navbar from '@/components/Navbar';
import React, { useState } from "react";
import axios from 'axios';

const Layout = ({ children }) => {
    const [access, setAccess] = useState(true);
    const [error, setError] = useState(false);
    

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async values => {
            try {
                console.log(values);
                await axios.post("http://localhost:3000/api/login", values );
                setAccess(!access);
            } catch (err) {
                console.log(err);
                setError(true);
            }
            
        },
    });


    if (!access) {
                return (
                    <>
                        <div className='bg-white w-screen h-screen flex items-center'>
                            <div className='flex flex-col items-center text-center w-full'>
                                <div className='border p-5 shadow-containerShadow'>
                                    <h2 className='text-orange-400 text-bold text-2xl mb-2'>Welcome!</h2>
                                    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>  
                                    <input 
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    type="text"
                                    name="username" 
                                    placeholder='Enter your username...'
                                    required
                                    />
                                    <input 
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    type="password" 
                                    name="password"
                                    placeholder='Enter your password...'
                                    required
                                    />
                                    <button 
                                        type="submit"
                                        className='bg-orange-400 text-white p-1 px-2 text-base font-semibold
                                            hover:scale-105 duration-300
                                            '>
                                            Login
                                    </button>
                                    </form>
                                    {error ? <span className="text-red-500 font-medium">Wrong Credentials!</span> : ""}
                                </div>
                            </div>
                        </div>
                    </>
                )
    }

    return (
        <div className='bg-orange-400 min-h-screen flex'>
          <Navbar/>
            <div className='bg-white flex-grow p-4'>
            {children}
            </div>
        </div>
        )
}

export default Layout;