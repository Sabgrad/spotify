// import React, { useEffect, useContext }from "react";
// import { AuthContext } from "../context/context";

// const Authorization = () => {

//     const CLIENT_ID = 'cf49f3a269024b098857bec97df68d7f'
//     const REDIRECT_URI = 'http://localhost:3000'
//     const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
//     const RESPONSE_TYPE = 'token'

//     // const [token, setToken] = useState('')
//     const {token, setToken} = useContext(AuthContext);

//     useEffect(() => {
//         const hash = window.location.hash
//         let token = window.localStorage.getItem('token');

//         if(!token && hash) {
//             token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
            
//             window.localStorage.setItem('token', token)
//         }

//         setToken(token)

//     }, [])
    

//     return (
//         <div>
//             <h1>Spotify React</h1>
//             {!token ?
//                 <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
//                     Login To spotify
//                 </a>
//             :   
//                 <button>
//                     Logout
//                 </button> 
//             }
//         </div>
//     )
// }

// export default Authorization;