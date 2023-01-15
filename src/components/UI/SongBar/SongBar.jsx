import React, { useContext, useState, useRef, useEffect } from "react";
import { DataWithAudio, LinkOnAudio, PlayedOrNot } from "../../../context/context";
import styles from './SongBar.module.css'

const SongBar = () => {

    const {audioLink} = useContext(LinkOnAudio)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const { isPlaying, setIsPlaying } = useContext(PlayedOrNot)

    const [currentSong, setCurrentSong] = useState([])

    const [currentSongTime, setCurrentSongTime] = useState(0)

    const [songDuration, setSongDuration] = useState(0)

    const [currentVolume, setCurrentVolume] = useState(100)

    const audioElem = useRef()

    const songBarRef = useRef()

    const volumeBarRef = useRef()

    useEffect(() => {
        dataAudio.forEach((song, index) =>  {
            if(audioLink === song.url) {
                setCurrentSong(dataAudio[index])
                setIsPlaying(true)
            }
        })
    }, [audioLink])

    const nextprevious = (where) => {
        if(dataAudio.length !== 0) {
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
    }

    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        if(dataAudio.length !== 0) {
            if(isPlaying) {
                audioElem.current.play()
            } else {
                audioElem.current.pause()
            }
        }
    }, [isPlaying])

    const onPlaying = () => {
        const songDurationFunc = audioElem.current.duration
        const curretnTime = audioElem.current.currentTime
        setCurrentSongTime(curretnTime / songDuration * 100)
        setSongDuration(songDurationFunc)
    }

    const getTimeBar = (e) => {
        let width = songBarRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * songDuration;
    }

    const getVolumeBar = (e) => {
        let width = volumeBarRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width;
        audioElem.current.volume = divprogress;
        setCurrentVolume(divprogress * 100)
    }

    return (
        <div className={styles.songBar}>
            <audio ref={audioElem} onTimeUpdate={onPlaying} src={currentSong.url} controls style={{display: 'none'}}> </audio>
            <div className={styles.left_side}>
                <div className={styles.img_cont}>
                    <img src={'image' in currentSong && currentSong.image} className={styles.song_img}/>
                </div>
                <div className={styles.name_title_cont}>
                    <span className={styles.title}>{'title' in currentSong && currentSong.title}</span>
                    <span className={styles.name}>{'artists' in currentSong && currentSong.artists.map((name, index) => index + 1 === currentSong.artists.length ? name.name : name.name + ', ')}</span>
                </div>
            </div>
            <div className={styles.middle_side}>
                <button onClick={() => nextprevious('previous')} className={styles.btn}> back </button>
                <button onClick={PlayPause} className={styles.btn}>play-payse</button>
                <button onClick={() => nextprevious('next')} className={styles.btn}> forward </button>
                <div className={styles.timeBar} onClick={getTimeBar} ref={songBarRef}>
                    <div className={styles.listeningTime} style={{width: `${currentSongTime+'%'}`}}></div>
                </div>
            </div>
            <div className={styles.right_side}>
                <div className={styles.volume_bar} ref={volumeBarRef} onClick={getVolumeBar}>
                    <div className={styles.current_volume} style={{width: `${currentVolume+'%'}`}}></div>
                </div>
            </div>
        </div>
    )
}

export default SongBar;