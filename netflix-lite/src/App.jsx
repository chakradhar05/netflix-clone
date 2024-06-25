import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Profile from './pages/Profile'
import Subscribe from './pages/Subscribe'
import Footer from './components/Footer'
import AuthContextProvider from './context/AuthContextProvider'
function App() {


  return (
    <>
    <AuthContextProvider >
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/subscribe' element={<Subscribe/>}/>
     </Routes>
    <Footer/>
    </AuthContextProvider> 
    </>
   
  )
}

export default App
