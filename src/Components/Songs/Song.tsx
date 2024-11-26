/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { FaCog, FaPause, FaPlay } from "react-icons/fa";
import { getYouTubeId } from "../../utils/Utils";
import { useAppContext } from "../AppContext/AppContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
    artistName: string
}

export const Song: React.FC<{song: SongInfo}> = ({song}) => {

    // Context API
    const context = useAppContext()

    // Navigate
    const navigate = useNavigate()

    // State for editing the song
    const [currentSong, setCurrentSong] = useState({
        "songName": song.songName,
        "youtubeLink": song.youtubeLink,
        "genre": song.genre,
        "artistName": song.artistName
    })

    // State for storing Playlist ID to add to
    const [playlistID, setPlaylistID] = useState<number>(0)

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

    const handleAddToPlaylist = async () => {
        if (playlistID === null || playlistID < 1) {
            console.log("invalid")
        } else {
            await axios.post("http://localhost:8080/playlists/" + playlistID, {songid: song.songId}, { headers: {"Authorization": "Bearer " + Cookies.get('jwt')} })
            .then(() => {
                setVersion((prevState) => prevState++)
            })
            .catch(() => {
                navigate("/login")
            })
        }
    }

    // Function to edit songs
    const handleEditSong = async () => {
        if (currentSong.songName === "" || currentSong.youtubeLink === "" || currentSong.genre === "" || currentSong.artistName === "") {
            console.log("invalid")
        } else {
            // console.log(song)
            await axios.put("http://localhost:8080/songs/" + song.songId, currentSong, { headers: {"Authorization": "Bearer " + Cookies.get('jwt')} })
            .then(() => {
                setVersion((prevState) => prevState++)
            })
            .catch(() => {
                navigate("/login")
            })
        }
    }

    // Function for handling a song deletion
    const handleDelete = async () => {

        if (window.confirm("Delete song with ID: " + song.songId + "?")) {
            await axios.delete("http://localhost:8080/songs/" + song.songId, { headers: {"Authorization": "Bearer " + Cookies.get('jwt')} })
            .then(() => {
                setHidden(true)
            })
            .catch(() => {
                navigate("/login")
            })
        }

    }

    return (
        <>
            {/* Conditional rendering for if the song is deleted */}
            {hidden ? "" :
                <>
                    {/* Conditional rendering for if the current song is playing */}
                    {getYouTubeId(currentSong.youtubeLink) === context.currentSong && context.isPlaying ? 
                        <>
                            <td className="text-center align-middle" style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle btn-success"
                                        onClick={() => {
                                            // TODO: Pause currently playing song
                                            context.setIsPlaying(false)
                                        }}
                                    >
                                        <FaPause />
                                    </Button>
                                </td>
                            <td className="text-center align-middle">
                                <img src={`https://img.youtube.com/vi/${getYouTubeId(currentSong.youtubeLink)}/default.jpg`}></img>
                            </td>
                        </>
                        :
                        <>
                            <td className="text-center align-middle" style={{textAlign: "left"}}>
                                <Button
                                    className="rounded-circle btn-success"
                                    onClick={() => {
                                        const id = getYouTubeId(currentSong.youtubeLink)
                                        if (id) {
                                            context.setCurrentSong(id)
                                            context.setSongName(currentSong.songName)
                                            context.setSongArtist(currentSong.artistName)
                                            context.setIsPlaying(true)
                                        }
                                    }}
                                >
                                    <FaPlay />
                                </Button>
                            </td>
                            <td className="text-center align-middle">
                                <img src={`https://img.youtube.com/vi/${getYouTubeId(currentSong.youtubeLink)}/default.jpg`}></img>
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
                        {Cookies.get('role') === 'admin' ? <DropdownButton data-bs-theme="dark" variant="success" id="dropdown-basic-button" title={<FaCog />}>
                            <Dropdown.Item onClick={handleShowEditModal}>Edit Song</Dropdown.Item>
                            {/* <Dropdown.Item onClick={handleShowPlaylistModal}>Add to Playlist</Dropdown.Item> */}
                            <Dropdown.Item onClick={handleDelete}>Delete Song</Dropdown.Item>
                        </DropdownButton> : ""}
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
                            <Form.Control
                                type="number"
                                placeholder="1"
                                name="playlistID"
                                onChange={(input) => {
                                    const num = Number(input.target.value)

                                    if (num > 0) {
                                        setPlaylistID(Number(input.target.value))
                                    }
                                }}
                                value={playlistID}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePlaylistModal}>
                                Close
                            </Button>
                            <Button
                                variant="success"
                                onClick={() => {
                                    handleClosePlaylistModal()
                                    handleAddToPlaylist()
                                }}
                            >
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    )

}