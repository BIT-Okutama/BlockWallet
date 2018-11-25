import React from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmpkl9VTORJMG-IFFkNDwRF4qjSQn3BzM",
  authDomain: "blockwallet-c410f.firebaseapp.com",
  databaseURL: "https://blockwallet-c410f.firebaseio.com",
  projectId: "blockwallet-c410f",
  storageBucket: "blockwallet-c410f.appspot.com",
  messagingSenderId: "733399648006"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
  
  }
}