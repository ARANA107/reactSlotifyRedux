import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import MainComponent from './components/MainComponent';
import login from './components/login';
import albumsComponent from './components/AlbumsComponent'
import './App.css';
import SidebarComponent from './components/SidebarComponent';
import PlayerComponent from './components/PlayerComponent';
import Songs from './components/songsComponent';
import {connect} from "react-redux";
import AlbumsComponent from './components/AlbumsComponent';

export default function App() {
  return (
    <Provider store={store}>
      <SidebarComponent/>
        <Router>
          <div>
            <Route path="/login" component={login} />
            <Route path="/maincomponent" component={MainComponent}/>
            <Route path="/maincomponent/albums" component={MainComponent}/>
            <Route exact path="/" component={login} />
          </div>
        </Router>
      <PlayerComponent/>
    </Provider>
  );
}