import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Song Object
 */
interface Song {
  songId: number;
  songName: string;
  youtubeLink: string;
  genre: string;
}

export const SelectedPlaylistComponent:React.FC = () => {
  // Retrieve Selected Playlist
  const location = useLocation();
  const playlist = location.state?.playlist;

  // Navigate Back When No Selected Playlist 
  const navigate = useNavigate();
  useEffect(() => {
    if (!playlist) {
      navigate("/playlist");
    }
  })

  // List of Songs From Playlist
  const [songList, setSongList] = useState<Song[]>([
    // HARDCODED DELETE LATER
    { songId: 1, songName: "Chill One Song", youtubeLink: "https:hello.com", genre: "Pop" },
    { songId: 2, songName: "Chill Two Song", youtubeLink: "https:hello.com", genre: "Country" },
    { songId: 3, songName: "Chill Three Song", youtubeLink: "https:hello.com", genre: "Funk" },
  ]);

  // HTML
  return (
    <main>
      <h1>{playlist.playlistName}</h1>
      <h3>By: username | {playlist.isPublic ? "Public" : "Private"}</h3>

      {/* List of Songs */}
      {songList.map((song, index) => (
        <section className="row bg-secondary m-2 rounded p-custom" key={index}>
          <div className="col-sm-6 p-3">{song.songName}</div>
          <div className="col-sm-6 p-3">{song.genre}</div>
        </section>
      ))}
    </main>
  )
}