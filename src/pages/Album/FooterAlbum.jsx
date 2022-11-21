import React from "react";

import styles from '../../syles/Album.module.css'

const FooterAlbum = (props) => {

    const renderRights = () => {
        return props.copyrights.map(right => 
            <div key={right.type} className={styles.CopyrightOwner}> 
                <span className={styles.CopyrightType}>
                    {right.type === 'C' ? '\u00A9 ' : '\u2117 '}
                </span> 
                <span className={styles.CopyrightText}>
                    {right.text}
                </span>    
            </div>
        )
    }

    return(
        <div className={styles.FooterCont}>

            <span className={styles.ReleaseDate}>{props.releasedate}</span>

            {renderRights()}

        </div>
    )
}

export default FooterAlbum;