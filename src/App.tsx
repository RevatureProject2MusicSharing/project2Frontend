import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Songs } from './Components/Songs/SongsPage'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/songs" element={<Songs/>} /> 
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App