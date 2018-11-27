import React from 'react';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import HomeScreen from './components/HomeScreen';
import WalletCreationScreen from './components/WalletCreationScreen';
import ImportWalletScreen from './components/ImportWalletScreen';
import DrawerScreen from './components/DrawerScreen';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmpkl9VTORJMG-IFFkNDwRF4qjSQn3BzM",
  authDomain: "blockwallet-c410f.firebaseapp.com",
  databaseURL: "https://blockwallet-c410f.firebaseio.com",
  projectId: "blockwallet-c410f",
  storageBucket: "blockwallet-c410f.appspot.com",
  messagingSenderId: "733399648006"
};

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Wallet: WalletCreationScreen,
    Import: ImportWalletScreen,
    Drawer: DrawerScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2E4053',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
