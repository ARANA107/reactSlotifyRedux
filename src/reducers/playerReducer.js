import {FETCH_SONGS,LOG_IN_USER,PLAY_SONG, SET_ALBUM, SET_CURRENT_SONGS, SET_CURRENT_SONG_OBJ} from '../actions/playerActions';
import {AlbumsList} from '../shared/AlbumsList';

const initialState = {
  allSongs:[],
  currentSong:null,
  loggedIn: false,
  albumsList: [],
  currentAlbum:{},
  songsSelected: false,
  currentSongObj:{}
  };
  
  function playerReducer(state = initialState, action) {
    console.log('reducer called: '+ action.type)
    switch(action.type) {
      case FETCH_SONGS:
        console.log('fetch case called', typeof(AlbumsList));
        return {
          ...state,
          albumsList:AlbumsList
        }
      case PLAY_SONG:
        console.log('playsong called'+action.payload)
        return {
          ...state,
          currentSong: action.payload,
        };
      case SET_ALBUM:
        console.log('inside set_slbum_song reducer');
        return {
          ...state,
          currentAlbum: action.payload
        }
      case LOG_IN_USER:
        console.log('inside reducer')
        return {
          ...state,
          loggedIn:true
        }
        case SET_CURRENT_SONGS:
        console.log('inside reducer SET_CURRENT_SONGS')
        return {
          ...state,
          allSongs:action.payload
        }
        case SET_CURRENT_SONG_OBJ:
          console.log('inside reducer SET_CURRENT_SONG_OBJ')
          return {
            ...state,
            ...{currentSongObj:action.payload}
          }

      default:
        return state;
    }
  }

  export default playerReducer;