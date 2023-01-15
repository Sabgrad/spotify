import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../syles/FacialForm.module.css';
import noimage from '../media/noimage.png';
import { DataWithAudio, IDList, LinkOnAudio, PlayedOrNot } from "../context/context";
import SpotifyService from "../API/SpotifyService";

const FacialForm = (props) => {

    const {id, images, toptext, bottomtext, type, tokenprops} = props;

    const btnRef = useRef()

    const router = useNavigate()

    const [fullData, setFullData] = useState([])

    const { idList, setIdList } = useContext(IDList) 

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const {audioLink, setAudioLink} = useContext(LinkOnAudio)

    const { isPlaying, setIsPlaying } = useContext(PlayedOrNot)

    const getTracks = async (type) => {
        if(type === 'album' || type === 'playlist') {
            const data = await SpotifyService.getAlbumOrPlaylist(type + 's', id, tokenprops)
            setFullData(data)
        }
        if(type === 'artist') {
            const data = await SpotifyService.getArtistTopTracks(id, tokenprops)
            setFullData(data)
        }
    }

    const handleClick = (id, e) => {
        if(!btnRef.current.contains(e.target)) {
            if(type === 'album') {router(`/album/${id}`)}
            if(type === 'playlist') {router(`/playlist/${id}`)}
            if(type === 'artist') {router(`/artist/${id}`)}
        }
    }
    
    const playSongs = () => {
        if(btnRef && idList !== id) {
            getTracks(type)
            setIdList(id);
            setIsPlaying(true)
        }
        if(btnRef && idList === id) {
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        if(fullData.length !== 0) {
            setDataAudio([])
            if(type === 'playlist' || type === 'album') {
                fullData.tracks.items.map(song => {
                        setDataAudio((current) => 
                            [...current, song.track ? song.track.preview_url : song.preview_url]
                        )
                    }
                )
                type === 'playlist' ? setAudioLink(fullData.tracks.items[0].track.preview_url) : setAudioLink(fullData.tracks.items[0].preview_url)
            }
            if(type === 'artist') {
                fullData.tracks.map(song => {
                        setDataAudio((current) => 
                            [...current, song.preview_url]
                        )
                    } 
                )
                setAudioLink(fullData.tracks[0].preview_url)
            }
        }
    }, [fullData])

    const btnPlayPause = () => {
        if(idList === id && isPlaying === true) return (
            <div className={styles.played}><div></div></div>
        )
        if(idList === id && isPlaying === false) return (
            <div className={styles.pause}></div>
        )

        if(idList !== id) return (
            <div className={styles.triangle}></div>
        )
    }

    return(
        <div className={styles.facial_form} onClick={(e) => handleClick(id, e)}>
            <div className={styles.cont_facial_image}>
                <img className={styles.facila_image} 
                    src={images !== undefined ? images : noimage}
                    alt=''
                />
                <button 
                    ref={btnRef} 
                    className={idList === id ? styles.current_played_form : styles.play_playlist_song} 
                    onClick={() => {
                        playSongs();
                    }}
                >
                    {btnPlayPause()}
                </button>
            </div>
            <span className={styles.top_text}>
                {toptext}
            </span>
            <span className={styles.bottom_text}>
                {bottomtext}
            </span>
        </div>
    )
}

export default FacialForm;