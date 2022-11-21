import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom';
import { AuthContext } from "../context/context";
import { privateRoutes, publicRoutes } from "../router/routes";
import Home from "../pages/Home";


const AppRouter = () => {
    const {token, setToken} = useContext(AuthContext)
    return (
        token
        ?
        <Routes>
            {privateRoutes.map(route => 
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />    
            )}
        <Route path='/*' element={<Home/>}/>
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route => 
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}    
                />    
            )}
            <Route path="/*" element={<Home/>}/>
        </Routes>
    )
}

export default AppRouter;