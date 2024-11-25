import React from "react"
import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import axios from "axios"
import { User } from "./User"
import Cookies from "js-cookie";



export const UserList:React.FC <{users:any[]}> = ({users}) => {

    const navigate = useNavigate()


    
    

    const changeRole  = async (id:number, user:any)=>{
        alert("Employee with id" + id +" has been Updated")
        if(user.role =="Admin"){
            
             const response = await axios.patch("http//p2team1.cbsegmk0oe5b.us-east-1.rds.amazonaws.com:5432/postgres/users" + id,"User", {
                headers:{
                    "Authorization": "Bearer " + Cookies.get('jwt'),
                    "Content-Type":"text/plain"
                }
             } )
             .then(()=> {alert("Success!")})
             .catch((error)=>{alert("Failed! " + error.message)})
             window.location.reload()

        } else if(user.role =="User"){
        
        const response = await axios.patch("http//p2team1.cbsegmk0oe5b.us-east-1.rds.amazonaws.com:5432/postgres/users" + id, "Admin", {
            headers:{
                "Authorization": "Bearer " + Cookies.get('jwt'),
                "Content-Type":"text/plain"
            }
         })
         .then(()=> {alert("Success!")})
         .catch((error)=>{alert("Failed! " + error.message)})
        window.location.reload()

    }
    

    }

    const deleteUser = async (id:number)=>{
        alert("User with id" + id +" has been deleted")

        //request to delete this employee
        const response = await axios.delete("http//p2team1.cbsegmk0oe5b.us-east-1.rds.amazonaws.com:5432/postgres/users" + id, {headers: {"Authorization": "Bearer " + Cookies.get('jwt')}} ) 
        .then(()=> {alert("Success!")})
        .catch((error)=>{alert("Failed! " + error.message)})

        window.location.reload()
    }






    return(

        <Container>
                <ul>
                    {users.map((user:any)=>(
                    <li>{user.userId} {user.username} {user.role}
                    <Button className= "btn-info" onClick={()=>{changeRole(user.userId,user.role)}}>Change Role</Button>
                    <Button className= "btn-danger" onClick={()=>{deleteUser(user.userId)}}>Delete User</Button></li>))}
                </ul>
        
        </Container>
    )
}

