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
            currentSong: "https://vast-coast-55318.herokuapp.com/songs/bensound-anewbeginning.mp3",
            remTime: 0.00,
            currTime:0.00,
            volSymbol: true,
            mouseDown: false,
            shuffleSong: false,
            vol: 1,
            play: false,
            repeat: false,
            allSongs: [],
            currentSongId: 1,
            dummyCounter: 0,
            currentSongObj: null,
            shuffledListId: [],
            prevVol:null
        }
    }

    componentDidMount() {
        this.audio = new Audio();
        this.props.onRef(this);
        this.setState({ allSongs: this.props.allSongs });
        this.audio.onloadedmetadata =()=> {
            this.setState({remTime:this.audio.duration})
            this.setState({currTime:this.audio.currentTime})
        
        };
         this.audio.addEventListener("canplay", ()=> {
            this.setState({remTime:this.audio.duration})
            });
            this.audio.addEventListener("timeupdate", ()=>{
              if(this.audio.duration) {
                this.setState({currTime: this.audio.currentTime})
              }
            });
        
            this.audio.addEventListener("ended", ()=>{
                this.nextSong();
            })
    }
    
    componentWillUnmount() {
        this.props.onRef(null)
    }

    shuffleSongs = () => {
        if (this.state.shuffleSong === true) {
            console.log('shuffle song false');
            this.setState({ shuffleSong: !this.state.shuffleSong });
        } else {
            this.setState({ shuffleSong: !this.state.shuffleSong });
            let idArray = this.props.allSongs.map(song => { return song.songId });
            let shuffledListId = [];
            shuffledListId = this.shuffleArray(idArray);
            this.setState({ shuffledListId });
            console.log('computation done', this.state.shuffledListId);
        }

    }

    shuffleArray(array) {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


    prevSong = () => {
        let prevSongId = null;
        let shuffledIds = null;

        if (this.state.repeat) {
            prevSongId = this.state.currentSongId;
        } else {
            prevSongId = this.state.currentSongId - 1;
        }



        if (this.state.shuffleSong) {
            shuffledIds = this.state.shuffledListId;

            // --------------------------------------------------------------

            if (this.state.count === 0) {
                let num = this.props.allSongs.length - 1;
                this.setState({ count: num });
            } else {
                this.setState({ count: this.state.count - 1 })
            }

            // --------------------------------------------------------------

            if (this.state.repeat) {
                prevSongId = this.state.currentSongId;
            } else {
                prevSongId = shuffledIds[this.state.count];
            }
            // -----------------------------------------------------------------

            if (prevSongId < 1) {
                prevSongId = shuffledIds[this.state.songList.length - 1];
                this.setState({ currentSongId: prevSongId })

            } else {
                this.setState({ currentSongId: prevSongId })
            }

            // --------------------------------------------------------------------

            this.props.allSongs.forEach(item => {
                if (item.songId === prevSongId) {
                    this.setState({ song: Domain +item.songPath });
                    this.audio.src = Domain + item.songPath;

                    this.audio.load();
                    if (this.state.play) {
                        this.playSong();
                    }

                }
            })
        } else {
            if (prevSongId < 1) {
                prevSongId = this.state.songList.length;
                this.setState({ currentSongId: prevSongId })

            } else {
                this.setState({ currentSongId: prevSongId })
            }
            //console.log("THIS IS prevSongId:---------"+prevSongId);
            this.props.allSongs.forEach(item => {
                if (item.songId === prevSongId) {
                    this.setState({ song: Domain+ item.songPath });
                    this.audio.src =Domain+ item.songPath;
                    this.audio.load();

                    if (this.state.play) {
                        this.playSong();

                    }

                }
            })
        }
    }

    playSongComponent = (song) => {
        console.log("playSongComponent called ----", song);
        this.setState({ currentSongObj: song, currentSongId: song.songId });
        this.audio.src = Domain + song.songPath;
        this.audio.load();
        this.playSong();
    }

    playSong = () => {
        let playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    console.log("audio played auto");
                    this.setState({ play: true })
                })
                .catch(error => {
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
        let shuffledIds = null;

        if (this.state.repeat) {
            nextSongId = this.state.currentSongId;
        } else {
            nextSongId = this.state.currentSongId + 1;
        }

        if (this.state.shuffleSong) {
            shuffledIds = this.state.shuffledListId;

            this.setState({ count: this.state.count + 1 })

            if (this.state.count > this.props.allSongs.length - 2) {
                this.setState({ count: 0 });
            }

            if (this.state.repeat) {
                nextSongId = this.state.currentSongId;
            } else {
                nextSongId = shuffledIds[this.state.count];

            }

            if (nextSongId > this.props.allSongs.length) {
                nextSongId = shuffledIds[0];
                this.setState({ currentSongId: nextSongId })

            } else {
                this.setState({ currentSongId: nextSongId })
            }

            this.props.allSongs.forEach(item => {
                if (item.songId === nextSongId) {
                    this.setState({ song: Domain+ item.songPath });
                    this.audio.src = Domain+ item.songPath;

                    this.audio.load();
                    if (this.state.play) {
                        this.playSong();
                    }

                }

            })
        }
        else {
        if (nextSongId > this.props.allSongs.length) {
            nextSongId = 1;
            this.setState({ currentSongId: nextSongId })

        } else {
            this.setState({ currentSongId: nextSongId })
        }

        this.props.allSongs.forEach(item => {
            if (item.songId === nextSongId) {
                this.setState({ song: item.songPath, currentSongObj: item, currentSongId: item.songId });
                this.audio.src = Domain + item.songPath;
                this.audio.load();
                if (this.state.play) {
                    this.playSong();
                }

            }
        })
        }
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
        this.setVol(perc);
        this.setState({ mouseDown: false, vol: perc });
    }

    onMouseMoveVol = (e) => {
        if (this.state.mouseDown) {
            let perc = e.nativeEvent.offsetX / this.myInputVol.current.offsetWidth;
            this.setState({ vol: perc });
            this.setVol(perc);
        }
    }

    mute = () => {

        if(this.state.volSymbol){
            this.setState({prevVol: this.state.vol})
            this.setState({vol:0, volSymbol:false})
        }else{
            this.setState({vol:this.state.prevVol, volSymbol:true})
        }
        this.setVol();
    }

    setVol=(vol)=>{
        if(vol){
          if(vol<0){
            vol=0
          }
          if(vol>1){
            vol=1
          }
          this.audio.onloadedmetadata= () => {
          };
          this.audio.volume = vol;
        }else{
          this.audio.muted = !this.audio.muted
        }
       
      }

    timeFromOffset(mouse, progressBar) {
        let percentage = mouse.nativeEvent.offsetX / progressBar * 100;
        let seconds = this.state.remTime * (percentage / 100);
        this.setTime(seconds);
    }

    preventDefault(e) {
        e.preventDefault();
    }

    repeatSong = () => {
        this.setState({ repeat: !this.state.repeat })
    }

    setTime=(time)=>{
        this.audio.onloadedmetadata= () => {
        };
        this.audio.currentTime=time;
        }

    render() {



        let remTime = this.state.remTime;
         let currTime = this.state.currTime;
         let progress = currTime / remTime * 100;
         let finalP = progress + '%';
         let finalVol = this.state.vol*100 + '%';


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
                            <button onClick={() => { this.nextSong() }} className="controlButton next" title="Next button">
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
                            <span className="progressTime current">{this.formatTime(currTime)}</span>

                            <div className="progressBar" ref={this.myInput} onMouseDown={ this.handleEvent } onMouseMove={this.onMouseMove} onMouseUp={this.handleEvent2} >
                                <div className="progressBarBg">
                                    <div style={{width : finalP}} className="progressLoc"></div>
                                </div>
                            </div>
                            <span className="progressTime remaining">{this.formatTime(remTime - currTime)}</span>

                        </div>
                    </div>
                </div>

                <div id="nowPlayingRight">
                    <div className="volumeBar">
                        <button onClick={this.mute} className="controlButton volume" title="Volume button" style={{ display: this.state.volSymbol ? '' : 'none' }}>
                            <img src={Domain + 'icons/volume.png'} alt="Volume" />
                        </button>
                        <button onClick={this.mute} className="controlButton volume" title="Volume button" style={{ display: this.state.volSymbol ? 'none' : '' }}>
                            <img src={Domain + 'icons/volume-mute.png'} alt="Volume" />
                        </button>
                        <div ref={this.myInputVol} onMouseDown={this.handlOnMouseDownVol} onMouseMove={this.onMouseMoveVol} onMouseUp={this.handleOnMouseUpVol}  className="progressBar">
                            <div className="progressBarBg">
                                <div style={{ width : finalVol }} className="songVolProgress"></div>
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
    allSongs: state.player.allSongs,
    currentSongObj: state.player.currentSongObj
})

export default connect(mapStateToProps)(PlayerComponent)