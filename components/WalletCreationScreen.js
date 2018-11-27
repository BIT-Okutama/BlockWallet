import React, { Component } from 'react';
import { Button, View, TextInput } from 'react-native';

class WalletCreationScreen extends Component {
  static navigationOptions = {
    title: 'Add Wallet',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          placeholder = "Enter Wallet Name"
          placeholderTextColor = "#666666"
          autoCapitalize = "none"
          clearButtonMode = "always" 
          maxLength = {80}
          style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
        />
        <Button
          title="Create"
          style={{backgroundColor:"#2E4053"}}
          onPress={() => this.props.navigation.navigate('Wallet')}
        />
        <Button
          title="Import Wallet"
          style={{backgroundColor:"#2E4053"}}
          onPress={() => this.props.navigation.navigate('Import')}
        />
      </View>
    );
  }
}

export default WalletCreationScreen;