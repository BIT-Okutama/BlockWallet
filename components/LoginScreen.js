import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text } from 'react-native';

class HomeScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: "BlockWallet",
        header: { 
            visible:false 
        } 
    })

    componentDidMount() {
        this.setState({
            isLoading: false,
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.titleBoldText]}>
                    BlockWallet 
                </Text>
                <TextInput
                    placeholder = "Enter Mobile Number"
                    placeholderTextColor = "#666666"
                    autoCapitalize = "none"
                    clearButtonMode = "always" 
                    multiline = {true}
                    numberOfLines = {4}
                    marginTop={70}
                    style = {{ width:300, fontSize:20, borderColor: '#CFCFCF', borderBottomWidth: 1}}    
                />
                <Button
                title="Login"
                style={{backgroundColor:"#2E4053"}}
                onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                title="Create Wallet"
                style={{backgroundColor:"#2E4053"}}
                onPress={() => this.props.navigation.navigate('Wallet')}
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