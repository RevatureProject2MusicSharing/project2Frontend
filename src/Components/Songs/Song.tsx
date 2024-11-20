import axios from "axios";
import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
}

export const Song: React.FC<{song: SongInfo}> = ({song}) => {

    // Song information
    const songInfo = song

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
            await axios.delete("http://localhost:8080/songs/" + song.songId)
            .then(() => {
                setHidden(true)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }

    }

    return (
        <>
            {hidden ? "" :
                <>
                    {/* Song information */}
                    {/* <td>{songInfo.songId}</td> */}
                    <td className="text-center align-middle">{songInfo.songName}</td>
                    {/* <td>{songInfo.youtubeLink}</td> */}
                    <td className="text-center align-middle">{songInfo.genre}</td>
                    <td className="text-center align-middle" style={{textAlign: "right"}}>
                        <DropdownButton data-bs-theme="dark" variant="success" id="dropdown-basic-button" title="Options">
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