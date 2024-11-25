import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "./Components/AppContext/AppContext";
import { ReactNode } from "react";
import SongBar from "./Components/SongBar/SongBar";
import Navbar from "./Components/NavBar/NavBar";


export const PrivateRoute = ({children, roles}:{children:ReactNode; roles?:string[]}) => {

    const {isLoggedIn,userRole} = useAppContext();
    const navigate = useNavigate();
    
    if(!isLoggedIn){
        
        return <Navigate to="/login"/>;
    }

    if(roles && !roles.some((role: string) => userRole.includes(role))){
        return(
        <>
        {console.log("test")}
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