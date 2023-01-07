import React, { useContext, useState, useRef, useEffect } from "react";
import styles from '../syles/SongForm.module.css';
import noimage from '../media/noimage.png';
import { duration } from '../hooks/duration';
import { LinkOnAudio } from "../context/context";
import DropMenu from "./DropMenu";

const SongForm = (props) => {

    const {
        dateadd, 
        audio,
        index, 
        image, 
        name, 
        artist,
        artistid,
        album, 
        songduration,
        trackid,
    } = props;

    const {audioLink, setAudioLink} = useContext(LinkOnAudio)

    const menuRef = useRef()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

    const dateAdded = () => {
        if(dateadd !== undefined && dateadd !== null && dateadd !== NaN) return (
            <div className={styles.date_added_cont}>
                <span className={styles.date_added_span}>
                    {(dateadd).substring(0, 10)}
                </span>
            </div>
        )
    }

    const Audio = (e) => {
        if(!menuRef.current.contains(e.target)) {
            setAudioLink(audio)
        }
    }

    return(
        <div className={styles.songform_container} onClick={(e) => Audio(e)}>
            <div className={styles.song_number_cont}>
                <span className={styles.song_number_span}>
                    {index + 1}
                </span>
            </div> 
            <div className={styles.img_cont}>
                <img className={styles.song_image} 
                    src={image !== undefined ? image : noimage} 
                    alt=''/>
            </div>
            <div className={styles.name_song_cont}>
                <span className={styles.name_song_span}>
                    {name}
                </span>
                <span className={styles.name_artist_span}>
                    {artist.map((name, index) => index + 1 === artist.length ? name : name + ', ')}
                </span>
            </div>
            <div className={styles.album_cont}>
                <span className={styles.album_span}>
                    {album}
                </span>
            </div>
            {dateAdded()}
            <div className={styles.duration_cont}>
                <span className={styles.duration_span}>
                    {duration(songduration)} 
                </span>
            </div>
            <div ref={menuRef} className={styles.interaction_cont}>
                <button className={styles.interaction_button} onClick={() => setIsOpen(true)}/>
                {isOpen && <DropMenu 
                    artist={props.artist} 
                    artistid={props.artistid} 
                    trackid={props.trackid} 
                    setIsOpen={setIsOpen}
                />}
            </div>
        </div>
    )
}

export default  React.memo(SongForm);