import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'


import Movie from './Movie';

function Rows({ rowID,title, fetchURL}) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get(fetchURL).then((res) => {
            setMovies(res.data.results);
         
        }).catch((e) => {
            console.log("error ocuured", e);
        })
    }, []);
    const sliderLeft = ()=> {
        console.log(rowID);
        var slide = document.getElementById("slider" + rowID);
        slide.scrollLeft = slide.scrollLeft-500;
    }
    const sliderRight = ()=> {
        console.log(rowID);
        var slide = document.getElementById("slider"+rowID);
        slide.scrollLeft = slide.scrollLeft+500;
    }
    return (
        <div className='m-2 p-4'>
            <h2 className='text-white text-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group '>
                <MdChevronLeft onClick={sliderLeft} size={30} className='absolute bg-white left-0 rounded-full opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block ease-in duration-300'/>
                <div id={'slider'+rowID} className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth'>

                    {movies.map((itemData, id) => 
                        (itemData?.backdrop_path && <Movie key={id} id = {itemData?.id} title={itemData?.title} backdrop_path={itemData?.backdrop_path}/>)
                    )}
                </div>
                <MdChevronRight onClick={sliderRight} size={30} className='absolute bg-white right-0 rounded-full opacity-50 hover:opacity-60 z-10 cursor-pointer hidden group-hover:block ease-in duration-300'/>
            </div>


        </div>
    )
}

export default Rows
