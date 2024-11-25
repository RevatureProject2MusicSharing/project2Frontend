import React, { useEffect, useState } from 'react';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import { FaPause, FaPlay } from "react-icons/fa";
import './SongBar.css';
import { RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';
import YouTube, { YouTubeProps } from 'react-youtube';
import { a } from 'motion/react-client';
import { useAppContext } from '../AppContext/AppContext';

// Type for the state management (for the song progress, volume, and play state)
interface SongBarState {
  player: any | undefined;
  isPlaying: boolean;
  songProgress: number;
  volume: number;
}


const SongBar: React.FC = () => {
  // Initial state setup using TypeScript

  const context = useAppContext();

  const [songState, setSongState] = useState<SongBarState>({
    player: undefined,
    isPlaying: false,
    songProgress: 0, // Progress in percentage (0 to 100)
    volume: 50, // Volume percentage (0 to 100)
  });

  useEffect(() => {
    setSongState(prevState => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
  },[])

  useEffect(() =>{
  if (songState.player != undefined){
   if(context.isPlaying){
    songState.player.playVideo()
   }
   else{
    songState.player.pauseVideo()
   }
  }
  },[context.isPlaying])

  useEffect(() =>{
    if (songState.player != undefined){
     if(context.isPlaying){
      songState.player.playVideo()
     }
     else{
      songState.player.pauseVideo()
     }
    }
    },[context.isPlaying])

  // Handle play/pause toggle
  const togglePlayPause = (): void => {
    if (songState.player != undefined) {
      if (songState.isPlaying) {
        
        context.setIsPlaying(false);
      } else {
        
        context.setIsPlaying(true);
      }
    }
    setSongState(prevState => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
  };

  // Handle progress bar change
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSongState(prevState => ({
      ...prevState,
      songProgress: Number(event.target.value),
    }));
  };

  // Handle volume control change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSongState(prevState => ({
      ...prevState,
      volume: Number(event.target.value),
    }));

    songState.player.setVolume(Number(event.target.value))
  };

  //youtube player
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    setSongState(songState => ({
      ...songState,
      elementId: event.target.id,
      player: event.target
    }));

    console.log(songState);
    event.target.playVideo();
  }
  const onPause: YouTubeProps['onPause'] = (event) => {
    // access to player in all event handlers via event.target
    setSongState(songState => ({
      ...songState,
      isPlaying: false
    }));

    console.log("Video paused");
  }
  const onPlay: YouTubeProps['onPlay'] = (event) => {
    // access to player in all event handlers via event.target
    setSongState(songState => ({
      ...songState,
      isPlaying: true 
    }));

    context.setIsPlaying(true)
    console.log("Video Playing");
  }
  const opts: YouTubeProps['opts'] = {
    height: '100',
    width: '170',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      rel: 0,
      controls: 0,
      enablejsapi: 1
    },
  };

  const [optState, setOptState] = useState<YouTubeProps>(opts);

  return (
    <>
    {context.isLoggedIn ? (
      <div className="songBar">
        {/* Left section: Song Info */}
        <div className="left">
          <YouTube videoId={context.currentSong} iframeClassName="youtubePlayer" opts={optState} onPlay={onPlay} onPause={onPause} onReady={onPlayerReady} />
          <div className="songInfo">
            <div className="songTitle">{context.songName}</div>
            <div className="artistName">{context.songArtist}</div>
          </div>
        </div>

        {/* Center section: Play/Pause and Navigation buttons */}
        <div className="center">
          <Button variant="link" className="controlButton" onClick={() => console.log('Previous song')}>
            <RiSkipBackFill size={28} />
          </Button>
          
          <Button variant="link" className="controlButton" onClick={togglePlayPause}>
            {songState.isPlaying ? (
              <FaPause size={28} />
            ) : (
              <FaPlay size={28} />
            )}
          </Button>
          
          <Button variant="link" className="controlButton" onClick={() => context.setCurrentSong("CvjRlYpXS5U")}>
            <RiSkipForwardFill size={28} />
          </Button>
        </div>

        {/* Right section: Volume control and progress bar */}
        <div className="right">
          {/* Volume control */}
          <div className="volumeControl">
            <Form.Range
              min="0"
              max="100"
              value={songState.volume}
              onChange={handleVolumeChange}
              className="volumeSlider"
            />
            <span>{songState.volume}%</span>
          </div>

          {/* Progress bar
          <ProgressBar now={state.songProgress} label={`${state.songProgress}%`} className="progressBar" />
        */}
        </div>
      </div>
      ) : null}
    </>
    );
  };
export default SongBar;
