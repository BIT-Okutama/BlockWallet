import React from 'react';
import { createStackNavigator } from 'react-navigation';
import uuid from 'react-native-uuid';
import HomeScreen from './components/HomeScreen';
import WalletCreationScreen from './components/WalletCreationScreen';
import ImportWalletScreen from './components/ImportWalletScreen';
import LoginScreen from './components/LoginScreen';
import DrawerScreen from './components/DrawerScreen';
import SendScreen from './components/SendScreen';
import ScannerScreen from './components/ScannerScreen';
import GroupScreen from './components/GroupsScreen';
import CreateGroupScreen from './components/CreateGroupScreen';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCmpkl9VTORJMG-IFFkNDwRF4qjSQn3BzM",
  authDomain: "blockwallet-c410f.firebaseapp.com",
  databaseURL: "https://blockwallet-c410f.firebaseio.com",
  projectId: "blockwallet-c410f",
  storageBucket: "blockwallet-c410f.appspot.com",
  messagingSenderId: "733399648006"
};
firebase.initializeApp(config);

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Wallet: WalletCreationScreen,
    Import: ImportWalletScreen,
    Drawer: DrawerScreen,
    Send: SendScreen,
    Scan: ScannerScreen,
    Group: GroupScreen,
    CreateGroup: CreateGroupScreen,
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    }, 
  },
  {
    initialRouteName: 'Login',
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

export default class App extends React.Component {

  componentDidMount() {
    this.setState({
      uuid: uuid.v1(),
    });
  }

  constructor(props){
    super(props);
    this.state ={ isLoading: true, udid: "" }
  }

  render() {
    return (
      <RootStack />
    );
  }
}
