import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Songs } from './Components/Songs/SongsPage'
import Home from './Components/Home/home'
import { Login } from './Components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { Register } from './Components/Login/Register/Register';
import SongBar from './Components/SongBar/SongBar'
import { AppProvider } from './Components/AppContext/AppContext'
<<<<<<< HEAD
import { User } from './Components/User/User'
=======
import Navbar from './Components/NavBar/NavBar'
>>>>>>> d25dce6a6fdb1d7921a624610ce9ca90faf88697

function App() {

  return (
    
    <AppProvider>
      <BrowserRouter>
      <Navbar />
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element ={<Register/>} />
            <Route path="/songs" element ={<Songs/>} />
            <Route path="/users" element = {<User/>}></Route>
          </Routes>
        </BrowserRouter>
<<<<<<< HEAD
        {/* <SongBar/> */}
=======
      <SongBar /> 
>>>>>>> d25dce6a6fdb1d7921a624610ce9ca90faf88697
    </AppProvider>
  )
}

export default App