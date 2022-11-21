import React, { useEffect, useState } from "react";
import styles from '../syles/ProfileForm.module.css';
import noimage from '../media/noimage.png';
import SongForm from '../components/SongForm';
import GroupForm from "./GroupForm";

const ProfileForm = ({artist, toptracks, artistAlbum, artistSingle}) => {

    const renderTopTracks = () => {
        return toptracks.tracks?.map((toptracks, index) => 
            <SongForm
                key={toptracks.id} 
                index={index}
                image={toptracks.album.images[0]?.url}
                name={toptracks.name}
                artist={toptracks.artists.map((artists) => artists.name + ' ')}
                album={toptracks.album.name}
                songduration={toptracks.duration_ms}
                audio={toptracks.preview_url}
            />
        )
    }

    return (
        <div className={styles.Container}>

            <div className={styles.Header}>
                <div className={styles.HeaderImgCont}>
                    <img
                    className={styles.HeaderImg}
                    src={artist.images?.length ? artist.images[0].url : noimage}
                    alt=''
                    />
                </div>
                <div className={styles.HeaderInfo}>
                    <span className={styles.Type}>{artist.type?.toUpperCase()}</span>
                    <span className={styles.Name}>{artist.name}</span>
                    <span className={styles.Followers}>{artist.followers?.total} followers</span>
                </div>
            </div>
            
            <div className={styles.Main}>
                    {renderTopTracks()}
                    <GroupForm artistAlbum={artistAlbum}>{artist.name} Albums</GroupForm>
                    <GroupForm artistSingle={artistSingle}>{artist.name} Singles</GroupForm>  
            </div>

            <div className={styles.Footer}>
                footer
            </div>
            
        </div>
    )
}

export default ProfileForm;