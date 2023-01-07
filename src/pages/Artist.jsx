import React, { useContext, useEffect, useState } from "react";
import styles from '../syles/Artist.module.css';
import ProfileForm from "../components/ProfileForm";
import { AuthContext, DataWithAudio } from "../context/context";
import { useParams } from "react-router-dom";
import SpotifyService from "../API/SpotifyService";



const Artist = () => {

    let url = window.location.href

    const {token} = useContext(AuthContext)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const params = useParams()

    const [artist, setArtist] = useState([])

    const [artistTopTrack, setArtistTopTrack] = useState([])

    const [artistAlbum, setArtistAlbum] = useState([])

    const [artistSingle, setArtistSingle] = useState([])


    const fetchArtist = async () => {
        const data = await SpotifyService.getArtist(params.id, token);
        setArtist(data)
    }

    const fetchArtistTopTrack = async () => {
        const data = await SpotifyService.getArtistTopTracks(params.id, token);
        setArtistTopTrack(data)
    }

    const fetchArtistAlbums = async (group) => {
        const data = await SpotifyService.getArtistAlbums(group, params.id, token)
        if(group === 'album') {
            setArtistAlbum(data)
        } else {
            setArtistSingle(data)
        }
    }

    useEffect(() => {
        if(url.includes('artist') === true) {
            fetchArtist();
            fetchArtistTopTrack();
            fetchArtistAlbums('album');
            fetchArtistAlbums('single');
        }
        // eslint-disable-next-line
    }, [params.id])

    useEffect(() => {
            setDataAudio([])
            artistTopTrack.tracks?.map(song =>
                setDataAudio((current) => 
                    [...current, song.preview_url]
                )
            )
    }, [artistTopTrack])

    return (
        <div className={styles.ProfileContainer}>
            <ProfileForm artistSingle={artistSingle} toptracks={artistTopTrack} artist={artist} artistAlbum={artistAlbum}/>
        </div>
    )
}

export default Artist;