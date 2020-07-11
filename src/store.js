import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialSate = {};
const middleWare= [thunk];

const store = createStore(rootReducer, initialSate, applyMiddleware(...middleWare));

export default store;