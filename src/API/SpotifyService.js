import axios from "axios"


export default class SpotifyService {

    
    static async search(query, type, token) {
        const {data} = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: query,
                type: type,
                market: 'UA',
            }
        })
        if(type === 'track') return data.tracks
        if(type ==='album') return data.albums
        if(type === 'artist') return data.artists
        if(type === 'playlist') return data.playlists
    }

    static async getArtist(id, token) {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                market: 'UA',
            }
        })
        return data
    }

    static async getArtistTopTracks(id, token) {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, params: {
                market: 'UA',
            }
        })
        return data
    }

    static async getArtistAlbums(group, id, token) {
        const {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {
                    Authorization: `Bearer ${token}`,
            }, params: {
                market: 'UA',
                include_groups: group,
            }
        })
        return data
    }

    static async getAlbumOrPlaylist(type, id, token) {
        const {data} = await axios.get(`https://api.spotify.com/v1/${type}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                market: 'UA',
            }
        })
        return data
    }

    static async getMe(token) {
        const {data} = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }, 
        })
        return data
    }

    static async getUserPlaylist(me, token) {
        const {data} = await axios.get(`https://api.spotify.com/v1/users/${me}/playlists`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }, params: {
                limit: 50,
            }
        })
        return data 
    }

    static async postPlaylist(token, userid, playlistname, description, type) {
        await axios.post(`https://api.spotify.com/v1/users/${userid}/playlists`, {
            name: playlistname,
            description: description,
            public: type, 
          
        }, {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    static async addItemToPlaylist(idPlaylist, idTrack, token) {
        await axios.post(`https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`, {
            uris : [
                `spotify:track:${idTrack}`
            ], 
                position: 0
            
        }, {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        }) 
    }
  
}