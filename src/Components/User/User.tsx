import React, { useEffect, useState } from "react"
import { Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import  { UserList } from "./UserList"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

//Admins should get navigated to this after login 
// it'll display a list of all of the users they can then click a button to 
// either view the user account or the user's playlists

export const User:React.FC = () => {

const navigate = useNavigate()

const [users, setUsers] = useState([])

//defining a useEffect that calls the function that gets all employees
useEffect(()=> {
    getAllUsers()
},[])


// GET request to get all users
const getAllUsers = async () => {


//const response = await axios.get("URL to RDS /users")

const response = await axios.get("http//p2team1.cbsegmk0oe5b.us-east-1.rds.amazonaws.com:5432/postgres/users")


setUsers(response.data)

console.log(response.data)

}



    return(


        <>
            <h3> All Users</h3>
            <Container>
                <UserList users={users}></UserList>
                <Button className="btn-dark" onClick={()=>navigate("/")}>Logout</Button>
                
            </Container>
        
        </>
    )
}