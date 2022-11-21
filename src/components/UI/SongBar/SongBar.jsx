import React, { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { DataWithAudio, LinkOnAudio } from "../../../context/context";
import styles from './SongBar.module.css'

const SongBar = () => {

    const {audioLink} = useContext(LinkOnAudio)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const [audio, setAudio] = useState('')

    const [songNumber, setSongNumber] = useState(0)

    const [isPlaying, setIsPlaying] = useState(false)

    const audioElem = useRef()

    useEffect(() => {
        dataAudio.forEach((song, index) =>  {
            if(audioLink === song) {
                setAudio(song)
                setSongNumber(index)
            } 
        })
        // setIsPlaying(true)
    }, [dataAudio, audioLink])

    const nextprevious = (where) => {
        if(where === 'next') {
            if(songNumber < dataAudio.length - 1) {
                setAudio(dataAudio[songNumber + 1])
                setSongNumber(songNumber + 1)
            }
            if(songNumber === dataAudio.length - 1) {
                setAudio(dataAudio[0])
                setSongNumber(0)
            }
        }
        if(where === 'previous') {
            if(songNumber > 0) {
                setAudio(dataAudio[songNumber - 1])
                setSongNumber(songNumber - 1)
            }
            if(songNumber === 0) {
                setAudio(dataAudio[dataAudio.length - 1])
                setSongNumber(dataAudio.length - 1)
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

    return (
        <div className={styles.songBar}>
            <button onClick={() => nextprevious('previous')} className={styles.btn}> back </button>
            <button onClick={PlayPause} className={styles.btn}>play-payse</button>
            <button onClick={() => nextprevious('next')} className={styles.btn}> forward </button>
            <audio ref={audioElem} src={audio} controls autoPlay> </audio>
        </div>
    )
}

export default SongBar;