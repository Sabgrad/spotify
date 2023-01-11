import axios from "axios";
import { Buffer } from "buffer";
import qs from 'qs';
import { REQUEST_ENDPOINT, MARKET } from "../common/common";

export default class SpotifyService {

    static async getTokenRequest (code, redirect_uri, id, secret) {
        const {data} = await axios.post('https://accounts.spotify.com/api/token', 
        qs.stringify({code: code, redirect_uri: redirect_uri, grant_type: 'authorization_code'}), {
            headers: {
                Authorization: 'Basic ' + (Buffer.from(id + ':' + secret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        return data;
    }
    
    static async refreshToken(refreshtoken, id, secret) {
        const {data} = await axios.post('https://accounts.spotify.com/api/token',  
        qs.stringify({grant_type: 'refresh_token', refresh_token: refreshtoken}), {
            headers: {
                Authorization: 'Basic ' + (Buffer.from(id + ':' + secret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        return data;
    }

    static async search(query, type, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + 'search', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: query,
                type: type,
                market: MARKET,
            }
        })
        if(type === 'track') return data.tracks
        if(type ==='album') return data.albums
        if(type === 'artist') return data.artists
        if(type === 'playlist') return data.playlists
    }

    static async getArtist(id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `artists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                market: MARKET,
            }
        })
        return data
    }

    static async getArtistTopTracks(id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, params: {
                market: MARKET,
            }
        })
        return data
    }

    static async getArtistAlbums(group, id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `artists/${id}/albums`, {
            headers: {
                    Authorization: `Bearer ${token}`,
            }, params: {
                market: MARKET,
                include_groups: group,
            }
        })
        return data
    }

    static async getAlbumOrPlaylist(type, id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `${type}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, params: {
                market: MARKET,
            }
        })
        return data
    }

    static async getMe(token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `me`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }, 
        })
        return data
    }

    static async getUserPlaylist(me, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `users/${me}/playlists`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }, params: {
                limit: 50,
            }
        })
        return data 
    }

    static async postPlaylist(token, userid, playlistname, description, type) {
        await axios.post(REQUEST_ENDPOINT + `users/${userid}/playlists`, {
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
        await axios.post(REQUEST_ENDPOINT + `playlists/${idPlaylist}/tracks`, {
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

    static async getFollowContentUser(queryType, token, limit) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `me/${queryType}` , {
            headers: {
                Authorization: `Bearer ${token}`,
            }, params: queryType === 'following' ? {
                type: 'artist',
                limit: limit,
            } : {
                limit: limit,
            }
        })
        return data;
    }
}