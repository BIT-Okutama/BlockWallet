import React, { Component } from 'react';
import { Button, View, TextInput } from 'react-native';
import Frisbee from 'frisbee';
import * as firebase from 'firebase';

class WalletCreationScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, walletName: '', address: '', fullName: '', mobileNumber: ''}
  }

  async componentWillMount() {
    try {
      const api = new Frisbee({ 
        headers: {
        'Content-Type': 'application/json'
        }, 
      });
      let response = await api.post('https://api.blockcypher.com/v1/btc/test3/addrs');
      console.log("check response " + response.body);
      let json = response.body;
      if (typeof json === 'undefined' || typeof json.address === 'undefined') {
        throw new Error('Could not fetch address: ' + response.err + ' ' + response.body);
      }
      this.address = json.address
      console.log("check if address was fetch " + this.address);
    } catch (err) {
      console.warn(err);
    }
  }

  async createWallet() {
    const {
      address,
    } = this.state

    console.log('address is ' + this.address);
    console.log('wallet name is ' + this.state.walletName);
    console.log('mobile number is ' + this.state.mobileNumber);
    try {
      const api = new Frisbee({ baseURI: 'https://api.blockcypher.com/v1/btc/test3/' });
      let response = await api.post('wallets?token=245d53ab09e749f4a67d0031edf43db9', { body: JSON.stringify({ "name": this.state.walletName,"addresses": [this.address] }) });
      let json = response.body;
      if (typeof json === 'undefined' || typeof json.name === 'undefined') {
        alert("Creation of wallet failed");
        throw new Error('Could not create wallet: ' + response.err + ' ' + response.body);
      }
      this.create(this.state.walletName, this.address, this.state.mobileNumber)
      alert("Wallet successfully created");
    } catch (err) {
      console.warn(err);
    }
  }

  create(walletName, address, mobileNumber) {
    firebase.database().ref('wallet').push().set({
        wallet_name: walletName,
        address: address,
        mobile_number: mobileNumber
    });
  } 

  static navigationOptions = {
    title: 'Create Wallet',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          placeholder = "Enter Full Name"
          placeholderTextColor = "#666666"
          autoCapitalize = "none"
          clearButtonMode = "always" 
          maxLength = {80}
          onChangeText={(fullName) => this.setState({fullName})}
          style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
        />
        <TextInput
          placeholder = "Enter Mobile Number"
          placeholderTextColor = "#666666"
          autoCapitalize = "none"
          clearButtonMode = "always" 
          maxLength = {15}
          marginTop = {30}
          onChangeText={(mobileNumber) => this.setState({mobileNumber})}
          style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
        />
        <TextInput
          placeholder = "Enter Wallet Name"
          placeholderTextColor = "#666666"
          autoCapitalize = "none"
          clearButtonMode = "always" 
          maxLength = {80}
          marginTop = {30}
          onChangeText={(walletName) => this.setState({walletName})}
          style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
        />
        <Button
          title="Create"
          marginTop={20}
          backgroundColor="#2E4053"
          onPress={() => this.createWallet()}
        />
        <Button
          title="Import Wallet"
          onPress={() => this.props.navigation.navigate('Import')}
        />
      </View>
    );
  }
}

export default WalletCreationScreen;