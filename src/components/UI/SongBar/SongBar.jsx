import React, { useContext, useState, useRef, useEffect } from "react";
import { DataWithAudio, LinkOnAudio, PlayedOrNot } from "../../../context/context";
import styles from './SongBar.module.css'

const SongBar = () => {

    const {audioLink} = useContext(LinkOnAudio)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const { isPlaying, setIsPlaying } = useContext(PlayedOrNot)

    const [currentSongTime, setCurrentSongTime] = useState(0)

    const [songDuration, setSongDuration] = useState(0)

    const [currentSong, setCurrentSong] = useState([])

    const audioElem = useRef()

    const songBarRef = useRef()

    useEffect(() => {
        dataAudio.forEach((song, index) =>  {
            if(audioLink === song.url) {
                setIsPlaying(true)
                setCurrentSong(dataAudio[index])
            } 
        })
    }, [audioLink])

    useEffect(() => {console.log(dataAudio)}, [dataAudio])

    useEffect(() => {console.log(currentSong)}, [currentSong])

    const nextprevious = (where) => {
        const index = dataAudio.findIndex(current => current.url === currentSong.url)
        if(where === 'next') {
            if(index === dataAudio.length - 1) {
                setCurrentSong(dataAudio[0])
            } else {
                setCurrentSong(dataAudio[index + 1])
            }
        }
        if(where === 'previous') {
            if(index === 0) {
                setCurrentSong(dataAudio[dataAudio.length - 1])
            } else {
                setCurrentSong(dataAudio[index - 1])
            }
        }
        if(isPlaying === false) {
            setIsPlaying(true)
        }
    }

    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        if(isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    }, [isPlaying])

    const onPlaying = () => {
        const songDurationFunc = audioElem.current.duration
        const curretnTime = audioElem.current.currentTime
        setCurrentSongTime(curretnTime / songDuration * 100)
        setSongDuration(songDurationFunc)
    }

    const getWidth = (e) => {
        let width = songBarRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * songDuration;
    }

    return (
        <div className={styles.songBar}>
            <audio ref={audioElem} onTimeUpdate={onPlaying} src={currentSong.url} controls  style={{display: 'none'}}> </audio>
            <div className={styles.left_side}>
                <span className={styles.title}>{currentSong.title}</span>
            </div>
            <div className={styles.middle_side}>
                <button onClick={() => nextprevious('previous')} className={styles.btn}> back </button>
                <button onClick={PlayPause} className={styles.btn}>play-payse</button>
                <button onClick={() => nextprevious('next')} className={styles.btn}> forward </button>
                <div className={styles.timeBar} onClick={getWidth} ref={songBarRef}>
                    <div className={styles.listeningTime} style={{width: `${currentSongTime+'%'}`}}></div>
                </div>
            </div>
            <div className={styles.right_side}>
                <span >123</span>
            </div>
        </div>
    )
}

export default SongBar;