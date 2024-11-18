import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./playlist.css"

/**
 * Playlist Object
 */
interface Playlist {
  playlistId: number;
  playlistName: string;
  isPublic: boolean;
}

export const PlaylistComponent:React.FC = () => {
  // List of Playlist
  const [playlists, setPlaylists] = useState<Playlist[]>([
    // HARDCODED DELETE LATER
    { playlistId: 1, playlistName: "Chill", isPublic: true },
    { playlistId: 2, playlistName: "Rap", isPublic: false },
    { playlistId: 3, playlistName: "Piano", isPublic: true },
  ]);

  // Selected Playlist
  const navigate = useNavigate();
  const handlePlaylistClick = (playlist: Playlist) => {
    navigate("/playlist/selected-playlist", {state: {playlist}});
  }

  // HTML
  return (
    <main>
      <h1>Playlists</h1>
      
      {/* List of Playlist */}
      {playlists.map((playlist, index) => (
        <section className="row bg-secondary m-2 rounded p-custom" key={index} onClick={() => handlePlaylistClick(playlist)}>
          <div className="col-sm-4 p-3">{playlist.playlistName}</div>
          <div className="col-sm-4 p-3">Username</div>
          <div className="col-sm-4 p-3">{playlist.isPublic ? "Public" : "Private"}</div>
        </section>
      ))}
    </main>
  )
}