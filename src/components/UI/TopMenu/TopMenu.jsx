import React, { useState, useEffect, useContext } from "react";
import styles from './TopMenu.module.css';
import { AuthContext } from "../../../context/context";
import MyButton from "../MyButton/MyButton";
import SpotifyService from "../../../API/SpotifyService";
import { useNavigate } from "react-router-dom";

import {
    CLIENT_ID,
    REDIRECT_URI,
    AUTH_ENDPOINT_CODE,
    RESPONSE_TYPE,
    CLIENT_SECRET,
    SCOPE,
} from '../../../common/common.js';

const TopMenu = () => {
    
    const {token, setToken} = useContext(AuthContext);

    const [refresToken, setRefreshToken] = useState('')

    const router = useNavigate();

    const getToken =  async (code) => {
        const data = await SpotifyService.getTokenRequest(code, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET)
        setToken(data.access_token)
        setRefreshToken(data.refresh_token)
        window.localStorage.setItem('token', data.access_token)
        window.localStorage.setItem('refresh_token', data.refresh_token)
        router('/home')
    }

    const logout = () => {
        setToken('')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('refresh_token')
    }

    const refresh = async () => {
        const data = await SpotifyService.refreshToken(refresToken, CLIENT_ID, CLIENT_SECRET)
        setToken(data.access_token)
        window.localStorage.setItem('token', data.access_token)
    }

    useEffect(() => {
        const url  = window.location.href
        let token_from_ls = window.localStorage.getItem('token');
        let refresh_token_from_ls = window.localStorage.getItem('refresh_token')
        let code_from_url = url.split('=')[1]

        if(!token_from_ls && url.includes('code')) {
            getToken(code_from_url);
        }
        if(token_from_ls && refresh_token_from_ls) {
            setToken(token_from_ls)
            setRefreshToken(refresh_token_from_ls)
        }
    }, [])

    return (
        <div className={styles.topMenu}>
            {!token ?
            <MyButton onClick={() => window.location.href = `${AUTH_ENDPOINT_CODE}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`}>
                Log in
            </MyButton>
            :
            <MyButton >
                Account
            </MyButton>
            }
            <MyButton onClick={() => logout()}>
                Logout
            </MyButton>
            <MyButton onClick={() => refresh()}>refresh token</MyButton>
        </div>
    )
}

export default TopMenu;