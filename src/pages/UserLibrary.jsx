import React, { useState, useContext, useEffect, useCallback } from "react";
import styles from '../syles/UserLibrary.module.css';
import MyButton from '../components/UI/MyButton/MyButton';
import FacialForm from "../components/FacialForm";
import { AuthContext } from "../context/context";
import SpotifyService from "../API/SpotifyService";

const UserLibrary = () => {

    const {token} = useContext(AuthContext)

    const [contentType, setContentType] = useState('playlists')

    const [nameContent, setNameContent] = useState('')

    const [contentData, setContentData] = useState([])

    const [likedSong, setLikedSong] = useState([])

    const fetchContent = async (queryType) => {
        const data = await SpotifyService.getFollowContentUser(queryType, token)
        if(queryType === 'tracks') {
            setLikedSong(data)
            console.log(data)
        } else {
            setContentData(data)
        }
    }

    useEffect(() => {
        if(contentType === 'playlists') {
            setNameContent('Playlists')
        }
        if(contentType === 'albums') {
            setNameContent('Albums')
        }
        if(contentType === 'following') {
            setNameContent('Artists')
        }
        if(contentType !== '') {
            fetchContent(contentType);
            if(contentType === 'playlists') {
                fetchContent('tracks')
            }
        }
    }, [contentType])

    const renderContent = useCallback(() => {
        if (contentType === 'playlists') return contentData.items?.map(data => 
            <FacialForm
                key={data.id}
                id={data.id}
                type={'playlist'}
                images={data.images[0]?.url}
                toptext={data.name}
                bottomtext={data.description !== '' ? data.description : data.owner.display_name}
            />
        )
        if (contentType === 'albums') return contentData.items?.map(data => 
            <FacialForm
                key={data.album.id}
                id={data.album.id}
                type={'album'}
                images={data.album.images[0]?.url}
                toptext={data.album.name}
                bottomtext={data.album.artists.map((artist, index) => index + 1 === artist.length ? artist.name : artist.name + ', ')}
            />
        )
        if (contentType === 'following') return contentData.artists.items?.map(data => 
            <FacialForm
                key={data.id}
                id={data.id}
                type={'artist'}
                images={data.images[0]?.url}
                toptext={data.name}
                bottomtext={'Artist'}
            />
        )
    }, [contentData])


    const renderLikedSongForm = () => {
        return likedSong.items?.map((song, index) =>
        <React.Fragment key={song.track.id + index}>
            <span style={{color: '#FBFAFF'}}>
                {index !== 0 ? ' ' + song.track.artists[0]?.name + ' ' : song.track.artists[0]?.name + ' '}
            </span>
            <span style={{color: '#C7B8FB'}}>
                {song.track.name + ' '}
            </span>
            <span className={styles.dot}/>
        </React.Fragment>

        )
    }

    const renderLikedSongs = () => {
        return (
            <div className={styles.liked_song_cont}>
                <div className={styles.last_liked_song}>
                    {renderLikedSongForm()}
                </div>
                <span className={styles.liked_song}>
                    Songs that you liked
                    </span>
                <span className={styles.liked_song_amount}>
                    {likedSong.total} liked songs
                    </span>
                <button className={styles.play_liked_song}>
                    <div className={styles.triangle}></div>
                </button>
            </div>
        )
    }

    return (
        <div className={styles.library_cont}>
            <div className={styles.cont_for_btn}>
                <MyButton onClick={() => setContentType('playlists')}>Playlists</MyButton>
                <MyButton onClick={() => setContentType('albums')}>Albums</MyButton>
                <MyButton onClick={() => setContentType('following')}>Artists</MyButton>
            </div>
            <div className={styles.cont_content_type}>
                <span className={styles.type_name}>{nameContent}</span>
            </div>
            <div className={styles.cont_for_render}>
                {nameContent === 'Playlists' ? renderLikedSongs() : null}
                {renderContent()}
            </div>
        </div>
    )
}

export default UserLibrary;