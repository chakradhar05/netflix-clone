import {React, useEffect } from 'react'
import { userAuht } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import Savedshow from '../components/Savedshow';

export default function Account() {
    const {user} = userAuht();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    },[]);
  return (
    <>
      <>
            <div className='relative w-full text-white'>
                <img
                    className='w-full h-[40vw] md:h-[450px] object-cover'
                    src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
                    alt="netflix overlay"
                />
                <div className='absolute inset-0 bg-black opacity-70'></div>
                <div className='absolute inset-0 flex justify-center items-center'>
                    <h1 className='text-3xl md:text-5xl text-center'>My Shows</h1>
                </div>
            </div>
            <div className='p-4'>
                <Savedshow />
            </div>
        </>
    </>
  )
}
