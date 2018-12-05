import React, { Component, map } from 'react';
import { Button, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Frisbee from 'frisbee';
class SendScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, address: '', amount: '', lastScannedUrl: ''}
  }

  returnData(address) {
    this.setState({address: address});
  }
  
  static navigationOptions = {
    title: 'Send',
  };

  async send() {
    console.log('address is ' + this.state.address);
    console.log('wallet name is ' + this.state.amount);
    let data = {
      "inputs": [{"addresses": ["n3Hkmqs2Nu3oQykqYmesJics7RrQiEFENe"]}],
      "outputs": [{"addresses" : [this.state.address], "value": parseInt(this.state.amount)}]
    }
    console.log("stringify data: " + JSON.stringify(data))
    try {
      const api = new Frisbee({ baseURI: 'https://api.blockcypher.com/v1/btc/test3/' });
      let response = await api.post('txs/new', { body: JSON.stringify(data) });
      let json = response.body;
      if (typeof json.errors) {
        alert("Transaction failed");
        throw new Error('Could not send: ' + json.errors + ' ' + json.errors);
      }
      alert("Send Successfully");
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flexDirection: "row"}}>
            <TextInput
            value = {this.state.address}
            placeholder = "Enter Address"
            placeholderTextColor = "#666666"
            autoCapitalize = "none"
            clearButtonMode = "always" 
            maxLength = {80}
            onChangeText={(address) => this.setState({address})}
            style = {{width:270, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
            />
            <TouchableOpacity 
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('Scan', {returnData: this.returnData.bind(this)})}>
                <Image source={require('../assets/qr-code-black.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
        </View>
        <TextInput
          keyboardType='numeric'
          placeholder = "Enter Amount"
          placeholderTextColor = "#666666"
          autoCapitalize = "none"
          clearButtonMode = "always" 
          maxLength = {15}
          marginTop = {30}
          onChangeText={(amount) => this.setState({amount})}
          style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
        />
        <Button
          title="Send"
          marginTop={20}
          backgroundColor="#2E4053"
          onPress={() => this.send()}
        />
      </View>
    );
  }
}

export default SendScreen;