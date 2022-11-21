import React, { useEffect, useContext } from "react";
import styles from './TopMenu.module.css';
import { AuthContext } from "../../../context/context";
import MyButton from "../MyButton/MyButton";

const TopMenu = () => {

    const CLIENT_ID = 'CLIENT_ID ';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const CLIENT_SECRET = 'CLIENT_SECRET';
    const SCOPE = 'streaming%20ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20app-remote-control%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-follow-modify%20user-follow-read%20user-read-playback-position%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read%20user-read-email%20user-read-private'

    const {token, setToken} = useContext(AuthContext);

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem('token');

        if(!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
            
            window.localStorage.setItem('token', token)
        }
        setToken(token)
        //eslint-disable-next-line
    }, [])
    
    const logout = () => {
        setToken('')
        window.localStorage.removeItem('token')
    }

    return (
        <div className={styles.topMenu}>
            {!token ?
            <MyButton>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`}>
                    Login to Spotify
                </a>
            </MyButton>
            :
            <MyButton>
                Account
            </MyButton>
            }
            <MyButton onClick={() => logout()}>
                Logout
            </MyButton>
        </div>
    )
}

export default TopMenu;