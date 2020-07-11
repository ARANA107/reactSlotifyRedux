import React, { Component } from 'react'
import {Provider} from 'react-redux';
import store from '../store';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {connect} from "react-redux";
import Songs from './songsComponent';

import AlbumsComponent from './AlbumsComponent';

export default class MainComponent extends Component {
    render() {
        return (
            <>
            <Route path="/maincomponent/songs" component={Songs} />
        </>
        )
    }
}
