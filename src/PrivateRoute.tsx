import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "./Components/AppContext/AppContext";
import { ReactNode } from "react";
import SongBar from "./Components/SongBar/SongBar";
import Navbar from "./Components/NavBar/NavBar";
import Cookies from "js-cookie";


export const PrivateRoute = ({children, roles}:{children:ReactNode; roles?:string[]}) => {

    const {isLoggedIn} = useAppContext();
    const navigate = useNavigate();
    
    if(!isLoggedIn){
        
        return <Navigate to="/login"/>;
    }

    if(roles && !roles.some((role: string) => Cookies.get('role').includes(role))){
        return(
        <>
       
         <h3 id="unauthorizedHeader">Unauthorized.</h3>
         <button onClick={() => navigate(-1)}>Go back.</button>
        </>)
    }

    return (<>
        <Navbar />
        {children}
        <SongBar/>
        </>
    )
};