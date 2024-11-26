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
    const[usernameExists, setUsernameExists] = useState(false);
    const[blankUsername,setBlankUsername] = useState(false);

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

        
        //post request for registering user
        const response = await axios.post("http://localhost:8080/register", user)
        .then(() => {setIsRegistered(true)
            setUsernameExists(false)
        }) //on successful post request change state of isRegistered
        .catch((error) => {
                console.log(user.username)
                if(user.username.trim().length === 0 || user.username.trim() === ""){
                    setBlankUsername(true);
                }
                else{
                    setUsernameExists(true);
                }
            }
        )
    }
    
    

    return(
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}

        >

        <Container>
            {/* When isRegistered is true it will display RegisterSuccess component.
                When false it will render username/password form. */}
            {isRegistered ? (
                <RegisterSuccess />
            ): ( 
            <><Form>
                        <GiPokerHand id="registerIcon" />
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
                        
                        
                        
                        <Form.Group>
                            <Form.Label className="LoginLabel mb-0">Confirm Password</Form.Label>
                            <Form.Control className="mb-2"
                                type="password"
                                placeholder="Password"
                                data-bs-theme="dark"
                                name="password2"
                                onChange={storeValues} />
                        </Form.Group>
                        <Row id="passwordMatchStatus">
                        {passwordMatch ? (<></>):(<span className = "warning"><PiWarningCircleLight className = "warning" />Password does not match.</span>)}
                        </Row>
                        </Form>
                        <Col className="mb-4">
                            <>
                            <Toast id="usernameAlreadyExistsToast" onClose={() => setUsernameExists(false)} show={usernameExists} delay={3000} autohide>
                                
                            <PiWarningCircleLight className = "warning" />
                            <small className = "warning">That username already exists!</small>
                            </Toast>
                            </>
                            <>
                            <Toast id="usernameAlreadyExistsToast" onClose={() => setBlankUsername(false)} show={blankUsername} delay={3000} autohide>
                                
                            <PiWarningCircleLight className = "warning" />
                            <small className = "warning">Username field cannot be empty!</small>
                            </Toast>
                            </>
                        </Col>
                        <div>
                        <motion.button
                        id="confirmButton"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={register}
                        >Confirm</motion.button>
                        </div>
                        <span>Already have an account?</span>
                        <Link to="/login" className = "ms-1" data-bs-theme="dark">Login in here.</Link>
                        </>
                        
            )}
        </Container>
        </motion.div>

    )
}