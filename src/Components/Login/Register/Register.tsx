import axios from "axios"
import { useState } from "react"
import { Container, Form, Row } from "react-bootstrap"
import "./Register.css"
import { motion } from "motion/react"
import { RegisterSuccess } from "./RegisterSuccess"

export const Register:React.FC = () => {

    //state variable for axios post request
    const[user,setUser] = useState({
        username:"",
        password:""
    })

    //state variable to do conditional rendering on successful registration
    const[isRegistered, setIsRegistered] = useState(false);

    //stores text in form fields in user state variable
    const storeValues = (input: any) => {

        const name = input.target.name
        const value = input.target.value

        setUser((user) => ({...user, [name]:value}))

    }

    const register = async () => {

        //TODO: check if username is already exists in DB before sending post request.
        
        //post request for registering user
        const response = await axios.post("http://localhost:8080/register", user)
        .then(() => {setIsRegistered(true)}) //on successful post request change state of isRegistered
        .catch((error) => {alert("Failed! " + error.message)})
    }
    

    return(

        <Container>
            {/* When isRegistered is true it will display RegisterSuccess component.
                When false it will render username/password form. */}
            {isRegistered ? (
                <RegisterSuccess />
            ): ( 
            <><Form>
                        <h1>Register</h1>
                        <Form.Group>
                            <Form.Label className="LoginLabel mb-0">Username</Form.Label>
                            <Form.Control className="mb-3"
                                type="text"
                                placeholder="Username"
                                data-bs-theme="dark"
                                name="username"
                                onChange={storeValues} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="LoginLabel mb-0">Password</Form.Label>
                            <Form.Control className="mb-3"
                                type="password"
                                placeholder="Password"
                                data-bs-theme="dark"
                                name="password"
                                onChange={storeValues} />
                        </Form.Group>
                        </Form>
                        <motion.button
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={register}
                        >Confirm</motion.button></>
            )}
        </Container>

    )
}