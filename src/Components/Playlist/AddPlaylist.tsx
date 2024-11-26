import { Button, Container, Form, Row } from "react-bootstrap"
import { Songs } from "./CopiedSong/SongsPage"
import { Song } from "./CopiedSong/Song"
import { color } from "motion/react"
import "./playlist.css"
import { store } from "../../globalData/store"
import { useNavigate } from "react-router-dom"
export const AddPlaylist:React.FC = () => { 
    const navigate = useNavigate()
    function addPlaylistButtion() {
        store.playlistCreated = true
        navigate("/playlists")
    }
    return(
        <Container style={{background: "transparent"}}>
             <Row id="formFieldRow">
            <Form>
                <Form.Group>
                    <Form.Label className = "LoginLabel mb-0">Playlist Name</Form.Label>
                    <Form.Control className="mb-3" 
                    type="text" 
                    placeholder ="Name" 
                    data-bs-theme = "dark"
                    name="Playlist Name"/>
                    <Form.Check 
                    type="switch"
                    label="Private Playlist"
                    className="custom-switch"
                    />
                </Form.Group>

            </Form>
        </Row>
        <Button variant="success" onClick={addPlaylistButtion}>Add Playlist</Button>
        <Row>
            <Songs></Songs>
        </Row>
        </Container>
    )
}