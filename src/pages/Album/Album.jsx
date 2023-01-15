import React, { useEffect, useContext, useState} from "react";
import { useParams } from "react-router-dom";
import SpotifyService from "../../API/SpotifyService";
import { AuthContext, DataWithAudio, LinkOnAudio } from "../../context/context";
import styles from '../../syles/Album.module.css';
import SongForm from "../../components/SongForm";
import HeaderAlbum from "./HeaderAlbum";
import FooterAlbum from "./FooterAlbum";


const Album = () => {

    const params = useParams()

    const {token, setToken} = useContext(AuthContext)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const [type, setType] = useState('')

    const [dataSpotify, setDataSpotify] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [albumDuration, setAlbumDuration] = useState(0)

    const fetchAlbumOrPlayist = async (type) => {
        const data = await SpotifyService.getAlbumOrPlaylist(type, params.id, token);
        setDataSpotify(data)
        setIsLoading(true)
    }

    useEffect(() => {
        let url = window.location.href
        if(url.includes('album') === true) {
            fetchAlbumOrPlayist('albums');
            setType('album')
        } 
        if(url.includes('playlist') === true) {
            fetchAlbumOrPlayist('playlists');
            setType('playlist')
        }

    }, [params.id])

    useEffect(() => {
        getListSongDuration();
        setDataAudio([])
        dataSpotify.tracks?.items.map((song, index) =>
            setDataAudio((current) => 
                [...current, {url: song.track ? song.track.preview_url : song.preview_url, title: song.track ? song.track.name : song.name}]
            )
        )
    }, [dataSpotify])

    const getListSongDuration = () => {
        let albumduration_ms = 0;
        dataSpotify.tracks?.items.forEach(song => song.track ? albumduration_ms += song.track.duration_ms : albumduration_ms += song.duration_ms)
        setAlbumDuration(albumduration_ms)
    }

    const renderSong = () => {
        return dataSpotify.tracks?.items.map((song, index) =>
            <SongForm 
                index={index}
                key={song.track ? song.track.id + index : song.id + index}
                trackid={song.track ? song.track.id : song.id}
                image={song.track  ? song.track.album.images[0]?.url : dataSpotify.images[0]?.url}
                name={song.track ? song.track.name : song.name}
                artist={song.track ? song.track?.artists.map(artist => artist.name) : song.artists?.map(artist => artist.name)}
                artistid={song.track ? song.track.artists.map(artistid => artistid.id) : song.artists.map(artistid => artistid.id)}
                album={song.track ? song.track.album.name : dataSpotify.name}
                dateadd={song.track && song.added_at}
                songduration={song.track ? song.track.duration_ms : song.duration_ms}
                audio={song.track ? song.track.preview_url : song.preview_url}
            />
        )
    }

    if(!isLoading) {
       return  <div></div>
    } else {
        return (
            <div className={styles.album_cont}>
                <div className={styles.cont_for_header}>
                    <HeaderAlbum
                        image={dataSpotify.images[0]?.url}
                        typealbum={type === 'album'
                        ? dataSpotify.album_type.toUpperCase()
                        : dataSpotify.public === true ? 'PUBLIC' : 'PRIVATE'}
                        name={dataSpotify.name}
                        artist={type === 'album' 
                        ? dataSpotify.artists.map(artist => artist.name + '') 
                        : dataSpotify.owner.display_name}
                        totaltrack={(dataSpotify.total_tracks ?  dataSpotify.total_tracks : dataSpotify.tracks.total) + ' song'}
                        durationAlbum={albumDuration}
                        type={type}
                        releasedate={dataSpotify.release_date?.substring(0,4)}
                    />
                </div>
                <div className={styles.cont_for_render_songs}>
                    {renderSong()}
                </div>
                {type === 'album' && 
                <FooterAlbum
                    releasedate={dataSpotify.release_date}
                    copyrights={dataSpotify.copyrights}
                />
                }
            </div>
        )
    }
}

export default Album;