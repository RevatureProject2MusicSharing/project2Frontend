/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form, Modal, Table } from "react-bootstrap"
import { SongsList } from "./SongList"
import axios from "axios"
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';

export const Songs: React.FC = () => {
    
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

    // Function to get all songs
    const getSongs = async () => {
        setLoadError(false)
        await axios.get("http://localhost:8080/songs")
        .then((res) => {
            setLoadError(false)
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
                setLoadError(true)
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
            <Container>
                {/* Header */}
                <h1 style={{textAlign: "left"}}>Songs</h1>

                {/* Table for list of songs */}
                <Table style={{gap: "5px"}} className="">
                    <SongsList songs={songs}></SongsList>
                </Table>

                <div style={{marginBottom: "10px"}}>
                    {loadError ?
                    <div>
                        <p>Songs could not be loaded.</p>
                        <Button onClick={getSongs}>Refresh</Button>
                    </div> : ""}
                </div>

                {/* Button for adding a new song */}
                <Button style={{width: "100%"}} onClick={handleShow}>Add New Song</Button>
            
                {/* Modal for adding a new song */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Song</Modal.Title>
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
                        <Button variant="primary" onClick={handleAddSongs}>
                            Add New Song
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    )

}