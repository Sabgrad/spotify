import React, { useContext } from "react";
import styles from '../syles/SongForm.module.css';
import noimage from '../media/noimage.png';
import { duration } from '../hooks/duration';
import { LinkOnAudio } from "../context/context";

const SongForm = (props) => {

    const {dateadd, audio, index, image, name, artist, album, songduration} = props;

    const {audioLink, setAudioLink} = useContext(LinkOnAudio)

    const dateAdded = () => {
        if(dateadd !== undefined) return (
            <div className={styles.dateAddedContainer}>
                <span className={styles.dateAddedSpan}>
                    {(dateadd).substring(0, 10)}
                </span>
            </div>
        )
    }

    const Audio = () => {
        setAudioLink(audio)
    }

    return(
        <div className={styles.container} onClick={Audio}>
            <div className={styles.songNumberContainer}>
                <span className={styles.songNumberSpan}>
                    {index + 1}
                </span>
            </div> 
            <div className={styles.imgContainer}>
                <img className={styles.songImage} 
                    src={image !== undefined ? image : noimage} 
                    alt=''/>
            </div>
            <div className={styles.nameSongContainer}>
                <span className={styles.nameSongSpan}>
                    {name}
                </span>
                <span className={styles.nameArtistSpan}>
                    {artist}
                </span>
            </div>
            <div className={styles.albumContainer}>
                <span className={styles.albumSpan}>
                    {album}
                </span>
            </div>
            {dateAdded()}
            <div className={styles.durationContainer}>
                <span className={styles.durationSpan}>
                    {duration(songduration)} 
                </span>
            </div>
            <div className={styles.interactionContainer}>
                <button className={styles.interactionButton}/>
            </div>
        </div>  
    )
}

export default  React.memo(SongForm);