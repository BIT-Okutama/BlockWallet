import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import uuid from 'react-native-uuid';
import Frisbee from 'frisbee';

class HomeScreen extends Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    title: "BlockWallet",
    headerRight: (
      <TouchableOpacity 
        style={{marginRight: 10}} 
        activeOpacity={0.5}
        onPress={()=>{ navigation.navigate('Home'); }}>
        <Image source={require('../assets/qr-code.png')} style={{width: 30, height: 30}}/>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity 
      style={{marginLeft: 10}} 
      activeOpacity={0.5}
      onPress={()=>{ navigation.navigate('Drawer'); }}>
        <Image source={require('../assets/hamburger.png')} style={{width: 30, height: 30}}/>
      </TouchableOpacity>
    ),
  })

  constructor(props){
    super(props);
    this.state ={ isLoading: true, balance: 0}
  }

  componentWillMount() {
    this.fetchBalance()
  }

  async fetchBalance() {
    try {
      const api = new Frisbee({ baseURI: 'https://api.blockcypher.com/v1/btc/test3/' });
      let response = await api.get('addrs/n3Hkmqs2Nu3oQykqYmesJics7RrQiEFENe/balance');
      let json = response.body;
      if (typeof json === 'undefined' || typeof json.final_balance === 'undefined') {
        alert("Fetching Wallet Balance Failed");
        throw new Error('Could not fetch balance: ' + response.err + ' ' + response.body);
      }
      this.setState({balance: json.final_balance});
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View>
          <Text style={[styles.titleThinText]}>
              btc {" "}
              <Text style={[styles.titleLargeBoldText, styles.greyColor, {paddingLeft: 50}]}> 
                  {this.state.balance}
              </Text>
          </Text>
        </View>
        <Text style={styles.titleSmallThinText}>
          Wallet Balance
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', marginTop:30 }}>
          <Button
            title="Send"
            backgroundColor="#2E4053"
            onPress={() => this.props.navigation.navigate('Send')}
          />
          <Button
            title="Receive"
            backgroundColor="#2E4053"
            onPress={() => this.props.navigation.navigate('Home')}
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
    titleLargeBoldText: {
      fontSize: 40,
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
    }
});

export default HomeScreen;