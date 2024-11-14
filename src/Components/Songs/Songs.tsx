import { SongsList } from "./SongsList"

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
}

type SongList = {
    songs: SongInfo[]
}

export const Songs: React.FC = () => {
    
    const songs: SongList = {
        songs: [
            {
                songId: 1,
                songName: "songName",
                youtubeLink: "songLink",
                genre: "songGenre"
            },
            {
                songId: 2,
                songName: "songName",
                youtubeLink: "songLink",
                genre: "songGenre"
            },
        ]
    }

    return (
        <>
            <div>
                <h1>Songs</h1>

                <SongsList songs={songs}></SongsList>

            </div>
        </>
    )

}