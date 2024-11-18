import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import { Login } from './Components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { Register } from './Components/Login/Register/Register';

function App() {

  return (
    <>
    
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element ={<Register/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
