import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuht } from '../context/AuthContextProvider';
import { useState } from 'react';

function Signup() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {user,signUp} = userAuht();
    const navigate = useNavigate()
    async function onHandleSubmit(e){
        e.preventDefault();
        try{
            await signUp(email,password);
            navigate('/');
        }
        catch(error){
            console.log(error)

        }
    }
    return (
        <>
            <div className='w-full h-screen'>

                <img className='absolute hidden sm:block w-full h-full object-cover' src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg" alt="netflix overlay" />
                <div className='fixed top-0 left-0 w-full h-full bg-black/80'></div>
                <div className='fixed w-full px-4 py-24 z-50'>
                    <div className='max-w-[450px] h-[600px] mx-auto bg-black/95 text-white'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold m-2'>Sign Up</h1>
                            <form onSubmit={onHandleSubmit} className='flex flex-col w-full p-2'>
                                <input onChange={(e)=>{setEmail(e.target.value)}}  className='bg-gray-600 p-3 my-2 rounded' type="email" placeholder='Email' autoComplete='email' />
                                <input onChange={(e)=>{setPassword(e.target.value)}}  className='bg-gray-600 p-3 my-2 rounded' type="password" placeholder='Password' autoComplete='passward' />
                                <button className='bg-red-600 my-6 py-3 rounded font-bold'>Sign Up</button>
                                <div className='flex items-center justify-between text-sm text-gray-600'>
                                    <p>
                                        <input className='m-1' type="checkbox" />Remember me
                                    </p>
                                    <p>Need Help?</p>
                                </div>
                                <Link to='/login'><p className='py-6 hover: decoration-black hover:cursor-pointer'><span className='text-sm text-gray-600'>Already subscibed to Netflix?</span>{' '}Login</p>
                                </Link>
                            </form>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
