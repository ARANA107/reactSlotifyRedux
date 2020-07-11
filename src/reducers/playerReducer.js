import {PLAY_SONG} from '../actions/playerActions';
import {FETCH_SONGS} from '../actions/playerActions';
import {LOG_IN_USER} from '../actions/playerActions';

const initialState = {
  allSongs:[],
  currentSong:"./songs/bensound-summer.mp3",
  loggedIn: false
  };
  
  function playerReducer(state = initialState, action) {
    console.log('reducer called: '+ action.type + ' '+ action.payload)
    switch(action.type) {
      case FETCH_SONGS:
        return {
          ...state,
          allSongs:action.payload
        }
      case PLAY_SONG:
        console.log('playsong called')
        return {
          ...state,
          currentSong: action.payload,
        };
      case LOG_IN_USER:
        console.log('inside reducer')
        return {
          ...state,
          loggedIn:true
        }

      default:
        return state;
    }
  }

  export default playerReducer;