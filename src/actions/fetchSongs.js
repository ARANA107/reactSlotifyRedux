import {FETCH_SONGS,
        PLAY_SONG,
        LOG_IN_USER,
        SET_ALBUM,
        SET_CURRENT_SONGS,
        SET_CURRENT_SONG_OBJ} from './playerActions';

export const fetchSongs = () => dispatch =>{
    return dispatch({
        type: FETCH_SONGS,
    })
}


export const playSong = (songPath) => dispatch =>{
    console.log('play song called '+ songPath);
    return dispatch({
        type: PLAY_SONG,
        payload: songPath
    })
}

export const logInUser = () => dispatch=>{
console.log('user about to log in');
return dispatch({
        type: LOG_IN_USER
})
}

export const setCurrentAlbum = (album) => dispatch=>{
    console.log('setAlbumSongs called', album);
    return dispatch({
        type:SET_ALBUM,
        payload:album
    })
}

export const setCurrentSongs = (songs) => dispatch=>{
    console.log('SET_CURRENT_SONGS action called', songs);
    return dispatch({
        type: SET_CURRENT_SONGS,
        payload:songs
    })
}

export const setCurrentSongObj = (song) => dispatch=>{
    console.log('SET_CURRENT_SONG_OBJ action called', song);
    // let count = 0;
    // song.count = count;
    return dispatch({
        type: SET_CURRENT_SONG_OBJ,
        payload:song
    })
}