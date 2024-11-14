import { Container } from "react-bootstrap"

type SongInfo = {
    songId: number,
    songName: string,
    youtubeLink: string,
    genre: string,
}

export const Song: React.FC<{song: SongInfo}> = ({song}) => {
    
    const songInfo = song

    return (
        <Container>
            {songInfo.songId}
            {songInfo.songName}
            {songInfo.youtubeLink}
            {songInfo.genre}
        </Container>
    )

}