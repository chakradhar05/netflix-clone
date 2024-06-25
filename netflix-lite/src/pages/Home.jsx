import React from 'react'
import Banner from '../components/Banner'
import Rows from '../components/Rows'
import requests from '../requests'
function Home() {
  return (
    <div className=' '>
      <Banner/>
      <Rows rowID='1' title='Up Coming' fetchURL={requests.requestUpcoming}/>
      <Rows rowID='2' title='Popular' fetchURL={requests.requestPopular}/>
      <Rows rowID='3' title='Trending' fetchURL={requests.requestTrending}/>
      <Rows rowID='4' title='Top Rated' fetchURL={requests.requestTopRated}/>
      <Rows rowID='5' title='Horror' fetchURL={requests.requestHorror}/>
      <Rows rowID='6' title='Comedy' fetchURL={requests.requestComedy}/>
      <Rows rowID='7' title='Thriller' fetchURL={requests.requestThriller}/>

    </div>
  )
}

export default Home
