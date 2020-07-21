import React, { Component } from 'react'
import { connect } from "react-redux";
import { Domain } from '../domainName';

import '../css/Player.css';

class PlayerComponent extends Component {
    constructor(props) {
        super(props);

        this.myInput = React.createRef();
        this.myInputVol = React.createRef();
        this.myInputPlayBar = React.createRef();

        this.state = {
            count: 0,
            currentSong: "http://localhost:3000/songs/bensound-anewbeginning.mp3",
            remTime: 0,
            muteVol: false,
            mouseDown: false,
            shuffleSong: false,
            vol: 1,
            play: false,
            repeat: false,
            allSongs: [],
            currentSongId:1,
            dummyCounter:0
        }
    }

    componentDidMount() {
        this.audio = new Audio();
        this.setState({ allSongs: this.props.allSongs });
    }

    // componentWillReceiveProps({currentSong, allSongs }) {
    //     console.log(allSongs);
    //         console.log('componentwillreceiveprops if called')
    //         this.setState({ allSongs, currentSong })
    //         this.audio.src = "http://localhost:3000/" + currentSong;
    //         this.audio.load();
    //         this.playSong();
      
    // }
    static getDerivedStateFromProps(nextProps, prevState){
        return {currentSong: nextProps.currentSong}
    }
    
    playSong = () => {
        let playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                    console.log("audio played auto");
                    this.setState({ play: true })
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI
                    console.log("playback prevented");
                });
        }
    }

    pauseSong = () => {
        this.audio.pause();
        this.setState({ play: false })
    }
    nextSong = () => {
        let nextSongId = null;
        //let shuffledIds = null;

        // if (this.state.repeat) {
        //     nextSongId = this.state.currentSongId;
        // }

        // if (this.state.shuffleSong) {
        //     shuffledIds = this.state.shuffleSongList.map((obj) => {
        //         return obj.songId
        //     })

        //     //console.log("these are the IDS---------"+shuffledIds);

        //     this.setState({ count: this.state.count + 1 })

        //     if (this.state.count > this.state.songList.length - 2) {
        //         this.setState({ count: 0 });
        //     }

        //     if (this.state.repeat) {
        //         nextSongId = this.state.currentSongId;
        //     } else {
        //         nextSongId = shuffledIds[this.state.count];

        //     }
        //     //console.log("THIS IS nextSongId line 141: "+nextSongId+" and count is: "+this.state.count);


        //     if (nextSongId > this.state.songList.length) {
        //         nextSongId = shuffledIds[0];
        //         this.setState({ currentSongId: nextSongId })

        //     } else {
        //         this.setState({ currentSongId: nextSongId })
        //     }

        //     //console.log("THIS IS nextSongId:---------"+nextSongId);
        //     this.state.songList.forEach(item => {
        //         if (item.songId === nextSongId) {
        //             this.setState({ song: require("" + item.songPath) });
        //             this.audio.src = require("" + item.songPath);

        //             this.audio.load();
        //             if (this.state.play) {
        //                 this.playSong('next');
        //             }

        //         }

        //     })
        // }
        // else {
            // if (this.state.repeat) {
            //     nextSongId = this.state.currentSongId
            // } else {
            //     nextSongId = this.state.currentSongId + 1;

            // }

            if (nextSongId > this.state.songList.length) {
                nextSongId = 1;
                this.setState({ currentSongId: nextSongId })

            } else {
                this.setState({ currentSongId: nextSongId })
            }

            //console.log("THIS IS nextSongId:---------"+nextSongId);
            this.state.songList.forEach(item => {
                if (item.songId === nextSongId) {
                    this.setState({ song: require("" + item.songPath) });
                    this.audio.src = require("" + item.songPath);
                    this.audio.load();
                    if (this.state.play) {
                        this.playSong('next');
                    }

                }
            })
        // }
    }

    formatTime = (time) => {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    };

    handleEvent = (event) => {
        if (event.type === "mousedown") {
            this.setState({ mouseDown: true });
        }
    }
    handleEvent2 = (event) => {
        this.timeFromOffset(event, this.myInput.current.offsetWidth);
        this.setState({ mouseDown: false });
    }

    onMouseMove = (e) => {
        if (this.state.mouseDown) {
            this.timeFromOffset(e, this.myInput.current.offsetWidth);
        }
    }
    // ----------------------------------------------------------------------------------------------
    handlOnMouseDownVol = (event) => {
        if (event.type === "mousedown") {
            this.setState({ mouseDown: true });
        }
    }
    handleOnMouseUpVol = (event) => {
        let perc = event.nativeEvent.offsetX / this.myInputVol.current.offsetWidth;
        this.props.setVol(perc);
        this.setState({ mouseDown: false, vol: perc });
    }

    onMouseMoveVol = (e) => {
        if (this.state.mouseDown) {
            let perc = e.nativeEvent.offsetX / this.myInputVol.current.offsetWidth;
            this.setState({ vol: perc });
            this.props.setVol(perc);
        }
    }

    muteVol = () => {
        this.setState({ muteVol: !this.state.muteVol })
        this.props.setVol();
    }

    shuffleSongs = () => {
        this.setState({ shuffleSong: !this.state.shuffleSong });
        this.props.shuffleSong();
    }

    timeFromOffset(mouse, progressBar) {
        let percentage = mouse.nativeEvent.offsetX / progressBar * 100;
        let seconds = this.props.songInfo.remTime * (percentage / 100);
        this.props.setTime(seconds);
    }

    preventDefault(e) {
        e.preventDefault();
    }
    prevSong = () => {
        console.log('prev song called')
    }


  


    repeatSong = () => {
        console.log('repeat song called');
    }
    render() {



        //let remTime = this.props.songInfo.remTime;
        // let currTime = this.props.songInfo.currTime;
        // let progress = this.props.songInfo.currTime / this.props.songInfo.remTime * 100;
        // let finalP = progress + '%';
        // let finalVol = this.state.vol*100 + '%';
        let allSongs = this.props.allSongs;


        return (
            <div onMouseDown={this.preventDefault.bind(this)} onDragStart={this.preventDefault.bind(this)} onMouseMove={this.preventDefault.bind(this)} onDrag={this.preventDefault.bind(this)} ref={this.myInputPlayBar} className="player">
                <div id="nowPlayingLeft">
                    <div className="content">
                        <span className="albumLink">
                            <img src={Domain + this.props.album.albumPhoto} className="albumArtwork" alt="" />
                        </span>
                        <div className="trackInfo">
                            <span className="trackName">
                                <span>{this.props.album.albumName}</span>
                            </span>
                            <span className="artistName">
                                <span>{this.props.album.albumSinger}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div id="nowPlayingCenter">
                    <div className="content playerControls">
                        <div className="buttons">
                            <button onClick={this.shuffleSongs} className="controlButton shuffle" title="Shuffle button" style={{ display: this.state.shuffleSong ? 'none' : '' }}>
                                <img src={Domain + "icons/shuffle.png"} alt="Shuffle" />
                            </button>

                            <button onClick={this.shuffleSongs} className="controlButton shuffle" title="Shuffle button" style={{ display: this.state.shuffleSong ? '' : 'none' }}>
                                <img src={Domain + 'icons/shuffle-active.png'} alt="Shuffle" />
                            </button>

                            <button onClick={() => { this.prevSong() }} className="controlButton previous" title="Previous button">
                                <img src={Domain + 'icons/previous.png'} alt="Previous" />
                            </button>

                            <button onClick={() => { this.playSong() }} className="controlButton play" title="Play button" style={{ display: this.state.play ? 'none' : '' }}>
                                <img src={Domain + 'icons/play.png'} alt="Play" />
                            </button>

                            <button onClick={() => { this.pauseSong() }} className="controlButton pause" title="Pause button" style={{ display: this.state.play ? '' : 'none' }}>
                                <img src={Domain + 'icons/pause.png'} alt="Pause" />
                            </button>
                            <button onClick={() => { console.log(allSongs) }} className="controlButton next" title="Next button">
                                <img src={Domain + 'icons/next.png'} alt="Next" />
                            </button>

                            <button onClick={() => { this.repeatSong() }} className="controlButton repeat" title="Repeat button" style={{ display: this.state.repeat ? 'none' : '' }}>
                                <img src={Domain + 'icons/repeat.png'} alt="Repeat" />
                            </button>
                            <button onClick={() => { this.repeatSong() }} className="controlButton repeat" title="Repeat button" style={{ display: this.state.repeat ? '' : 'none' }}>
                                <img src={Domain + 'icons/repeat-active.png'} alt="Repeat" />
                            </button>
                        </div>

                        <div className="playbackBar">
                            {/* <span className="progressTime current">{this.formatTime(currTime)}</span> */}
                            <span className="progressTime current">{39}</span>

                            <div onMouseUp={this.handleEvent2} onMouseDown={this.handleEvent} onMouseMove={this.onMouseMove} ref={this.myInput} className="progressBar">
                                <div className="progressBarBg">
                                    {/* <div style={{width : finalP}} className="progress"></div> */}
                                    <div style={{ width: "90%" }} className="songVolProgress"></div>

                                </div>
                            </div>
                            {/* <span className="progressTime remaining">{this.formatTime(this.props.songInfo.remTime - this.props.songInfo.currTime)}</span> */}
                            <span className="progressTime remaining">{0.00}</span>

                        </div>
                    </div>
                </div>

                <div id="nowPlayingRight">
                    <div className="volumeBar">
                        <button onClick={this.muteVol} className="controlButton volume" title="Volume button" style={{ display: this.state.muteVol ? 'none' : '' }}>
                            <img src={Domain + 'icons/volume.png'} alt="Volume" />
                        </button>
                        <button onClick={this.muteVol} className="controlButton volume" title="Volume button" style={{ display: this.state.muteVol ? '' : 'none' }}>
                            <img src={Domain + 'icons/volume-mute.png'} alt="Volume" />
                        </button>
                        <div onMouseDown={this.handlOnMouseDownVol} onMouseUp={this.handleOnMouseUpVol} onMouseMove={this.onMouseMoveVol} ref={this.myInputVol} className="progressBar">
                            <div className="progressBarBg">
                                <div style={{ width: "40px" }} className="songVolProgress"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




const mapStateToProps = state => ({
    player: state.player.allSongs,
    currentSong: state.player.currentSong,
    album: state.player.currentAlbum,
    allSongs: state.player.allSongs
})

export default connect(mapStateToProps)(PlayerComponent)