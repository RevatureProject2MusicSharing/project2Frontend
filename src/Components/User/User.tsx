import React, { useEffect, useState } from "react"
import { Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useAppContext } from "../AppContext/AppContext";
import Cookies from "js-cookie";
import "./user.css";

//Admins should get navigated to this after login 
// it'll display a list of all of the users they can then click a button to 
// either view the user account or the user's playlists

/**
 * User Object
 */
interface User {
    jwt: any;
    role: string;
    userId: string;
    username: string;
}

// DELETE user
// Update role

/**
 * User Functional Component
 * @returns HTML
 */
export const User:React.FC = () => {
    // Context API
    useAppContext();
    
    // Setters
    const [users, setUsers] = useState<User[]>([]);

    // Use Effect Rendering
    useEffect(()=> {
        getAllUsers();
    },[]);


    // GET request to get all users
    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:8080/users", { headers: {"Authorization": "Bearer " + Cookies.get('jwt')}});
        setUsers(response.data);
    };

    // PATCH request to change role of user
    const changeRole = async (user: User) => {
        try {
            if (user.role.toLowerCase() === "admin") {
                // Demote
                const isConfirmed = window.confirm("Are you sure you want to demote " + user.username + "?");
                if (isConfirmed) {
                    await axios.patch(
                        `http://localhost:8080/users/${user.userId}`, 
                        "user",
                        { headers: {"Authorization": "Bearer " + Cookies.get('jwt'),
                                    "Content-Type": "text/plain"
                                   }}
                    );
                    getAllUsers();
                }
            }
            else {
                // Promote
                const isConfirmed = window.confirm("Are you sure you want to promote " + user.username + "?");
                if (isConfirmed) {
                    await axios.patch(
                        `http://localhost:8080/users/${user.userId}`, 
                        "admin",
                        { headers: {"Authorization": "Bearer " + Cookies.get('jwt'),
                                    "Content-Type": "text/plain"
                                   }}
                    );
                    getAllUsers();
                }
            }
        } catch (error) {
            console.log("Failed to change user role: ", error);
        }
    }

    // DELETE request to delete a user
    const deleteUser = async (userId: any) => {
        try {
            const isConfirmed = window.confirm("Are you sure you want to delete this user?");
            if (isConfirmed) {
                await axios.delete(`http://localhost:8080/users/${userId}`, { headers: {"Authorization": "Bearer " + Cookies.get('jwt')}});
                setUsers((prevUsers) => prevUsers.filter(user => user.userId !== userId));
            }
        } catch (error) {
            console.log("Failed to delete user: ", error);
        }
    }

    // HTML
    return(
        <>
            <Container style={{padding: "25px", width: "100vw", marginTop: "5%", marginBottom: "10%"}}>
                <h1 style={{textAlign: "left"}}>Users</h1>
                
                {/* GRID */}
                <section>
                    {/* Grid Header Row */}
                    <div className="row mt-1 p-2 custom-user-border">
                        <div className="col-4">
                            <strong>Username</strong>
                        </div>
                        <div className="col-4">
                            <strong>Role</strong>
                        </div>
                    </div>
                    
                    {/* Grid Rows for Each User */}
                    {users.map((currentUser, index) => (
                        <div key={index} className="row p-3 custom-user-row">
                            <div className="col-4">{currentUser.username}</div>
                            <div className="col-4">{currentUser.role}</div>
                            <div className="col-2">
                                {/* Change Role */}
                                <Button className={`btn-sm ${currentUser.role.toLowerCase() === 'admin' ? 'btn-warning' : 'btn-success'}`} onClick={() => changeRole(currentUser)}>
                                    {currentUser.role.toLowerCase() === 'admin' ? 'Demote' : 'Promote'}
                                </Button>
                            </div>
                            <div className="col-2">
                                {/* Delete User */}
                                <Button className="btn-danger btn-sm" onClick={() =>deleteUser(currentUser.userId)}>Delete User</Button>
                            </div>
                        </div>
                    ))}
                </section>
            </Container>
        </>
    )
}