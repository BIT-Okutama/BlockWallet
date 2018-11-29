import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

class HomeScreen extends Component {

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  static navigationOptions = ({ navigate, navigation }) => ({
    title: "BlockWallet",
    headerRight: (
    <Button 
      title="+" 
      color="#fff"
      style={styles.titleBoldText}
      onPress={()=>{ navigation.navigate('Wallet'); }} 
      />
    ),
    headerLeft: (
      <Button 
        title="="
        color="#fff"
        style={styles.titleBoldText}
        onPress={()=>{ navigation.navigate('Drawer'); }}
      />
    ),
  })
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.titleThinText}>
            eth 
            <Text style={[styles.titleBoldText, styles.greyColor]}> 
                100.00
            </Text>
        </Text>
        <Text style={styles.titleSmallThinText}>
            Wallet Balance
        </Text>
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
    }
});

export default HomeScreen;