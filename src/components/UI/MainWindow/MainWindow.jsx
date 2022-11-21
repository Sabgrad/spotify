import React from "react";
import styles from './MainWindow.module.css';
import AppRouter from "../../AppRouter";

const MainWindow = () => {
    
    return (
        <div className={styles.mainWindow}>
            {/* <TopMenu/> */}
            <AppRouter/>
        </div>
    )
}

export default MainWindow;