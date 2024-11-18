import { Container, Form, Row } from "react-bootstrap"
import {motion} from "motion/react"
import "./Login.css"
import { FcMusic } from "react-icons/fc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login:React.FC = () => {

const navigate = useNavigate()

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

//Function that runs on log in button press/enter key press that sends an async login http request to backend
//Will store logged in session in context
const login = () => {
    
    console.log(loginCreds)
}

//Handles enter keypresses on form fields, runs login function
const handleKeyPress = (event: any) => {
    if (event.key === "Enter"){
        login();
    }
}

return(
    
    <Container id="LoginBox">
        <Row id="header">
        <FcMusic id="icon" />
        <h1 className = "LoginText" id="LoginHeader">Login</h1>
        </Row>
        <Row>
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
            onClick={login}
            >Log in</motion.button>
            </Row>
            <Row className="d-flex align-items-center">
            <span>Don't have an account?</span>
            <Link to="/register" className="ms-1" data-bs-theme="dark">Sign up here.</Link>
            </Row>
    </Container>
    
)




}