import { Song } from "./Song"
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAppContext } from "../AppContext/AppContext";

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
}

type SongList = {
    songs: SongInfo[]
}

// Regex to get youtube ids
const regex = /(?:[?&]vi?=|\/embed\/|\/\d\d?\/|\/vi?\/|https?:\/\/(?:www\.)?youtu\.be\/)([A-Za-z0-9_\\-]{11})/

// Uses regex to get the youtube link id
function getYouTubeId(str: string) {
    const result = regex.exec(str)
    let matchedString = null                    

    if (result) {
        matchedString = result[1]
    }

    return matchedString
}

export const SongsList: React.FC<{songs: SongList}> = ({songs}) => {

    const context = useAppContext();

    // Storing the list of songs
    const songList = songs.songs
    
    return (
        <>
            {/* Table header */}
            <thead>
                <tr>
                    <th></th>
                    <th>Song Thumbnail</th>
                    <th>Song Name</th>
                    <th>Song Genre</th>
                    <th></th>
                </tr>
            </thead>
            
            {/* Table body */}
            <tbody>
                {songList.map((song: SongInfo) => {
                    const youtubeId = getYouTubeId(song.youtubeLink)

                    // If the song is playing, show the pause button, else show the play button
                    if (youtubeId && context.currentSong === youtubeId) {
                        return (
                            <tr key={song.songId} style={{gap: "5px", padding: "5px"}} className="rounded w-100">
                                <td className="text-center align-middle" style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle btn-success"
                                        onClick={() => {
                                            context.setCurrentSong("")
                                        }}
                                    >
                                        <FaPause />
                                    </Button>
                                </td>
                                <td className="text-center align-middle">
                                    <img src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}></img>
                                </td>
                                <Song key={song.songId} song={song}></Song>
                            </tr>
                        )
                    } else if (youtubeId) {
                        return (
                            <tr key={song.songId} style={{gap: "5px", padding: "5px"}} className="rounded w-100 h-100">
                                <td className="text-center align-middle" style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle btn-success"
                                        onClick={() => {
                                            context.setCurrentSong(youtubeId)
                                        }}
                                    >
                                        <FaPlay />
                                    </Button>
                                </td>
                                <td className="text-center align-middle">
                                    <img src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}></img>
                                </td>
                                <Song key={song.songId} song={song}></Song>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={song.songId} style={{gap: "5px", padding: "5px"}} className="rounded w-100">
                                <td className="text-center align-middle" style={{textAlign: "left"}}>
                                    <Button
                                        className="rounded-circle btn-success"
                                        onClick={() => {
                                            context.setCurrentSong("")
                                        }}
                                    >
                                        <FaPlay />
                                    </Button>
                                </td>
                                <td className="text-center align-middle">
                                    <img src={`https://img.youtube.com/vi/${youtubeId}/default.jpg`}></img>
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