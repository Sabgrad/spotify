import React, { useContext, useEffect, useState, useMemo} from "react";
import { AuthContext, DataWithAudio } from "../context/context";
import styles from '../syles/Search.module.css';
import MyButton from "../components/UI/MyButton/MyButton";
import FacialForm from "../components/FacialForm";
import SongForm from "../components/SongForm";
import SpotifyService from "../API/SpotifyService";

const Search = () => {

    const stylePressBtn = {
        background: 'white', 
        color: 'black'
    }

    const {token} = useContext(AuthContext)

    const {dataAudio, setDataAudio} = useContext(DataWithAudio)

    const [objectSpotify, setObjectSpotify] = useState([])

    const [searchQuery, setSearchQuery] = useState('')
    const [typeQuery, setTypeQuery] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
    }
    
    const fetchSearch = async () => {
        const data = await SpotifyService.search(searchQuery, typeQuery, token);
        setObjectSpotify(data.items)
    }

    useEffect(() => {
        if(typeQuery === 'track') {
            setDataAudio([])
            objectSpotify.map(song =>
                setDataAudio((current) => 
                    [...current, song.preview_url]
                )
            )
        }
    }, [objectSpotify])

    useEffect(() => {
        if(typeQuery !== '' && searchQuery !== '') {
            fetchSearch();
        }
        //eslint-disable-next-line
    }, [searchQuery, typeQuery])

    const renderSongs = () => {
        return objectSpotify.map((track, index) =>
            <SongForm 
                index={index}
                key={track.id}
                image={track.album.images[0]?.url}
                name={track.name}
                artist={track.artists.map((artists) => artists.name + ' ')}
                album={track.album.name}
                songduration={track.duration_ms}
                audio={track.preview_url}
            />
        )
    }

    const renderForm = () => {
        return objectSpotify.map(obj => 
            <FacialForm 
            key={obj.id}
            toptext={obj.name}
            bottomtext={
            typeQuery === 'album' ?
            obj.release_date?.substring(0,4) + ' - ' + obj.artists.map((artist) =>' ' + artist.name) 
            :
            typeQuery === 'artist' ?
            obj.type
            :
            obj.owner.display_name
            }
            images={obj.images[0]?.url}
            id={obj.id}
            type={typeQuery}
            request={obj.href}
            />  
        )
    }

    const searchRender = useMemo(() => {
        if(typeQuery === 'track') return renderSongs()
        if(typeQuery !== 'track') return renderForm()
    }, [objectSpotify])

    return (
        <div className={styles.searchCSSModule}>
            <form>
                <input style={{color: 'black'}} type='text' value={searchQuery} onChange={handleChange}  placeholder='Search...'/>
            </form >
            <div className={styles.searchCategory}> 
                <MyButton style={typeQuery === 'track' ? stylePressBtn : null} onClick={() => setTypeQuery('track')}>Songs</MyButton>
                <MyButton style={typeQuery === 'album' ? stylePressBtn : null} onClick={() => setTypeQuery('album')}>Albums</MyButton>
                <MyButton style={typeQuery === 'artist' ? stylePressBtn : null} onClick={() => setTypeQuery('artist')}>Artists</MyButton>
                <MyButton style={typeQuery === 'playlist' ? stylePressBtn : null} onClick={() => setTypeQuery('playlist')}>Playlists</MyButton>
            </div>
            <div className={styles.containerForRender}>
                {searchRender}
            </div>
        </div>
    )
}

export default Search;