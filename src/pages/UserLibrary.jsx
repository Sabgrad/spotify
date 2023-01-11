import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import styles from '../syles/UserLibrary.module.css';
import MyButton from '../components/UI/MyButton/MyButton';
import FacialForm from "../components/FacialForm";
import { AuthContext, DataWithAudio, LinkOnAudio } from "../context/context";
import SpotifyService from "../API/SpotifyService";
import { useNavigate } from "react-router-dom";

const UserLibrary = () => {

    const currentCategoryStyleBtn = {
        background: '#FFFFFF', 
        color: 'black',
    }

    const {token} = useContext(AuthContext)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const {audioLink, setAudioLink} = useContext(LinkOnAudio)

    const btnRef = useRef()

    const router = useNavigate()

    const [contentType, setContentType] = useState('playlists')

    const [nameContent, setNameContent] = useState('')

    const [contentData, setContentData] = useState([])

    const [likedSong, setLikedSong] = useState([])

    const [limit, setLimit] = useState(50)

    const fetchContent = async (queryType, limit) => {
        const data = await SpotifyService.getFollowContentUser(queryType, token, limit)
        if(queryType === 'tracks') {
            setLikedSong(data)
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
            fetchContent(contentType, limit);
            if(contentType === 'playlists') {
                fetchContent('tracks', limit)
            }
        }
    }, [contentType])

    const playLikedSong = () => {
        if(btnRef && likedSong.length !== 0) {
            likedSong.items.map(song => 
                setDataAudio(current => 
                    [...current, song.track.preview_url]    
            ))
            setAudioLink(likedSong.items[0].track.preview_url)
        }
    }

    const renderContent = useMemo(() => {
        if (contentType === 'playlists') return contentData.items?.map(data => 
            <FacialForm
                key={data.id}
                tokenprops={token}
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
                tokenprops={token}
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
                tokenprops={token}
                id={data.id}
                type={'artist'}
                images={data.images[0]?.url}
                toptext={data.name}
                bottomtext={'Artist'}
            />
        )
    }, [contentData])

    const renderLikedSongForm = () => {
        let likedSongForm = [];
        if(likedSong.length !== 0) {
            for(let i = 0; i < 20; i++) {
                likedSongForm.push(likedSong.items[i])
            } 
        }

        if(likedSongForm.length !== 0) {
            return likedSongForm.map((song, index) =>
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
        } else {
            return (
                <span>You have not added any songs to your favorites</span>
            )
        }
    }

    const toLikedSong = (e) => {
        if(!btnRef.current.contains(e.target)) {
            router('/collection')
        }
    }

    const renderLikedSongs = () => {
        return (
            <div className={styles.liked_song_cont} onClick={(e) => toLikedSong(e)}>
                <div className={styles.last_liked_song}>
                    {renderLikedSongForm()}
                </div>
                <span className={styles.liked_song}>
                    Songs that you liked
                    </span>
                <span className={styles.liked_song_amount}>
                    {likedSong.total} liked songs
                    </span>
                <button ref={btnRef} className={styles.play_liked_song} onClick={() => playLikedSong()}>
                    <div className={styles.triangle}></div>
                </button>
            </div>
        )
    }

    return (
        <div className={styles.library_cont}>
            <div className={styles.cont_for_btn}>
                <MyButton style={contentType === 'playlists' ? currentCategoryStyleBtn : null} onClick={() => setContentType('playlists')}>Playlists</MyButton>
                <MyButton style={contentType === 'albums' ? currentCategoryStyleBtn : null} onClick={() => setContentType('albums')}>Albums</MyButton>
                <MyButton style={contentType === 'following' ? currentCategoryStyleBtn : null} onClick={() => setContentType('following')}>Artists</MyButton>
            </div>
            <div className={styles.cont_content_type}>
                <span className={styles.type_name}>{nameContent}</span>
            </div>
            <div className={styles.cont_for_render}>
                {nameContent === 'Playlists' ? renderLikedSongs() : null}
                {renderContent}
            </div>
        </div>
    )
}

export default UserLibrary;