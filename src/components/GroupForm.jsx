import React from "react";
import styles from '../syles/GroupForm.module.css';
import FacialForm from "./FacialForm";

const GroupForm = ({children, artistAlbum, artistSingle}) => {

    const renderFacialForm = () => {
        if(artistAlbum) return artistAlbum.items?.map((album) => 
            <FacialForm 
            key={album.id}
            images={album.images[0]?.url}
            toptext={album.name}
            bottomtext={album.release_date}
            id={album.id}
            type={'album'}
            />
        )
        if(artistSingle) return artistSingle.items?.map(single =>
            <FacialForm 
            key={single.id}
            images={single.images[0]?.url}
            toptext={single.name}
            bottomtext={single.release_date}
            id={single.id}
            type={'album'}
            />
        )
    }

    return (
        <div className={styles.group_form}>
            <div className={styles.group_top_text}>
                <span className={styles.group_name}>{children}</span>
                <button className={styles.open_all}>Open All</button>
            </div>
            <div className={styles.cont_for_ff}>
                {renderFacialForm()}
            </div>
        </div>
    )
}

export default GroupForm;