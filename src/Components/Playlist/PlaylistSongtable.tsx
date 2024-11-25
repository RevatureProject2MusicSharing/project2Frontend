import { Button, Container, Dropdown, DropdownButton, DropdownMenu, Table } from "react-bootstrap"
import { useAppContext } from "../AppContext/AppContext"
import { FaPlay } from "react-icons/fa";
export const PlaylistSongTable:React.FC<{songs:any[]}> = ({songs}) => {
    const context = useAppContext();
    
    const updateSong = (youtubeLink:string) => {
        context.setCurrentSong(youtubeLink)
    }
    return(
        <Container>
             <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Song Name</th>
                        <th>Name</th>
                        <th>Artist</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((songs:any)=>(
                        <tr>
                            <td>
                                <div className="buttonContainer">
                                    <img className="image" onClick={() => updateSong(songs.youtubeLink)} src= {`https://i.ytimg.com/vi/${songs.youtubeLink}/maxresdefault.jpg`}/>
                                    <FaPlay onClick={() => updateSong(songs.youtubeLink)} className="play"></FaPlay>
                                </div>
                            </td>
                            <td>{songs.songName}</td>
                            <td>{songs.genre}</td>
                            <td>{songs.artist}</td>
                            <td>
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    more
                                </Dropdown.Toggle>
                                    <DropdownMenu>      
                                        <Dropdown.Item onClick={() => updateSong(songs.youtubeLink)} >Play</Dropdown.Item>
                                        <Dropdown.Item>Delete</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}