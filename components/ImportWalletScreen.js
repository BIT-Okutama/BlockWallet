import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text } from 'react-native';

class ImportWalletScreen extends Component {
  static navigationOptions = {
    title: 'Import Wallet',
  };
  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.titleBoldText}>
          Import
        </Text>
        <Text style={[styles.titleSmallThinText, {padding: 10}]} textAlign='justify' marginTop={10}>
            Write here you mnemonic, private key, WIF, or anything you've got. BlueWallet will do its best to guess the correct format and import your wallet.
          </Text>
        <View style={{ flex: 1, alignItems: 'center'}}>
          <TextInput
            placeholderTextColor = "#666666"
            autoCapitalize = "none"
            clearButtonMode = "always" 
            multiline = {true}
            numberOfLines = {4}
            marginTop={20}
            style = {{ width:300, fontSize:20, borderColor: '#CFCFCF', borderWidth: 1, height: 200 }}    
          />
          <Button
            title="Import"
            marginTop={20}
            onPress={() => this.props.navigation.navigate('Wallet')}
          />
        </View>
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
  marginMid: {
    marginTop: 20
  },
});

export default ImportWalletScreen;