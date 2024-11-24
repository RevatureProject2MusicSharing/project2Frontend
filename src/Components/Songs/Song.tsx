import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { FaCog, FaPause, FaPlay } from "react-icons/fa";
import { getYouTubeId } from "../../utils/Utils";
import { useAppContext } from "../AppContext/AppContext";

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
    artistName: string
}

export const Song: React.FC<{song: SongInfo, playing: boolean}> = ({song, playing}) => {

    const context = useAppContext()

    // Song information
    const songInfo = song

    // Temporary state for storing JWT
    const [jwt, setJwt] = useState("")

    const youtubeId = getYouTubeId(song.youtubeLink)

    // State for hiding if song is deleted
    const [hidden, setHidden] = useState(false)

    // State for showing/hiding the "Add to Playlist" modal
    const [show, setShow] = useState(false);

    // Functions for handling opening and closing the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function for handling a song deletion
    const handleDelete = async () => {

        if (window.confirm("Delete song with ID: " + song.songId + "?")) {
            await axios.delete("http://localhost:8080/songs/" + song.songId, { headers: {"Authorization": "Bearer " + jwt} })
            .then(() => {
                setHidden(true)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }

    }

    const login = async () => {
        await axios.post("http://localhost:8080/login", {
                "username": "Michael",
                "password": "password"
            })
            .then((res) => {
                // console.log(res)
                // console.log("hey i made it")
                setJwt(res.data.jwt)
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
            {/* Conditional rendering for if the song is deleted */}
            {hidden ? "" :
                <>
                    {/* Conditional rendering for if the current song is playing */}
                    {playing ? 
                        <>
                            <td className="text-center align-middle" style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle btn-success"
                                        onClick={() => {
                                            // TODO: Pause currently playing song
                                        }}
                                    >
                                        <FaPause />
                                    </Button>
                                </td>
                            <td className="text-center align-middle">
                                <img src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}></img>
                            </td>
                        </>
                        :
                        <>
                            <td className="text-center align-middle" style={{textAlign: "left"}}>
                                <Button
                                    className="rounded-circle btn-success"
                                    onClick={() => {
                                        if (youtubeId)
                                            context.setCurrentSong(youtubeId)
                                    }}
                                >
                                    <FaPlay />
                                </Button>
                            </td>
                            <td className="text-center align-middle">
                                <img src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}></img>
                            </td>
                        </>
                        }
                    {/* Song information */}
                    {/* <td>{songInfo.songId}</td> */}
                    <td className="text-center align-middle">{songInfo.songName}</td>
                    <td className="text-center align-middle">{songInfo.artistName}</td>
                    {/* <td>{songInfo.youtubeLink}</td> */}
                    <td className="text-center align-middle">{songInfo.genre}</td>
                    <td className="text-center align-middle" style={{textAlign: "right"}}>
                        <DropdownButton data-bs-theme="dark" variant="success" id="dropdown-basic-button" title={<FaCog />}>
                            <Dropdown.Item onClick={handleShow}>Add to Playlist</Dropdown.Item>
                            <Dropdown.Item onClick={handleDelete}>Delete Song</Dropdown.Item>
                        </DropdownButton>
                    </td>


                    {/* Modal for Adding to Playlist */}
                    <Modal data-bs-theme="dark" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{color: "white"}}>Add "{songInfo.songName}" to Playlist</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Select>
                                <option disabled>Choose Playlist</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleClose}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    )

}