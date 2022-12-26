import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../syles/FacialForm.module.css';
import noimage from '../media/noimage.png';

const FacialForm = (props) => {

    const {id, images, toptext, bottomtext, type} = props;

    const router = useNavigate()

    const handleClick = (id) => {
        if(type === 'album') { router(`/album/${id}`); }
        if(type === 'playlist') { router(`/playlist/${id}`); }
        if(type === 'artist') { router(`/artist/${id}`)}
    }

    return(
        <div className={styles.facial_form} onClick={() => handleClick(id)}>
            <div className={styles.cont_facial_image}>
            <img className={styles.facila_image} 
                src={images !== undefined ? images : noimage}
                alt=''
            /> 
            </div>
            <span className={styles.top_text}>
                {toptext}
            </span>
            <span className={styles.bottom_text}>
                {bottomtext}
            </span>
        </div>
    )
}

export default FacialForm;