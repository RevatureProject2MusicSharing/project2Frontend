/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form, Modal, Table } from "react-bootstrap"
import { SongsList } from "./SongList"
import axios from "axios"
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { motion } from "motion/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useAppContext } from "../AppContext/AppContext";
import { getYouTubeId } from "../../utils/Utils";

export const Songs: React.FC = () => {
    
    const context = useAppContext()

    // State for showing/hiding add song modal
    const [show, setShow] = useState(false);

    // Functions for handling opening/closing add song modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // State for list of songs
    const [songs, setSongs] = useState({
        songs: []
    })

    // State for adding a new song
    const [song, setSong] = useState({
        "songName": "",
        "youtubeLink": "",
        "genre": ""
    })

    const [loadError, setLoadError] = useState<boolean>(false)

    // Function to set the current song to a random song
    const getRandomSong = async () => {
        setLoadError(false)
        await axios.get("http://localhost:8080/songs/random")
        .then((res) => {
            const youtubeId = getYouTubeId(res.data.youtubeLink)
            if (youtubeId) {
                context.setCurrentSong(youtubeId)
            }
        })
        .catch((err) => {
            setLoadError(true)
            console.log(err.message)
        })
    }

    // Function to get all songs
    const getSongs = async (jwt: string) => {
        setLoadError(false)
        await axios({method: 'get', url: "http://localhost:8080/songs", headers: {"Authorization": "Bearer" + jwt}})
        .then((res) => {
            console.log(res.data)
            setSongs({songs: res.data})
        })
        .catch((err) => {
            setLoadError(true)
            console.log(err.message)
        })
    }

    // Function to add songs
    const handleAddSongs = async () => {
        if (song.songName === "" || song.youtubeLink === "" || song.genre === "") {
            console.log("invalid")
        } else {
            console.log(song)
            await axios.post("http://localhost:8080/songs", song)
            .then((res) => {
                console.log(res)
                getSongs()
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }

    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setSong((song) => ({...song, [name]: value}))
    }

    const login = async () => {
        await axios.post("http://localhost:8080/login", {
                "username": "Harry",
                "password": "password"
            })
            .then((res) => {
                console.log(res)
                console.log("hey i made it")
                getSongs(res.data.jwt)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    // useEffect to trigger getSongs() on component load
    useEffect(() => {
        login()
    }, [])

    return (
        <>
            <Container style={{padding: "25px", width: "100vw"}}>
                {/* Header */}
                <h1 style={{textAlign: "left"}}>Songs</h1>

                {/* Table for list of songs */}
                <Table style={{gap: "5px"}} className="table table-dark table-hover">
                    <SongsList songs={songs}></SongsList>
                </Table>

                <div style={{marginBottom: "10px"}}>
                    {loadError ?
                    <div>
                        <p style={{color: "red"}}>Songs could not be loaded.</p>
                        <Button className="btn-success" onClick={getSongs}>Refresh</Button>
                    </div> : ""}
                </div>

                {/* Button for adding a new song */}
                <motion.button
                    style={{width: "80%", marginBottom: "5px"}}
                    className="btn btn-success mx-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={handleShow}
                >
                    Add New Song
                </motion.button>

                <motion.button
                    style={{width: "80%"}}
                    className="btn btn-success mx-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={getRandomSong}
                >
                    <GiPerspectiveDiceSixFacesRandom /> Play Random Song <GiPerspectiveDiceSixFacesRandom />
                </motion.button>
            
                {/* Modal for adding a new song */}
                <Modal data-bs-theme="dark" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color: "white"}}>Add New Song</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{gap: "5px"}} className="d-flex flex-column">
                        <Form.Control
                            type="text"
                            placeholder="song name"
                            name="songName"
                            onChange={storeValues}
                        />

                        <Form.Control
                            type="text"
                            placeholder="youtube link"
                            name="youtubeLink"
                            onChange={storeValues}
                        />

                        <Form.Control
                            type="text"
                            placeholder="genre"
                            name="genre"
                            onChange={storeValues}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleAddSongs}>
                            Add New Song
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    )

}