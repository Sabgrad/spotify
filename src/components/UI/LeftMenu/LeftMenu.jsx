import React, { useContext, useEffect, useState } from "react";
import styles from './LeftMenu.module.css';
import { Link } from "react-router-dom";
import Spotify_Logo_RGB_White from '../../../media/Spotify_Logo_RGB_White.png';
import { AuthContext } from "../../../context/context";
import SpotifyService from "../../../API/SpotifyService";

const LeftMenu = () => {

    const [playlistName, setPlaylistName] = useState('')

    const {token} = useContext(AuthContext)

    const [playlist, setPlaylist] = useState([])
    
    const [me, setMe] = useState('')

    const [repeatedRequest, setRepeatedRequest] = useState(0)

    const fetchMe = async () => {
        const dataMe = await SpotifyService.getMe(token);
        setMe(dataMe.id)
    }

    const fetchUserPlaylist = async () => {
        const dataUserPlaylist = await SpotifyService.getUserPlaylist(me, token);
        setPlaylist(dataUserPlaylist)
    }

    const sendPlaylist = async (playlistname, description, type) => {
        await SpotifyService.postPlaylist(token, me, playlistname, description, type);
        setRepeatedRequest(prev => prev + 1)
    }

    useEffect(() => {
        if(token !== '') {
            fetchMe();
        }
        // eslint-disable-next-line
    }, [token])

    useEffect(() => {
        if(me !== '') {
            fetchUserPlaylist();
        }
        // eslint-disable-next-line
    }, [me])

    const createPlaylist = () => {
        sendPlaylist(playlistName, "test create", true);
    }

    useEffect(() => {
        let x = 0;
        if(playlist.items?.length !== undefined) {
            playlist.items.forEach(owner => owner.owner.id === me && x++)
            setPlaylistName(`My Playlist #${x}`)
        }
    }, [playlist])
    
    useEffect(() => {
        if(repeatedRequest !== 0) {
            fetchUserPlaylist(); 
        }
    }, [repeatedRequest])

    const userPlaylist = () => {
        return playlist.items?.map((name) => 
            <Link key={name.id} to={`/playlist/${name.id}`}>{name.name}</Link>
        )
    }

    return (
         <div className={styles.leftMenu}>
            <div className={styles.LogoCont}>
                <img className={styles.Logo} src={Spotify_Logo_RGB_White} alt="" />
            </div>
            <div className={styles.LeftNavigation}>
                <Link to='/home'>Home</Link>
                <Link to='/search'>Search</Link>
                <Link to='/album'>Your Library</Link>
                <Link onClick={() => createPlaylist()}>Create Playlist</Link>
                <Link>Liked Songs</Link>
            </div>
            <div className={styles.UserPlayLists}>
                {userPlaylist()}
            </div>
        </div>
    )
}

export default LeftMenu;