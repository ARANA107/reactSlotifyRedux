import {FETCH_SONGS, PLAY_SONG, LOG_IN_USER} from './playerActions';

export const fetchSongs = () => dispatch =>{
    return dispatch({
        type: FETCH_SONGS,
        payload: ["./songs/bensound-summer.mp3", "./songs/bensound-ukulele.mp3"]
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