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
        const domain = "http://localhost:3000/";

        const albums = this.props.albumsArray.map(album => {
            return (
                <div key={album.id} className="col-lg-2 col-md-2 col-2">
                    <div style={style} className="thumbnail" onClick={() => this.setSongs(album)}>
                        <figure>
                            <img src={domain + album.albumPhoto} className="img-fluid max-width:100%" alt="Lights" />
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
                <div className="row d-flex">
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