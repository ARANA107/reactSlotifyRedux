import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchSongs} from './actions/fetchSongs';
import {playSong} from './actions/fetchSongs';

class Songs extends Component {
    state = {
        song:  require("./songs/bensound-summer.mp3")
    }
audio;

    componentWillMount(){
        this.props.fetchSongs();
        this.audio = new Audio();
}


    playSong=(event)=>{
        event.preventDefault();
        let pathName = event.currentTarget.textContent;
        this.props.playSong(pathName); 
        this.audio.src = require(""+this.props.currentSong);
        this.audio.load();
        this.audio.play();
    }


    render() {
    
        let songs = this.props.player
          .map((songPath, i) => {
            return (<li style={{ border: "1px solid #000000", width: "600px" }} key={i} data-id={i} onClick={this.playSong}>
              <span style={{ border: "1px solid #ff0000", width: "300px", margin: "20px" }}>{songPath}</span>
            </li>);
          });

        return (
            <div>
                <h1>this is songs component</h1>
                <div>{songs}</div>
                <div>{this.props.currentSong}</div>
            </div>
        )
    }
}

const mapStateToProps=state =>({
    player: state.player.allSongs,
    currentSong: state.player.currentSong
})

export default connect(mapStateToProps, {fetchSongs, playSong})(Songs)