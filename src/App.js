import './App.css';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import AppRouter from './components/AppRouter';
import { AuthContext, DataWithAudio, LinkOnAudio, UserPlayLists, IDList, PlayedOrNot } from './context/context';
import LeftMenu from './components/UI/LeftMenu/LeftMenu';
import MainWindow from './components/UI/MainWindow/MainWindow';
import SongBar from './components/UI/SongBar/SongBar';
import TopMenu from './components/UI/TopMenu/TopMenu';

function App() {

    const [token, setToken] = useState('')
    const [audioLink, setAudioLink] = useState('')
    const [dataAudio, setDataAudio] = useState([])
    const [userPlaylists, setUserPlaylists] = useState([])
    const [idList, setIdList] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className="App">
            <AuthContext.Provider value={{
                token,
                setToken
            }}>
            <LinkOnAudio.Provider value={{
                audioLink,
                setAudioLink
            }}>
            <DataWithAudio.Provider value={{
                dataAudio,
                setDataAudio
            }}>
            <UserPlayLists.Provider value={{
                userPlaylists,
                setUserPlaylists
            }}>
            <IDList.Provider value={{
                idList,
                setIdList
            }}>
            <PlayedOrNot.Provider value={{
                isPlaying,
                setIsPlaying
            }}>
                <BrowserRouter>
                    <LeftMenu/>
                    <TopMenu/>
                    <MainWindow/>
                    <SongBar/>
                    {/* <AppRouter/> */}
                </BrowserRouter>
            </PlayedOrNot.Provider>
            </IDList.Provider>
            </UserPlayLists.Provider>
            </DataWithAudio.Provider>
            </LinkOnAudio.Provider>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
