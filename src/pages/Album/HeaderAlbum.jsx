import React from "react";
import noimage from '../../media/noimage.png'
import { duration } from "../../hooks/duration";
import styles from '../../syles/Album.module.css'

const HeaderAlbum = (props) => {

    const {artist, durationAlbum, image, name, releasedate, totaltrack, type, typealbum} = props

    const ReleaseDate = () => {
        if(type === 'album')  return(
            <span className={styles.year_album}>
                {releasedate}
            </span>
        )
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_img_cont}>
                <img className={styles.header_img} 
                    src={image !== undefined ? image : noimage} 
                    alt=""
                />
            </div>
            <div className={styles.album_info}>
                <div className={styles.top_text}>
                    <span className={styles.album_type}>
                        {typealbum}
                    </span>
                </div>
                <div className={styles.diddle_text}>
                    <span className={styles.album_name}>
                        {name}
                    </span>
                </div>
                <div className={styles.bottom_text}>
                    <span className={styles.artist_name}>
                        {artist}
                    </span>
                    {ReleaseDate()}
                    <span className={styles.amount_tracks}>
                        {totaltrack}
                    </span>
                    <span className={styles.duration_album}>
                        {duration(durationAlbum)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeaderAlbum;