import React from "react"
import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"


export const UserList:React.FC <{users:any[]}> = ({users}) => {

    const navigate = useNavigate()


    const viewUserPlaylists = async(id:number,user:any)=> {
        // change the alert to a toast 
        alert("Viewing " + user +"'s playlists")


       // store userId in a variable to be used by the get request
       store.userID = id;

       // navigate to users playlists
        navigate("/playlists")

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
                    <Button className= "btn-info" onClick={()=>{viewUserPlaylists(user.userId, user.username)}}>User Playlists</Button></li>))}
                </ul>
        
        </Container>
    )
}

