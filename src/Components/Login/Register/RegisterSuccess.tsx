import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";

export const RegisterSuccess:React.FC = () => {


    const navigate = useNavigate()



    return(
    
    
    <>
    {/*Will display on successful registration. Has motion button for redirecting back to login page.*/}

    <h3>Registration success.</h3>
    <h4>You are logged out.</h4>
    <motion.button
        className="box"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onClick={() => navigate("/login")}
        >Log In</motion.button>
    </>





    )
}