import React, { useState , useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, UserPlayLists } from '../context/context';
import SpotifyService from '../API/SpotifyService';
import styles from '../syles/DropMenu.module.css';

const DropMenu = (props) => {

    const {
        artist, 
        artistid,
        trackid,
        setIsOpen,
    } = props;

    const dropMenuRef = useRef()

    const {userPlaylists, } = useContext(UserPlayLists)

    const {token, } = useContext(AuthContext)

    const addTrackInPlaylist = async (idPlaylist, idTrack, authtoken) => {
        await SpotifyService.addItemToPlaylist(idPlaylist, idTrack, authtoken)
    }

    // const [artistData, setArtistData] = useState([]);

    const router = useNavigate()

    const routerToArtist = (id) => {
        router(`/artist/${id}`)
    }

    const renderPlaylists = () => {
        return userPlaylists.map(playlist => 
            <li key={playlist.id}><span onClick={() => {addTrackInPlaylist(playlist.id, trackid, token); console.log(playlist.id, trackid, token)}}>{playlist.name}</span></li>
        )
    }

    const renderArtist = () => {
        return artist.map((name, index) =>
            <li key={artistid+index}><span onClick={() => routerToArtist(artistid[index])}>{name}</span></li>
        )
    }

    useEffect(() => {
        const click = (e) => {
            if(!dropMenuRef.current.contains(e.target)) {
                setIsOpen(false)
                
            }
        }

        document.addEventListener('mousedown', click)

        return () => {
            document.removeEventListener('mousedown', click)
        }
    }, [])

    return (
        <div ref={dropMenuRef} className={styles.cont}>
            <ul className={styles.main_ul}>
                <span className={styles.category_title} >Add to playlist
                    <ul className={styles.sub_ul}>
                        {renderPlaylists()}
                    </ul>
                </span>
                <span className={styles.category_title}>To the artist
                    <ul className={styles.sub_ul}>
                        {renderArtist()}
                    </ul>
                </span>
            </ul>
        </div>
    )
}

export default DropMenu;