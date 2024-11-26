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
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './Songs.css'

export const Songs: React.FC = () => {
    
    // Context API
    const context = useAppContext()

    // Navigate
    const navigate = useNavigate()

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
        "genre": "",
        "artistName": ""
    })

    const [loadError, setLoadError] = useState<boolean>(false)

    // Function to set the current song to a random song
    const getRandomSong = async () => {
        context.setCurrentSong("")
        await axios.get("http://localhost:8080/songs/random", { headers: {"Authorization": "Bearer " + Cookies.get('jwt')} })
        .then((res) => {
            const youtubeId = getYouTubeId(res.data.youtubeLink)
            if (youtubeId) {
                context.setCurrentSong(youtubeId)
                context.setSongName(res.data.songName)
                context.setSongArtist(res.data.artistName)
            }
        })
        .catch(() => {
            navigate("/login")
        })
    }

    // Function to get all songs
    const getSongs = async () => {
        setLoadError(false)
        await axios({method: 'get', url: "http://localhost:8080/songs", headers: {"Authorization": "Bearer " + Cookies.get('jwt')}})
        .then((res) => {
            // console.log(res.data)
            setSongs({songs: res.data})
        })
        .catch((err) => {
            if (err.response.status && err.response.status === 403) {
                navigate("/login")
            } else {
                setLoadError(true)
            }
        })
    }

    // Function to add songs
    const handleAddSongs = async () => {
        if (song.songName === "" || song.youtubeLink === "" || song.genre === "" || song.artistName === "") {
            console.log("invalid")
        } else {
            // console.log(song)
            await axios.post("http://localhost:8080/songs", song, { headers: {"Authorization": "Bearer " + Cookies.get('jwt')} })
            .then(() => {
                // console.log(res)
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

    // useEffect to trigger getSongs() on component load
    useEffect(() => {
        getSongs()
    }, [])

    return (
        <>
            <Container style={{padding: "25px", width: "100vw", marginTop: "5%", marginBottom: "10%", height: "100%"}}>
                {/* Header */}
                <h1 style={{textAlign: "left"}}>Songs</h1>

                {/* Table for list of songs */}
                <Table style={{gap: "5px"}} className="table table-dark table-hover" id="dark">
                    <SongsList songs={songs}></SongsList>
                </Table>

                <div style={{marginBottom: "10px"}}>
                    {loadError ?
                    <div>
                        <p style={{color: "red"}}>Songs could not be loaded.</p>
                        <Button className="btn-success" onClick={() => { getSongs() }}>Refresh</Button>
                    </div> : ""}
                </div>

                {/* Button for adding a new song */}
                {Cookies.get('role') === 'admin' ?
                    <motion.button
                        style={{width: "80%", marginBottom: "5px"}}
                        className="btn btn-success mx-auto"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={handleShow}
                    >
                        Add New Song
                    </motion.button> : ""
                }
                

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
                            placeholder="youtube link"
                            name="youtubeLink"
                            onChange={storeValues}
                        />

                        <Form.Control
                            type="text"
                            placeholder="song name"
                            name="songName"
                            onChange={storeValues}
                        />
                        
                        <Form.Control
                            type="text"
                            placeholder="artist name"
                            name="artistName"
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