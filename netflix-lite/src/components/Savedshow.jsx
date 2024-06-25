
import React from 'react'
import { useEffect, useState } from 'react'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import { userAuht } from '../context/AuthContextProvider';
import { db } from '../firebase';
import {AiOutlineClose} from 'react-icons/ai'
import { onSnapshot,doc, updateDoc } from 'firebase/firestore';
function Savedshow() {
    const {user} = userAuht();

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        onSnapshot(doc(db,"users",`${user?.email}`),(doc)=>{
            setMovies(doc.data()?.savedShows);
        })
    }, [user?.email]);
    const sliderLeft = ()=> {
       
        var slide = document.getElementById("savedSlider");
        slide.scrollLeft = slide.scrollLeft-500;
    }
    const sliderRight = ()=> {
        
        var slide = document.getElementById("savedSlider");
        slide.scrollLeft = slide.scrollLeft+500;
    }

    const deleteShow =async (id)=>{
        try{
            const newMovie = movies.filter((item)=>item.id!==id);
            await updateDoc(doc(db,"users",`${user?.email}`),{
                savedShows:newMovie,
            })

        }
        catch(err){
            console.log(err.message);
        }


    }
    return (
        <>
            <h2 className='text-white text-bold md:text-xl p-4'>Watchlist</h2>
            <div className='relative flex items-center group '>
                <MdChevronLeft onClick={sliderLeft} size={40} className='absolute bg-white left-0 rounded-full opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block ease-in duration-300' />
                <div id={'savedSlider' } className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth'>

                    {movies.map((itemData, id) =>
                        <div key = {id} className='relative w-[160px] sm:w-[200px] md:w-[200px] lg:w-[270px] inline-block cursor-pointer p-2'>
                            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${itemData?.img}`} alt={itemData?.title} />
                            <div className='absolute top-0 left-0 items-center w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100 ease-in duration-300 '>
                                <p className='white-space-normal text-xs md:text-sm font-bold justify-center flex h-full text-center items-center'>{itemData?.title}</p>
                                <p onClick={()=>deleteShow(itemData?.id)}className='absolute text-gray-300 top-2 right-2'><AiOutlineClose size={25}/></p>
                            </div>
                        </div>
                    )}
                </div>
                <MdChevronRight onClick={sliderRight} size={40} className='absolute bg-white right-0 rounded-full opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block ease-in duration-300' />
            </div>
        </>
    )
}

export default Savedshow
