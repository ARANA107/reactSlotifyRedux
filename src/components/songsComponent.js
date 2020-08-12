import React, { Component } from 'react'
import { connect } from "react-redux";
import { playSong, setCurrentAlbum, setCurrentSongObj } from '../actions/fetchSongs';
import '../css/songs.css';
import {Domain} from '../domainName';

class songsComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            albumName: "some album",
            albumPhoto: "http://localhost:3000/images/clearday.jpg",
            albumSinger: "Rey",
            songList: [],
            count:0
        }
        
    }

    setCurrentSongPath = (path) => {
        this.props.playSong(path);
    }
    
    componentDidMount () {
      }

      imageClick(item){
        console.log('play this some ',item);
          //this.props.playSong(item.songPath);
          this.props.setCurrentSongObj(item);
          this.props.playsong(item);
      }


    render(){
  
       
        return(
            <div>        
                <div className="row ml-5 albumPane">
                    <div className="albumImage">
                        <img  src={Domain + this.props.album.albumPhoto} alt=""></img>
                    </div>
                    <div className="albumDetails">
                        <div className="row"><h3 className="text-white">{this.props.album.albumName}</h3></div>
                        <div className="row" className="text-white">{this.props.album.albumSinger}</div>
                        <div className="row" className="text-white">Songs: {this.props.songs.length}</div>
                    </div>
                </div>

                <div className="tracklistContainer">
                    <ul className="tracklist">
                        {this.props.songs.map((item,id)=>{
                            return(
                                <li key={id} className='tracklistRow'>
                                    <div className='trackCount'>
                                        <img onClick={() => this.imageClick(item)} className='play' alt="something" src={Domain + 'icons/play-white.png'}/>
                                        <span className='trackNumber'>{item.songId}</span>
                                    </div>


                                    <div className='trackInfo'>
                                        <span className='trackName'>{item.songName}</span>
                                        <span className='artistName'>{item.albumSinger}</span>
                                    </div>

                                    <div className='trackOptions'>
                                        <img className='play' alt="something" src={Domain + 'icons/more.png' }/>
                                    </div>

                                    <div className='trackDuration'>
                                        <span className='duration'>{item.songDuration}</span>
                                    </div>

                                </li>)
                        })}  
                    </ul>
                </div>
   

                {this.props.albumInfo}
            
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        // playSong: (songPath) => dispatch(playSong(songPath)),
        setCurrentSongObj: (song) => dispatch(setCurrentSongObj(song))
    }
}


const mapStateToProps = state => ({
    player: state.player.allSongs,
    currentSong: state.player.currentSong,
    albumsList: state.player.albumsList,
    album: state.player.currentAlbum,
    songs: state.player.allSongs
})
export default connect(mapStateToProps, mapDispatchToProps)(songsComponent)