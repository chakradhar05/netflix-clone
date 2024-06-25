import React, { useEffect, useState } from 'react'
import requests from '../requests';
import axios from 'axios'

function Banner() {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
      
    })

  }, [])
  function trancateText(str,num){
    if(str?.length>num)return str.slice(0,num) + '...'
    return str;

  }
  return (
    <div className='relative w-full text-white h-[400px] md:h-[500px] lg:h-[650px] xl:h-[700px]'>
      {movie && (
        <>
          <div className='absolute inset-0 bg-gradient-to-r from-black'></div>
          {(movie.backdrop_path && <img
            className='w-full h-full sm:object-cover'
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
          />)}
          <div className='absolute top-[40%] md:top-[50%] xl:top-[60%] left-[2%] right-0 px-4 md:px-8 text-start'>
            <h1 className='text-3xl md:text-5xl font-bold'>{movie.title}</h1>
            <div className='my-4'>
              <button className='border bg-gray-300 border-gray-300 text-black py-2 px-5 md:px-8 xl:px-10'>Play</button>
              <button className='border text-white border-gray-300 py-2 px-4 md:px-8 xl:px-10 ml-2'>Watch Later</button>
            </div>
            <p className='text-gray-400 text-sm'>Released: {movie.release_date}</p>
            <p className='w-full absolute mt-2 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 text-sm mx-auto'>{trancateText(movie.overview, 200)}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Banner