import { Song } from "./Song"
import 'bootstrap/dist/css/bootstrap.css';
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
                {songList.sort((a, b) => a.songId - b.songId).map((song: SongInfo) => {
                    return (
                        <tr key={song.songId} style={{gap: "5px", padding: "5px"}} className="rounded w-100">
                            <Song key={song.songId} song={song}></Song>
                        </tr>
                    )
                })}
            </tbody>
            
        </>
    )

}