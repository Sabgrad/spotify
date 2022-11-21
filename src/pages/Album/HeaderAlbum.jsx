import React from "react";
import noimage from '../../media/noimage.png'
import { duration } from "../../hooks/duration";
import styles from '../../syles/Album.module.css'

const HeaderAlbum = (props) => {

    const ReleaseDate = () => {
        if(props.type === 'album')  return(
            <span className={styles.YearAlbum}>
                {props.releasedate}
            </span>
        )
    }

    return (
        <div className={styles.header}>

            <div className={styles.HeaderImgCont}>
                <img className={styles.HeaderImg} 
                    src={props.image !== undefined ? props.image : noimage} 
                    alt=""
                />
            </div>

            <div className={styles.AlbumInfo}>

                <div className={styles.TopText}>
                    <span className={styles.AlbumType}>
                        {props.typealbum}
                    </span>
                </div>

                <div className={styles.MiddleText}>
                    <span className={styles.AlbumName}>
                        {props.name}
                    </span>
                </div>

                <div className={styles.BottomText}>
                    <span className={styles.ArtistName}>
                        {props.artist}
                    </span>
                    {ReleaseDate()}
                    <span className={styles.AmountTracks}>
                        {props.totaltrack}
                    </span>
                    <span className={styles.DurationAlbum}>
                        {duration(props.duration)}
                    </span>
                </div>

            </div>
            
        </div>
    )
}

export default HeaderAlbum;