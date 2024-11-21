import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Songs } from './Components/Songs/SongsPage'
import Home from './Components/Home/home'
import { Login } from './Components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { Register } from './Components/Login/Register/Register';
import SongBar from './Components/SongBar/SongBar'
import { AppProvider } from './Components/AppContext/AppContext'

function App() {

  return (
    
    <AppProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element ={<Register/>} />
            <Route path="/songs" element ={<Songs/>} />
          </Routes>
        </BrowserRouter>
        <SongBar/>
    </AppProvider>
  )
}

export default App