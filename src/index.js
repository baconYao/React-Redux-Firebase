import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

// withExtraArgument讓我們可以傳入需要使用到的東西，然後再action時使用它們(可以參考store/actions/projectActions.js)
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
