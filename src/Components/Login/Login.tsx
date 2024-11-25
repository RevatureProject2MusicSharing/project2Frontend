import { Col, Container, Form, Row } from "react-bootstrap"
import {motion} from "motion/react"
import "./Login.css"
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { PiWarningCircleLight } from "react-icons/pi";
import { GiPokerHand } from "react-icons/gi";

export const Login:React.FC = () => {

const context = useAppContext();
const navigate = useNavigate();
const[invalidLogin, setInvalidLogin] = useState(false);

const[loginCreds, setLoginCreds] = useState({
    username:"",
    password:""
})

//Store values from username and password form fields
const storeValues = (input:any) => {

    const name = input.target.name
    const value = input.target.value

    //updates loginCreds
    setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))
    

}

const login = async (loginCreds: any) => {
    try {
        // Post request for registering the user
        const response = await axios.post("http://localhost:8080/login", loginCreds);

        // Extract the JWT from the response body
        const jwt = response.data.jwt; // .data is where axios stores the response body

        // Use the context and navigate
        Cookies.set('jwt', jwt, { path: '/', expires: 1, secure: false, sameSite: 'Strict' });
        context.login();
        
        navigate("/songs");

    } catch (error) {
        setInvalidLogin(true)
    }
};

//Handles enter keypresses on form fields, runs login function
const handleKeyPress = async (event: any) => {
    if (event.key === "Enter"){
        await login(loginCreds);
    }
}

return(
    
    <Container id="LoginBox">
        <Row id="header">
        
        <GiPokerHand id="icon" />
        <span className = "LoginText" id="LoginHeader">Log in to All In Audio</span>
        <Col>
        {invalidLogin ? (<><PiWarningCircleLight className = "warning" /><span className = "warning">Invalid credentials.</span></>):(<></>)}
        </Col>
        </Row>
        <Row id="formFieldRow">
            <Form>
                <Form.Group>
                    <Form.Label className = "LoginLabel mb-0">Username</Form.Label>
                    <Form.Control className="mb-3" 
                    type="text" 
                    placeholder ="Username" 
                    data-bs-theme = "dark"
                    name="username"
                    onChange={storeValues}
                    onKeyDown={handleKeyPress}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className ="LoginLabel mb-0">Password</Form.Label>
                    <Form.Control className="" 
                    type="password" 
                    placeholder = "Password" 
                    data-bs-theme = "dark"
                    name="password"
                    onChange={storeValues}
                    onKeyDown={handleKeyPress}/>
                </Form.Group>
            </Form>
        </Row>
        <Row>
            <motion.button
            className="box"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }
            }
            onClick={() => login(loginCreds)}
            >Log in</motion.button>
            </Row>
            <Row className="d-flex align-items-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="ms-1" data-bs-theme="dark">Sign up here.</Link>
        </Row>
    </Container>
    )
}
