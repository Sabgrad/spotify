import Search from "../pages/Search";
import UserLibrary from "../pages/UserLibrary";
import Home from "../pages/Home";
import Album from "../pages/Album/Album";
import Artist from "../pages/Artist";
import User from "../pages/User";

export const privateRoutes = [
    {path: '/search', element: <Search/>},
    {path: '/home', element: <Home/>},
    {path: '/library', element: <UserLibrary/>},
    {path: '/album/:id', element: <Album/>},
    {path: '/playlist/:id', element: <Album/>},
    {path: '/artist/:id', element: <Artist/>},
    {path: '/user/:id', element: <User/>},
    {path: '/collection', element: <Album/>}
]

export const publicRoutes = [
    // {path: '/login', element: <Authorization/>},
    {path: '/home', element: <Home/>},
]