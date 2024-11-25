import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Songs } from './Components/Songs/SongsPage'
import Home from './Components/Home/home'
import { Login } from './Components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { Register } from './Components/Login/Register/Register';
import { AppProvider } from './Components/AppContext/AppContext'
import { User } from './Components/User/User'
import { PrivateRoute } from './PrivateRoute'


function App() {

  return (
    
    <AppProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element ={<Register/>} />
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/songs" element ={<PrivateRoute><Songs/></PrivateRoute>} />
            <Route path="/users" element = {<PrivateRoute roles={["Admin"]}><User/></PrivateRoute>}></Route>
          </Routes>
        </BrowserRouter>
    </AppProvider>
  )
}

export default App