import React from "react"
import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import axios from "axios"
import { User } from "./User"


export const UserList:React.FC <{users:any[]}> = ({users}) => {

    const navigate = useNavigate()


    
    

    const changeRole  = async (id:number, user:any)=>{
        alert("Employee with id" + id +" has been Updated")
        if(user.role =="Admin"){
            
             const response = await axios.patch("http://localhost:7005/employees/" + id,"User", {
                headers:{
                    "Content-Type":"text/plain"
                }
             } )
             .then(()=> {alert("Success!")})
             .catch((error)=>{alert("Failed! " + error.message)})
             window.location.reload()

        } else if(user.role =="User"){
        
        const response = await axios.patch("http://localhost:7005/employees/" + id, "Admin", {
            headers:{
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
        const response = await axios.delete("http://localhost:8282/users/" + id) 
        .then(()=> {alert("Success!")})
        .catch((error)=>{alert("Failed! " + error.message)})

        window.location.reload()
    }



    const viewUser = (id:number)=>{
       
        // store userId in a variable to be used by the get request
        store.userID = id;

        // navigate to users account 
        navigate("/userData")
    }



    return(

        <Container>
                <ul>
                    {users.map((user:any)=>(
                    <li>{user.userId} {user.username} <Button className= "btn-primary" onClick={()=>viewUser(user.userId)}>User Background</Button>
                    <Button className= "btn-info" onClick={()=>{changeRole(user.userId,user.role)}}>Change Role</Button>
                    <Button className= "btn-danger" onClick={()=>{deleteUser(user.userId)}}>Delete User</Button></li>))}
                </ul>
        
        </Container>
    )
}

