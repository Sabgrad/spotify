import axios from "axios";
import { Buffer } from "buffer";
import qs from 'qs';
import { 
    REQUEST_ENDPOINT, 
    MARKET,
    AUTH_ENDPOINT_TOKEN,
    BEARER,
} from "../common/common";

export default class SpotifyService {

    static async getTokenRequest (code, redirect_uri, id, secret) {
        const {data} = await axios.post(AUTH_ENDPOINT_TOKEN, 
        qs.stringify({code: code, redirect_uri: redirect_uri, grant_type: 'authorization_code'}), {
            headers: {
                Authorization: 'Basic ' + (Buffer.from(id + ':' + secret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        return data;
    }
    
    static async refreshToken(refreshtoken, id, secret) {
        const {data} = await axios.post(AUTH_ENDPOINT_TOKEN,  
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
                Authorization: BEARER + token,
            },
            params: {
                q: query,
                type: type,
                market: MARKET,
            }
        })
        if(type === 'track') return data.tracks;
        if(type ==='album') return data.albums;
        if(type === 'artist') return data.artists;
        if(type === 'playlist') return data.playlists;
    }

    static async getArtist(id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `artists/${id}`, {
            headers: {
                Authorization: BEARER + token,
            }, params: {
                market: MARKET,
            }
        })
        return data;
    }

    static async getArtistTopTracks(id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `artists/${id}/top-tracks`, {
            headers: {
                Authorization: BEARER + token,
            }, params: {
                market: MARKET,
            }
        })
        return data;
    }

    static async getArtistAlbums(group, id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `artists/${id}/albums`, {
            headers: {
                    Authorization: BEARER + token,
            }, params: {
                market: MARKET,
                include_groups: group,
            }
        })
        return data;
    }

    static async getAlbumOrPlaylist(type, id, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `${type}/${id}`, {
            headers: {
                Authorization: BEARER + token,
            }, params: {
                market: MARKET,
            }
        })
        return data;
    }

    static async getMe(token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `me`, {
            headers: {
                Authorization: BEARER + token,
            }, 
        })
        return data;
    }

    static async getUserPlaylist(me, token) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `users/${me}/playlists`, {
            headers: {
                Authorization: BEARER + token,
            }, params: {
                limit: 50,
            }
        })
        return data;
    }

    static async postPlaylist(token, userid, playlistname, description, type) {
        await axios.post(REQUEST_ENDPOINT + `users/${userid}/playlists`, {
            name: playlistname,
            description: description,
            public: type, 
          
        }, {
            headers : {
                Authorization: BEARER + token,
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
                Authorization: BEARER + token,
            }
        }) 
    }

    static async getFollowContentUser(queryType, token, limit) {
        const {data} = await axios.get(REQUEST_ENDPOINT + `me/${queryType}` , {
            headers: {
                Authorization: BEARER + token,
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