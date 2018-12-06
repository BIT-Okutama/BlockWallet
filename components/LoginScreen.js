import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { navigation } from 'react-navigation';
import * as firebase from 'firebase';

class HomeScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: "BlockWallet",
        header: { 
            visible:false 
        } 
    })

    constructor(props){
        super(props);
        this.state ={ isLoading: true, mobileNumber: '' }
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
        });
    }

    checkMobile() {
        firebase.database().ref('wallet/' + this.state.mobileNumber).on('value', snapshot => {
            console.log("it exists: " + snapshot.exists());
            if(snapshot.exists()) {
                this.props.navigation.navigate("Home", { mobileNumber: this.state.mobileNumber });
            } else {
                alert("Number does not exists");
            }
        })
    }

    render() {
        return (
            <View style = {{ flex: 2 }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.titleLargeBoldText]}>
                        BlockWallet 
                    </Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholder = "Enter Mobile Number"
                        placeholderTextColor = "#666666"
                        autoCapitalize = "none"
                        clearButtonMode = "always" 
                        multiline = {true}
                        numberOfLines = {4}
                        marginTop={70}
                        onChangeText = {(mobileNumber) => this.setState({mobileNumber})}
                        style = {{ width:300, fontSize:20, borderColor: '#CFCFCF', borderBottomWidth: 1}}    
                    />
                    <TouchableOpacity onPress={() => this.checkMobile()} style={styles.button}>
                        <Text style={{color:"#fff", justifyContent: "center", fontSize:18}}>Login</Text>
                    </TouchableOpacity>   
                </View>
                <View style = {{ marginBottom: 240}}>
                    <Button
                    title="Create Wallet"
                    style={{backgroundColor:"#2E4053"}}
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
    titleLargeBoldText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    titleLargeBolderText: {
        fontSize: 40,
        fontWeight: '800',
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

export default HomeScreen;