import { Button, Col, Container, Form, Row } from "react-bootstrap"
import {motion} from "motion/react"
import "./Login.css"
import { FcMusic } from "react-icons/fc";

export const Login:React.FC = () => {







return(
    
    <Container id="LoginBox">
        <Row id="header">
        <FcMusic id="icon" />
        <h1 className = "LoginText" id="LoginHeader">Login</h1>
        </Row>
        <Row>
            <Form>
                <Form.Group>
                    <Form.Label className = "LoginLabel">Username</Form.Label>
                    <Form.Control className="formTextBox" type="text" placeholder ="Username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className ="LoginLabel">Password</Form.Label>
                    <Form.Control className="formTextBox" type="password" placeholder = "Password"/>
                </Form.Group>
            </Form>
        </Row>
            <Row>
            <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }
            }
            >Log in</motion.div>
            </Row>
    </Container>
    

    
    
)




}