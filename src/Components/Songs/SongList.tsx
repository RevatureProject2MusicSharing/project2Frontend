import { Song } from "./Song"
import 'bootstrap/dist/css/bootstrap.css';
import { useAppContext } from "../AppContext/AppContext";
import { getYouTubeId } from "../../utils/Utils";

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
    artistName: string
}

type SongList = {
    songs: SongInfo[]
}

export const SongsList: React.FC<{songs: SongList}> = ({songs}) => {

    const context = useAppContext()

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
                    <th>Song Artist</th>
                    <th>Song Genre</th>
                    <th></th>
                </tr>
            </thead>
            
            {/* Table body */}
            <tbody>
                {songList.map((song: SongInfo) => {
                    const youtubeId = getYouTubeId(song.youtubeLink)

                    // If the song is playing, show the pause button, else show the play button
                    if (youtubeId) {
                        return (
                            <tr key={song.songId} style={{gap: "5px", padding: "5px"}} className="rounded w-100">
                                <Song key={song.songId} song={song} playing={youtubeId === context.currentSong}></Song>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={song.songId} style={{gap: "5px", padding: "5px"}} className="rounded w-100">
                                <Song key={song.songId} song={song} playing={false}></Song>
                            </tr>
                        )
                    }
                })}
            </tbody>
            
        </>
    )

}