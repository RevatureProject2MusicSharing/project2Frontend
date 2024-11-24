/* eslint-disable @typescript-eslint/no-explicit-any */
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

    // YouTube ID for this song
    const youtubeId = getYouTubeId(song.youtubeLink)

    // Context API
    const context = useAppContext()

    // State for editing the song
    const [currentSong, setCurrentSong] = useState({
        "songName": song.songName,
        "youtubeLink": song.youtubeLink,
        "genre": song.genre,
        "artistName": song.artistName
    })

    // Temporary state for storing JWT
    const [jwt, setJwt] = useState("")

    // State for updating the component
    const [version, setVersion] = useState(0)

    // State for hiding if song is deleted
    const [hidden, setHidden] = useState(false)

    // State for showing/hiding the "Edit Song" modal
    const [showEditModal, setShowEditModal] = useState(false);

    // Functions for handling opening and closing the modal
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    // State for showing/hiding the "Add to Playlist" modal
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    // Functions for handling opening and closing the modal
    const handleClosePlaylistModal = () => setShowPlaylistModal(false);
    const handleShowPlaylistModal = () => setShowPlaylistModal(true);

    // Function for updating the edited song's state
    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setCurrentSong((currentSong) => ({...currentSong, [name]: value}))
    }

    // Function to edit songs
    const handleEditSong = async () => {
        if (currentSong.songName === "" || currentSong.youtubeLink === "" || currentSong.genre === "" || currentSong.artistName === "") {
            console.log("invalid")
        } else {
            // console.log(song)
            await axios.put("http://localhost:8080/songs/" + song.songId, currentSong, { headers: {"Authorization": "Bearer " + jwt} })
            .then(() => {
                setVersion((prevState) => prevState++)
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }

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

    // Temp function for logging in
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
                    <td className="text-center align-middle">{currentSong.songName}</td>
                    <td className="text-center align-middle">{currentSong.artistName}</td>
                    {/* <td>{songInfo.youtubeLink}</td> */}
                    <td className="text-center align-middle">{currentSong.genre}</td>
                    <td className="text-center align-middle" style={{textAlign: "right"}}>
                        <DropdownButton data-bs-theme="dark" variant="success" id="dropdown-basic-button" title={<FaCog />}>
                            <Dropdown.Item onClick={handleShowEditModal}>Edit Song</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowPlaylistModal}>Add to Playlist</Dropdown.Item>
                            <Dropdown.Item onClick={handleDelete}>Delete Song</Dropdown.Item>
                        </DropdownButton>
                    </td>


                    {/* Modal for Editing Song */}
                    <Modal data-bs-theme="dark" show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{color: "white"}}>Edit Song</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{gap: "5px"}} className="d-flex flex-column">
                            <Form.Control
                                type="text"
                                placeholder="youtube link"
                                name="youtubeLink"
                                onChange={storeValues}
                                value={currentSong.youtubeLink}
                            />

                            <Form.Control
                                type="text"
                                placeholder="song name"
                                name="songName"
                                onChange={storeValues}
                                value={currentSong.songName}
                            />
                            
                            <Form.Control
                                type="text"
                                placeholder="artist name"
                                name="artistName"
                                onChange={storeValues}
                                value={currentSong.artistName}
                            />

                            <Form.Control
                                type="text"
                                placeholder="genre"
                                name="genre"
                                onChange={storeValues}
                                value={currentSong.genre}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditModal}>
                                Close
                            </Button>
                            <Button 
                                variant="success"
                                onClick={() => {
                                    handleCloseEditModal()
                                    handleEditSong()
                                }}
                            >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal for Adding to Playlist */}
                    <Modal data-bs-theme="dark" show={showPlaylistModal} onHide={handleClosePlaylistModal}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{color: "white"}}>Add "{currentSong.songName}" to Playlist</Modal.Title>
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
                            <Button variant="secondary" onClick={handleClosePlaylistModal}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleClosePlaylistModal}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    )

}