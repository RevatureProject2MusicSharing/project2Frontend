import { Song } from "./Song"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";
import { FaPause, FaPlay } from "react-icons/fa";

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
}

type SongList = {
    songs: SongInfo[]
}

export const SongsList: React.FC<{songs: SongList}> = ({songs}) => {

    // Storing the list of songs
    const songList = songs.songs

    // State for the currently playing song
    const [playingSong, setPlayingSong] = useState(0)
    
    return (
        <>
            {/* Table header */}
            <thead>
                <tr>
                    <th></th>
                    <th>Song Name</th>
                    <th>Song Genre</th>
                    <th></th>
                </tr>
            </thead>
            
            {/* Table body */}
            <tbody>
                {songList.map((song: SongInfo) => {
                    // If the song is playing, show the pause button, else show the play button
                    if (playingSong === song.songId) {
                        return (
                            <tr style={{gap: "5px", padding: "5px"}} className="border rounded w-100">
                                <td style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle"
                                        onClick={() => {
                                            setPlayingSong(0)
                                        }}
                                    >
                                        <FaPause />
                                    </Button>
                                </td>
                                <Song key={song.songId} song={song}></Song>
                            </tr>
                        )
                    } else {
                        return (
                            <tr style={{gap: "5px", padding: "5px"}} className="border rounded w-100">
                                <td style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle"
                                        onClick={() => {
                                            setPlayingSong(song.songId)
                                        }}
                                    >
                                        <FaPlay />
                                    </Button>
                                </td>
                                <Song key={song.songId} song={song}></Song>
                            </tr>
                        )
                    }
                })}
            </tbody>
            
        </>
    )

}