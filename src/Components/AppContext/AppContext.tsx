import React, { createContext, useState, useContext, ReactNode } from 'react';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

// Define the shape of the global state
interface GlobalState {
  isLoggedIn: boolean;
  currentSong: string | undefined;
  isPlaying: boolean;
  userRole: string;
  songName: string;
  songArtist: string;
  login: () => void;
  logout: () => void;
  setCurrentSong: (song: string) => void;
  setIsPlaying: (currState: boolean) => void;
  setSongName: (songName: string) => void;
  setSongArtist: (songArtist: string) => void;
}

// Create the context with a default value (we'll provide the default values later)
const AppContext = createContext<GlobalState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<string | undefined>("RjNj__yp9Tk");
  const [userRole, setUserRole] = useState<string>("");

  const [songName, setSongName] = useState<string>("Little Wing");
  const [songArtist, setSongArtist] = useState<string>("Jimi Hendrix");

  // Function to log in
  const login = () => {
    setIsLoggedIn(true)
    const token = Cookies.get('jwt');
    const decoded = jwtDecode(String(token));
    console.log(decoded);
    Cookies.set('role', decoded.role, { path: '/', expires: 1, secure: false, sameSite: 'Strict' });

  };

  // Function to log out
  const logout = () => {
    Cookies.remove('jwt');
    setIsLoggedIn(false)
    setIsPlaying(false);
    setCurrentSong("RjNj__yp9Tk");
    setSongName("Little Wing");
    setSongArtist("Jimi Hendrix");
  };
    
  // Function to set the current song
  const updateCurrentSong = (songId: string) => setCurrentSong(songId);
  
  const updateIsPlaying = (currState: boolean) => {
    setIsPlaying(currState);
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, currentSong, isPlaying, userRole, songName, songArtist, login, logout, setIsPlaying: updateIsPlaying, setCurrentSong: updateCurrentSong, setSongName, setSongArtist }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): GlobalState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
