import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import MainComponent from './components/MainComponent';
import login from './components/login';
import './App.css';
import CustomDragDrop from './components/CustomDragDrop';
export default function App() {



  return (
    <Provider store={store}>
      
        <Router>
          <Switch>
            <Route path="/login" component={login} />
            <Route path="/maincomponent" component={MainComponent}/>
            <Route path="/customsongdrop" component={CustomDragDrop}/>
            <Route exact path="/" component={login} />
            </Switch>
        </Router>
      
    </Provider>
  );
}