import React, { useContext, useEffect, useState, useMemo } from "react";
import styles from './LeftMenu.module.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Spotify_Logo_RGB_White from '../../../media/Spotify_Logo_RGB_White.png';
import { AuthContext , UserPlayLists} from "../../../context/context";
import SpotifyService from "../../../API/SpotifyService";

const LeftMenu = () => {

    let url = window.location.href

    const [playlistName, setPlaylistName] = useState('')

    const {token} = useContext(AuthContext)

    const {userPlaylists, setUserPlaylists} = useContext(UserPlayLists)

    const router = useNavigate()

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
        let numberPlaylist = 0;
        if(playlist.items?.length !== undefined) {
            setUserPlaylists([])
            playlist.items.forEach(owner => owner.owner.id === me && numberPlaylist++)
            playlist.items.forEach(item => item.owner.id === me && setUserPlaylists(current => [...current, {name: item.name, id: item.id} ]))
            setPlaylistName(`My Playlist #${numberPlaylist}`)
        }

    }, [playlist])

    useEffect(() => {
        if(repeatedRequest !== 0) {
            fetchUserPlaylist(); 
        }
    }, [repeatedRequest])

   const leftListStyle = {
    color: 'white'
   }

    const openPlaylist = (idPlaylist) => {
        router(`/playlist/${idPlaylist}`)
    }

    const userPlaylist = useMemo(() => {
        return playlist.items?.map((name) => 
        <div className={styles.playlist_name_cont} key={name.id}>
            <span style={url.includes(name.id) === true ? leftListStyle : null} className={styles.playlist_name} onClick={() => openPlaylist(name.id)}>
                {name.name}
            </span>
        </div>
        )
    }, [playlist, url])

    return (
         <div className={styles.leftMenu}>
            <div className={styles.LogoCont}>
                <img className={styles.Logo} src={Spotify_Logo_RGB_White} alt="" />
            </div>
            <div className={styles.LeftNavigation}>
                <Link style={url.includes('home') === true ? leftListStyle : null} to='/home'>Home</Link>
                <Link style={url.includes('search') === true ? leftListStyle : null} to='/search'>Search</Link>
                <Link style={url.includes('library') === true ? leftListStyle : null} to='/library'>Your Library</Link>
                <Link onClick={() => createPlaylist()}>Create Playlist</Link>
                <Link style={url.includes('collection') === true ? leftListStyle : null}>Liked Songs</Link>
            </div>
            <div className={styles.UserPlayLists}>
                {userPlaylist}
            </div>
        </div>
    )
}

export default LeftMenu;