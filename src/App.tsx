import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Songs } from './Components/Songs/SongsPage'
import Home from './Components/Home/Home'
import SongBar from './Components/SongBar/SongBar'
import { AppProvider } from './Components/AppContext/AppContext'
import { User } from './Components/User/User'

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
          <Routes>
            <Route path="" element={<Home/>} /> 
            <Route path="/users" element={<User/>}/>
          </Routes>
        </BrowserRouter>
        <SongBar />
    </AppProvider>
  )
}

export default App