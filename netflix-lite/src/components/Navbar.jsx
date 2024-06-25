import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuht } from '../context/AuthContextProvider'
function Navbar() {
  const [show, setShow] = useState(false);
  const { user, logOut } = userAuht();
  const navigate = useNavigate();
  function handleScroll() {
    if (window.scrollY > 80) setShow(true);
    else setShow(false);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  async function handleLogOut() {
    try {
      await logOut();
      navigate('/');
    }
    catch (err) {
      console.log(err);
    }
  }
  console.log(user);
  return (
    <div className={`flex  ${show && 'bg-slate-950 ease-in duration-300'}  items-center justify-between w-full fixed p-5 z-[100]`}>
      <Link to='/'><h1 className='text-red-600 font-bold cursor-pointer text-4xl'>NETFLIX</h1></Link>
      {
        user?.email ? (<div className='flex items-center mr-4'>

          <div className='group'>
            <p className='pr-4 cursor-pointer text-white'>Account</p>
            <div className="z-10 absolute hidden bg-white divide-y divide-gray-100 shadow w-[22] dark:bg-gray-700 group-hover:block">
              <ul className=" text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                <li>
                  <Link to="/profile" className="block px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                </li>
                <li>
                  <Link to="/subscribe" className="block px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Subscribe</Link>
                </li>
                <li>
                  <Link to="/account" className="block px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Shows</Link>
                </li>

              </ul>
            </div>

          </div>

          <button onClick={handleLogOut} className='bg-red-600 px-3 ml-2 py-2 rounded text-white cursor-pointer'>Sign Out</button>
        </div>) :
          (<div>
            <Link to='/login'><button className='pr-4 cursor-pointer text-white'>Sign In</button></Link>
            <Link to='/signup'><button className='bg-red-600 px-4 py-2 rounded text-white cursor-pointer'>Sign Up</button></Link>
          </div>)

      }

    </div>
  )
}

export default Navbar
