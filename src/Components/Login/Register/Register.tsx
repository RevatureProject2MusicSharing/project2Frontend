import axios from "axios"
import { useState } from "react"
import { Col, Container, Form, Row, Toast } from "react-bootstrap"
import "./Register.css"
import { motion } from "motion/react"
import { RegisterSuccess } from "./RegisterSuccess"
import { PiWarningCircleLight } from "react-icons/pi";
import { Link } from "react-router-dom"
import { GiPokerHand } from "react-icons/gi"

export const Register:React.FC = () => {

    //state variable for axios post request
    const[user,setUser] = useState({
        username:"",
        password:""
    })

    const[passwordMatch,setPasswordMatch] = useState(true);



    //state variable to do conditional rendering on successful registration
    const[isRegistered, setIsRegistered] = useState(false);

    const[isInvalid, setIsInvalid] = useState(false);

    //stores text in form fields in user state variable
    const storeValues = (input: any) => {

        const name = input.target.name
        const value = input.target.value

        setUser((user) => ({...user, [name]:value}))

        if(input.target.name ==="password2"){
            if(input.target.value === user.password){
                setPasswordMatch(true)
            }
            else{
                setPasswordMatch(false)
            }
        }

    }

    

    const register = async () => {

        //TODO: check if username is already exists in DB before sending post request.
        //post request for registering user
        const response = await axios.post("http://localhost:8080/register", user)
        .then(() => {setIsRegistered(true)
            setIsInvalid(false)
        }) //on successful post request change state of isRegistered
        .catch((error) => {setIsInvalid(true)})
    }
    

    return(

        <Container>
            {/* When isRegistered is true it will display RegisterSuccess component.
                When false it will render username/password form. */}
            {isRegistered ? (
                <RegisterSuccess />
            ): ( 
            <><Form>
                        <GiPokerHand id="icon" />
                        <h1 id="LoginHeader">Register</h1>
                        <Form.Group>
                            <Form.Label className="LoginLabel mb-0">Username</Form.Label>
                            <Form.Control className="mb-2"
                                type="text"
                                placeholder="Username"
                                data-bs-theme="dark"
                                name="username"
                                onChange={storeValues} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="LoginLabel mb-0">Password</Form.Label>
                            <Form.Control className="mb-2"
                                type="password"
                                placeholder="Password"
                                data-bs-theme="dark"
                                name="password"
                                onChange={storeValues} />
                        </Form.Group>
                        {passwordMatch ? (<></>):(<><PiWarningCircleLight className = "warning" /><span className = "warning">Password does not match.</span></>)}
                        <Form.Group>
                            <Form.Label className="LoginLabel mb-0">Confirm Password</Form.Label>
                            <Form.Control className="mb-2"
                                type="password"
                                placeholder="Password"
                                data-bs-theme="dark"
                                name="password2"
                                onChange={storeValues} />
                        </Form.Group>
                        </Form>
                        <Col className="mb-4">
                            <>
                            <Toast id="usernameAlreadyExistsToast" onClose={() => setIsInvalid(false)} show={isInvalid} delay={3000} autohide>
                            <PiWarningCircleLight className = "warning" />
                            <small className = "warning">That username already exists!</small>
                            </Toast>
                            </>
                        </Col>
                        
                        <motion.button
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={register}
                        >Confirm</motion.button>
                        <span>Already have an account?</span>
                        <Link to="/login" className = "ms-1" data-bs-theme="dark">Login in here.</Link>
                        </>
                        
            )}
        </Container>

    )
}