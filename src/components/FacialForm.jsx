import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../syles/FacialForm.module.css';
import noimage from '../media/noimage.png';



const FacialForm = (props) => {
    
    const router = useNavigate()

    const handleClick = () => {
        if(props.type === 'album') { router(`/album/${props.id}`); }
        if(props.type === 'playlist') { router(`/playlist/${props.id}`); }
        if(props.type === 'artist') { router(`/artist/${props.id}`)}
    }

    return(
        <div className={styles.FacialForm} onClick={handleClick}>
            <div className={styles.ContainerFacialImage}>
            <img className={styles.AlbumImage} 
                src={props.images !== undefined ? props.images : noimage}
                alt=''
            /> 
            </div>
            <span className={styles.TopText}>
                    {props.toptext}
            </span>
            <span className={styles.BottomText}>
                {props.bottomtext}
            </span>
        </div>
    )
}

export default FacialForm;