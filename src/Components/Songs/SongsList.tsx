import { Song } from "./Song"

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

    const songList = songs.songs
    
    return (
        <>
            {songList.map((song: SongInfo) => {
                return (
                    <Song key={song.songId} song={song}></Song>
                )
            })}
        </>
    )

}