import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import SongBar from './Components/SongBar/SongBar'
import { AppProvider } from './Components/AppContext/AppContext'

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
          <Routes>
            <Route path="" element={<Home/>} /> 
          </Routes>
        </BrowserRouter>
        <SongBar />
    </AppProvider>
  )
}

export default App
