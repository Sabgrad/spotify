import React, { useContext, useState, useRef, useEffect } from "react";
import { DataWithAudio, LinkOnAudio, PlayedOrNot } from "../../../context/context";
import styles from './SongBar.module.css';
import repeatListGreen from '../../../media/repeatListGreen.svg';
import repeatListGrey from '../../../media/repeatListGrey.svg';
import repeatOne from '../../../media/repeatOne.svg';
import randomOff from '../../../media/randomGrey.svg';
import randomOn from '../../../media/randomGreen.svg';

const SongBar = () => {

    const {audioLink} = useContext(LinkOnAudio)
    const {dataAudio} = useContext(DataWithAudio)
    const { isPlaying, setIsPlaying } = useContext(PlayedOrNot)

    const [update, setUpdate] = useState(0)

    const [currentSong, setCurrentSong] = useState([])
    const [audioSettings, setAudioSettings] = useState({
        duration: 0,
        currenttime: 0,
        volume: 0.1,
    })

    const [repeat, setRepeat] = useState('norepeat')
    const [randomOrder, setRandomOrder] = useState(false)
    const [playedSongs, setPlayedSongs] = useState([])

    const audioElem = useRef()
    const songBarRef = useRef()
    const volumeBarRef = useRef()

    useEffect(() => {
        audioElem.current.volume = 0.1;
    }, [])

    useEffect(() => {
        if(dataAudio.length !== 0) {
            console.log(isPlaying, update)
            if(isPlaying) {
                audioElem.current.play()
            } else {
                audioElem.current.pause()
            }
        }
    }, [isPlaying, update])

    useEffect(() => {
        dataAudio.forEach((song, index) =>  {
            if(audioLink === song.url) {
                setPlayedSongs([index])
                setCurrentSong(dataAudio[index])
                setIsPlaying(true)
                setUpdate(prev => prev + 1)
            }
        })
    }, [audioLink])

    useEffect(() => {
        if(audioSettings.currenttime === 100) {
            const index = dataAudio.findIndex(current => current.url === currentSong.url)

            if(randomOrder) {

            }
            if(!randomOrder) {
                if(repeat === 'norepeat') {
                    if(index !== dataAudio.length - 1) {
                        setCurrentSong(dataAudio[index + 1])
                        setUpdate(prev => prev + 1)
                    }
                }
                if(repeat === 'repeatlist') {
                    if(index === dataAudio.length - 1) {
                        setCurrentSong(dataAudio[0])
                    } else {
                        setCurrentSong(dataAudio[index + 1])
                    }
                    setUpdate(prev => prev + 1)
                } 
                if(repeat === 'onetrack') {
                    setAudioSettings(current => ({...current, currenttime: 0}))
                    setUpdate(prev => prev + 1)
                }
            }
        }
    }, [audioSettings.currenttime])

    const nextprevious = (where) => {
        if(dataAudio.length !== 0) {
            const index = dataAudio.findIndex(current => current.url === currentSong.url)

            if(randomOrder) {
                if(where === 'next') {

                }
            }
            if(!randomOrder) {
                if(where === 'next') {
                    if(index === dataAudio.length - 1) {
                        setCurrentSong(dataAudio[0])
                    } else {
                        setCurrentSong(dataAudio[index + 1])
                    }
                }
                if(where === 'previous') {
                    if(audioSettings.currenttime < 5) {
                        if(index === 0) {
                            setCurrentSong(dataAudio[dataAudio.length - 1])
                        } else {
                            setCurrentSong(dataAudio[index - 1])
                        } 
                    } else {
                        audioElem.current.currentTime = 0;
                    }
                }
            }
            if(isPlaying === false) {
                setIsPlaying(true)
            }
            if(isPlaying === true) {
                setUpdate(prev => prev + 1)  
            }
        }
    }

    const PlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const randomClick = () => {
        if(randomOrder) {
            setPlayedSongs([])
            setRandomOrder(false)
        }
        if(!randomOrder) {
            setRandomOrder(true)
        }
    }

    const onPlaying = () => {
        const songduration = audioElem.current.duration;
        const currentsongtime = audioElem.current.currentTime;
        const time = currentsongtime / songduration * 100;
        setAudioSettings(current => ({
            ...current,
            duration: songduration, 
            currenttime: time,
        }))
    }

    const getTimeBar = (e) => {
        let width = songBarRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * audioSettings.duration;
    }

    const getVolumeBar = (e) => {
        let width = volumeBarRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width;
        console.log(divprogress)
        let volume = divprogress * 100;
        audioElem.current.volume = divprogress;
        setAudioSettings(current => ({...current, volume: volume}))
    }

    const play_or_pause = () => {
        if(isPlaying) return (
            <div className={styles.played}><div></div></div>
        )
        if(!isPlaying) return (
            <div className={styles.pause}></div>
        )
    }

    const setTypeOfRepeat = () => {
        if(repeat === 'norepeat') {
            setRepeat('repeatlist')
        }
        if(repeat === 'repeatlist') {
            setRepeat('onetrack')
        }
        if(repeat === 'onetrack') { 
            setRepeat('norepeat')
        }
    }

    return (
        <div className={styles.songBar}>
            <audio ref={audioElem} onTimeUpdate={onPlaying} src={'url' in currentSong ? currentSong.url : undefined} controls style={{display: 'none'}}> </audio>
            <div className={styles.left_side}>
                <div className={styles.img_cont}>
                    <img src={'image' in currentSong ? currentSong.image : undefined} className={styles.song_img}/>
                </div>
                <div className={styles.name_title_cont}>
                    <span className={styles.title}>{'title' in currentSong && currentSong.title}</span>
                    <span className={styles.name}>{'artists' in currentSong && currentSong.artists.map((name, index) => index + 1 === currentSong.artists.length ? name.name : name.name + ', ')}</span>
                </div>
            </div>
            <div className={styles.middle_side}>
                <div className={styles.btn_cont}>
                    <button className={styles.btn_random} onClick={() => randomClick()}>
                    <img className={styles.image_random} src={!randomOrder ? randomOff : randomOn} alt=''/>
                    </button>
                    <button onClick={() => nextprevious('previous')} className={styles.btn_back}>
                        <div className={styles.div_triangle}></div>
                        <div className={styles.div_square}></div>
                    </button>
                    <button onClick={PlayPause} className={styles.btn_play_pause}>
                        {play_or_pause()}
                    </button>
                    <button onClick={() => nextprevious('next')} className={styles.btn_forward}>
                        <div className={styles.div_triangle}></div>
                        <div className={styles.div_square}></div>
                    </button>
                    <button className={styles.btn_circle} onClick={setTypeOfRepeat}>
                        <img className={styles.image_repeat} src={repeat === 'norepeat' ? repeatListGrey : repeat === 'repeatlist' ?  repeatListGreen : repeatOne} alt=''/>
                    </button>
                </div>
                <div className={styles.timeBar} onClick={getTimeBar} ref={songBarRef}>
                    <div className={styles.listeningTime} style={{width: `${audioSettings.currenttime+'%'}`}}></div>
                </div>
            </div>
            <div className={styles.right_side}>
                <div className={styles.volume_bar} ref={volumeBarRef} onClick={getVolumeBar}>
                    <div className={styles.current_volume} style={{width: `${audioSettings.volume+'%'}`}}></div>
                </div>
            </div>
        </div>
    )
}

export default SongBar;