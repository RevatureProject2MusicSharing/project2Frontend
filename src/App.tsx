import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import { Login } from './Components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <>
    
      <BrowserRouter>
          <Routes>
            <Route path="" element={<Login/>} /> 
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
