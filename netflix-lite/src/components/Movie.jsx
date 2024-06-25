import React, { useState } from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { userAuht } from '../context/AuthContextProvider';
import { db } from '../firebase';
import { arrayUnion,doc,updateDoc } from 'firebase/firestore';

export default function Movie({id,title,backdrop_path}) {
  const {user} = userAuht();
  const [like,setLike] = useState(false);
  const [saved,setSaved] = useState(false);
  const moivieID = doc(db,"users",`${user?.email}`);
  async function saveShow(){
    if(user?.email){
      setLike(!like);
      setSaved(true);
      await updateDoc(moivieID,{
        savedShows : arrayUnion({
          id : id,
          title : title,
          img : backdrop_path,
        })
      })
    }
    else{
      alert("Please login to save your movie");
    }

  }

  return (
    
    <div className='relative w-[160px] sm:w-[200px] md:w-[220px] lg:w-[270px] inline-block cursor-pointer p-2'>
      <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title} />
      <div className='absolute top-0 left-0 items-center w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100 ease-in duration-300 '>
        
        <p className='white-space-normal text-xs md:text-sm font-bold justify-center flex h-full text-center items-center'>{title}</p>
        <p onClick={saveShow}>{
          like ? <FaHeart className='absolute top-4 left-4 text-gray-300'/> : <FaRegHeart className='absolute top-4 left-4 text-gray-300'/>}</p>      
      </div>
    </div>
    
  )
}
