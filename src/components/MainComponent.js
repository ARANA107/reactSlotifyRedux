import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import Songs from './songsComponent';
import {SidebarComponent} from './SidebarComponent';
import PlayerComponent from './PlayerComponent';
import { fetchSongs } from '../actions/fetchSongs';
import AlbumsComponent from './AlbumsComponent';

class MainComponent extends Component {

   

    componentDidMount() {
        this.props.fetchSongs();
    }
    showAlbumsList = () => {
        console.log(this.props.albumsList);
    }

    render() {
        return (

            <>
            <main style={{height:"100vh"}} className="container-fluid d-flex flex-column m-0 p-0">
                <div style={{backgroundColor:"black"}} className="row flex-grow-1 m-0">
                    <div className="col-auto pl-0 pr-2">
                        <SidebarComponent/>
                    </div>
                    <div className="col-md-10 justify-center col-auto ml-auto">
                        <Switch>
                            <Route path="/maincomponent/albums" component={() => <AlbumsComponent albumsArray={this.props.albumsList} />} />
                            <Route path="/maincomponent/songs" component={Songs} />
                        </Switch>
                    </div>
                </div>
                <div className="row p-0 m-0">
                    <PlayerComponent />
                </div>
                
                </main>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSongs: () => dispatch(fetchSongs()),
    }
}


const mapStateToProps = state => ({
    player: state.player.allSongs,
    currentSong: state.player.currentSong,
    albumsList: state.player.albumsList
})

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)