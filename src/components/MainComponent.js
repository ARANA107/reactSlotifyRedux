import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import Songs from './songsComponent';
import { SidebarComponent } from './SidebarComponent';
import PlayerComponent from './PlayerComponent';
import { fetchSongs } from '../actions/fetchSongs';
import AlbumsComponent from './AlbumsComponent';

class MainComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSongObj: {},
            count: 0
        }
    }

    componentDidMount() {
        this.props.fetchSongs();
    }
    showAlbumsList = () => {
        console.log(this.props.albumsList);
    }

    playsong = (song) => {
        console.log('main comaponent', song)
        // this.setState(prevState => {
        //     return {count: prevState.count + 1, currentSongObj:song}
        //  })
        this.setState({ currentSongObj: song })
        this.player.playSongComponent(song);
    }
    render() {
        return (

            <>
                <main className="container-fluid m-0 p-0">
                    <div style={{ backgroundColor: "black" }} className="row m-0">
                        <div style={ { height: "100vh" }} className="col-2 pl-0 pr-2">
                            <SidebarComponent />
                        </div>
                        <div style={ { height: "100vh" }} className="col-10">
                            <Switch>
                                <Route path="/maincomponent/albums" component={() => <AlbumsComponent albumsArray={this.props.albumsList} />} />
                                <Route path="/maincomponent/songs" component={() => <Songs playsong={(song) => this.playsong(song)} />} />
                            </Switch>
                        </div>
                    </div>
                    <div className="row p-0 m-0">
                        <PlayerComponent onRef={ref => (this.player = ref)} />
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