import { Container, Form, Row } from "react-bootstrap"
import {motion} from "motion/react"
import "./Login.css"
import { FcMusic } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login:React.FC = () => {

const navigate = useNavigate()

const[loginCreds, setLoginCreds] = useState({
    username:"",
    password:""
})

useEffect(() => {
    
    document.documentElement.style.setProperty('--bs-border-radius','5px')
    
},[])


const storeValues = (input:any) => {

    const name = input.target.name
    const value = input.target.value

    setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))
    

}

const login = () => {

    console.log(loginCreds)
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
                    onChange={storeValues}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className ="LoginLabel mb-0">Password</Form.Label>
                    <Form.Control className="" 
                    type="password" 
                    placeholder = "Password" 
                    data-bs-theme = "dark"
                    name="password"
                    onChange={storeValues}/>
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
    </Container>
    

    
    
)




}