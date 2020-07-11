import React, { Component } from 'react'
import {Provider} from 'react-redux';
import store from '../store';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {connect} from "react-redux";
import Songs from './songsComponent';
import SidebarComponent from './SidebarComponent';
import PlayerComponent from './PlayerComponent';

import AlbumsComponent from './AlbumsComponent';

export default class MainComponent extends Component {
    render() {
        return (
            <>
            <SidebarComponent/>
            <Route path="/maincomponent/songs" component={Songs} />
            <Route path="/maincomponent/albums" component={AlbumsComponent} />

            <Link to="/maincomponent/albums"><button>click</button></Link>
            <Link to="/maincomponent/songs"><button>songs</button></Link>
            <PlayerComponent/>
        </>
        )
    }
}
