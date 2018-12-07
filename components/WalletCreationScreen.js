import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
      this.create(this.state.walletName, this.address, this.state.mobileNumber, this.state.fullName)
      this.props.navigation.goBack();
    } catch (err) {
      console.warn(err);
    }
  }

  create(walletName, address, mobileNumber, fullName) {
    firebase.database().ref('wallet/' + mobileNumber).set({
        wallet_name: walletName,
        address: address,
        mobile_number: mobileNumber,
        full_name: fullName
    }, function(error) {
      if (error) {
        alert("Creation failed");
      } else {
        alert("Successfully Created");
      }
    });
  } 

  static navigationOptions = {
    title: 'Create Wallet',
  };

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
          <TextInput
            placeholder = "Enter Full Name"
            placeholderTextColor = "#666666"
            autoCapitalize = "none"
            clearButtonMode = "always" 
            maxLength = {80}
            marginTop = {20}
            onChangeText={(fullName) => this.setState({fullName})}
            style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
          />
          <TextInput
            keyboardType='numeric'
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
          <TouchableOpacity onPress={() => this.createWallet()} style={styles.button}>
            <Text style={{color:"#fff", justifyContent: "center", fontSize:18}}>Create</Text>
          </TouchableOpacity>
          <Text style = {[ styles.titleSmallThinText, { marginTop:20 } ]}>or</Text>
          <Button
            title="Import Wallet"
            style = {{ fontSize:20 }}
            onPress={() => this.props.navigation.navigate('Import')}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
      fontSize: 25,
  },
  titleBoldText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleLargeBoldText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  titleMediumBoldText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleThinText: {
      fontSize: 25,
      fontWeight: '100',
  },
  titleSmallThinText: {
    fontSize: 14,
    fontWeight: '100',
  },
  greyColor: {
      color: "#5F6A6A",
  },
  button: {
    marginTop:10,
    marginLeft:30,
    marginRight:30,
    marginTop:30,
    width: 120,
    height:60,
    backgroundColor:'#2E4053',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#2E4053',
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WalletCreationScreen;