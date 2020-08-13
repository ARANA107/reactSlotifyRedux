import React, { Component } from 'react'
import { fetchSongs, setCurrentAlbum, setCurrentSongs } from '../actions/fetchSongs';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class AlbumsComponent extends Component {

    constructor(props) {
        super(props);
    }

    setSongs = (album) => {
        console.log(album);
        this.props.setCurrentAlbum(album);
        this.props.setCurrentSongs(album.songs)
        this.props.history.push('/maincomponent/songs');

    }

    render() {

        const style = {
            cursor: "pointer"
        }
        const imageWidth={
            width:"200px",
            minWidth:"50px"
        }
        const thumbnail={
            cursor:"pointer",
            margin: "20px",
            minWidth: "20px",
            maxWidth: "180px"
        }
        const domain = "https://vast-coast-55318.herokuapp.com/";

        const albums = this.props.albumsArray.map(album => {
            return (
                <div key={album.id}>
                    <div style={style} style={thumbnail} onClick={() => this.setSongs(album)}>
                        <figure>
                            <img src={domain + album.albumPhoto} style={imageWidth} className="img-fluid" alt="Lights" />
                        </figure>
                        <div className="caption text-center">
                            <p className="text-white">{album.albumName}</p>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <>
                <h1 className="text-center text-white">Albums List</h1>
                <div className="row ml-5 d-flex">
                    {albums}
                </div>
            </>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchSongs: () => dispatch(fetchSongs()),
        setCurrentAlbum: (album) => dispatch(setCurrentAlbum(album)),
        setCurrentSongs: (songs) => dispatch(setCurrentSongs(songs))

    }
}


const mapStateToProps = state => ({
    player: state.player.allSongs,
    currentSong: state.player.currentSong,
    albumsList: state.player.albumsList
})
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AlbumsComponent)