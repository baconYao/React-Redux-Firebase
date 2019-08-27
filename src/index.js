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

// withExtraArgument讓我們可以傳入需要使用到的東西，然後在action時使用它們(可以參考store/actions/projectActions.js)
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    // useFirestoreForProfile 是用來取出使用者存在firestore的資訊(由於我們使用firebase給予的uid當成firestore user collection的document的uid，因此可以對應到正確的user)
    // userProfile：告訴firestore要使用個collections內的資料當成 user profile
    // 設定完上述兩者之後，就可以透過state.firebase.profile看到使用者的資訊(未設定前只能看到isEmpty: true, isLoaded: false)
    reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
