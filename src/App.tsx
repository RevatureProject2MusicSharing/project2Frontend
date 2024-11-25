import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Songs } from './Components/Songs/SongsPage'
import { Login } from './Components/Login/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { Register } from './Components/Login/Register/Register';
import { AppProvider } from './Components/AppContext/AppContext'
import { User } from './Components/User/User'
import { PrivateRoute } from './PrivateRoute'
import { PlaylistComponent } from './Components/Playlist/PlaylistComponent';


function App() {

  return (
    
    <AppProvider>
      <BrowserRouter>
          <Routes>
            <Route path="" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element ={<Register/>} />
            <Route path="/songs" element ={<PrivateRoute><Songs/></PrivateRoute>} />
            <Route path="/users" element = {<PrivateRoute roles={["Admin"]}><User/></PrivateRoute>}/>
            <Route path="/playlists" element = {<PrivateRoute><PlaylistComponent/></PrivateRoute>}/>
          </Routes>
        </BrowserRouter>
    </AppProvider>
  )
}

export default App