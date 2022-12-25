import React from "react";

import styles from '../../syles/Album.module.css'

const FooterAlbum = (props) => {

    const renderRights = () => {
        return props.copyrights.map(right => 
            <div key={right.type} className={styles.copyright_owner}> 
                <span className={styles.copyright_type}>
                    {right.type === 'C' ? '\u00A9 ' : '\u2117 '}
                </span> 
                <span className={styles.copyright_text}>
                    {right.text}
                </span>    
            </div>
        )
    }

    return(
        <div className={styles.footer_cont}>
            <span className={styles.release_date}>{props.releasedate}</span>
            {renderRights()}
        </div>
    )
}

export default FooterAlbum;