import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./playlist.css"
import { Button, Container, Dropdown } from "react-bootstrap";
import { PlaylistSongTable } from "./PlaylistSongtable";
import { nav } from "motion/react-client";
import { store } from "../../globalData/store";
/**
 * Playlist Object
 */
interface Playlist {
  playlistId: number;
  playlistName: string;
  isPublic: boolean;
  songList:any[];
}

interface Song {
  songId: number;
  songName: string;
  youtubeLink: string;
  genre: string;
  artist: string;
}


export const PlaylistComponent:React.FC = () => {
  // List of Playlist


  const songs = [
    // HARDCODED DELETE LATER
    { songId: 1, songName: "Come and Get Your Love", youtubeLink: "bc0KhhjJP98", genre: "Disco", artist: "Redbone"},
    { songId: 2, songName: "September", youtubeLink: "Gs069dndIYk", genre: "disco", artist: "Earth, Wind & Fire" },
    { songId: 3, songName: "Piano", youtubeLink: "", genre: "Chill", artist: "Redbone" },
  ];

  const songs2 = [
    // HARDCODED DELETE LATER
    { songId: 1, songName: "Come and Get Your Love", youtubeLink: "bc0KhhjJP98", genre: "Disco", artist: "Redbone"},
    { songId: 2, songName: "Thick Of It", youtubeLink: "At8v_Yc044Y", genre: "disco", artist: "KSI" },
    { songId: 3, songName: "Piano", youtubeLink: "", genre: "Chill", artist: "Redbone" },
  ];

  const songs3 = [
    // HARDCODED DELETE LATER
    { songId: 1, songName: "Stay With Me", youtubeLink: "VEe_yIbW64w", genre: "funk", artist: "Miki Matsubara"},
    { songId: 2, songName: "Telephone Number", youtubeLink: "I0JVRcJLea8", genre: "funk", artist: "Junko Ohashi" },
    { songId: 3, songName: "4:00AM", youtubeLink: "_sOKkON_UnQ", genre: "funk", artist: "Taeko Onuki" },
    { songId: 4, songName: "Plastic Love", youtubeLink: "W0GMlHni1qQ", genre: "funk", artist: "Maria Takeuchi" }
  ];

  const songs4 = [
    // HARDCODED DELETE LATER
    { songId: 1, songName: "Stay With Me", youtubeLink: "VEe_yIbW64w", genre: "funk", artist: "Miki Matsubara"},
    { songId: 2, songName: "Telephone Number", youtubeLink: "I0JVRcJLea8", genre: "funk", artist: "Junko Ohashi" },
    { songId: 3, songName: "4:00AM", youtubeLink: "_sOKkON_UnQ", genre: "funk", artist: "Taeko Onuki" },
    { songId: 4, songName: "Plastic Love", youtubeLink: "W0GMlHni1qQ", genre: "funk", artist: "Maria Takeuchi" }
  ];

  
  const [playlists, setPlaylists] = useState<Playlist[]>([
    // HARDCODED DELETE LATER
    { playlistId: 1, playlistName: "Disco Playlist", isPublic: true, songList : store.songs },
    { playlistId: 2, playlistName: "Pop", isPublic: false,  songList : store.songs2},
    { playlistId: 3, playlistName: "City Pop", isPublic: true, songList : store.songs3},
  ]);

  const newPlaylist = [
    { playlistId: 1, playlistName: "Disco Playlist", isPublic: true, songList : store.songs },
    { playlistId: 2, playlistName: "Pop", isPublic: false,  songList : store.songs2},
    { playlistId: 3, playlistName: "City Pop", isPublic: true, songList : store.songs3},
    {playlistId: 4, playlistName: "Custom", isPublic: true, songList : store.songs4}]

    const oldPlaylist = [
      { playlistId: 1, playlistName: "Disco Playlist", isPublic: true, songList : store.songs },
      { playlistId: 2, playlistName: "Pop", isPublic: false,  songList : store.songs2},
      { playlistId: 3, playlistName: "City Pop", isPublic: true, songList : store.songs3},]

    useEffect(()=>{
      fakeAddPlaylist()
  }, [])
    
  const[currSongList, setSonglist] = useState<Song[]>([])
  useEffect(()=>{
     setSonglist(playlists[0].songList)
  }, [])

  // Selected Playlist
  const navigate = useNavigate();
  const handlePlaylistClick = (playlist: Playlist) => {
    setSonglist(playlist.songList)
  }

  function fakeAddPlaylist() {
      if(store.playlistCreated &&  store.playedOnce) {
          setPlaylists(newPlaylist)
      }
  }
  function fakeDeletePlaylist() {
        setPlaylists(oldPlaylist)
}
  // HTML
  return (
    <>
      <div className="main">
        <h1>Playlists</h1>  
          <div className="lmao">
          <Button onClick={() => navigate("/AddPlaylist")}>Add Playlist</Button>    
          <Button className="btn-danger" onClick={() => {
            store.playlistCreated = false;
            setSonglist(playlists[0].songList);
            fakeDeletePlaylist()
          }}>Delete Playlist
          </Button>    
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            Playlist
            </Dropdown.Toggle>
            <Dropdown.Menu> 
              {playlists.map((playlist, index) => (
            <Dropdown.Item key={index} onClick={() => handlePlaylistClick(playlist)}>{playlist.playlistName}</Dropdown.Item>
              
          ))}
            </Dropdown.Menu>
          </Dropdown>
          </div>
        <PlaylistSongTable songs={currSongList}></PlaylistSongTable>
      </div>
    </>
  )
}