import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import * as firebase from 'firebase';

class AddMembersScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Add Member',
    });

    constructor(props){
        super(props);
        console.log("fetched ID: " + this.props.navigation.getParam('id', ''))
        this.state = { 
            isLoading: true, 
            memberMobile: '', 
            id: this.props.navigation.getParam('id', '')
        }
    }

    checkWallet() {
        firebase.database().ref('wallet/' + this.state.memberMobile).on('value', snapshot => {
            console.log("it exists: " + snapshot.exists());
            if(snapshot.exists()) {
                this.addMembers(this.state.memberMobile, snapshot.val().wallet_name);
            } else {
                alert("Number does not exists");
            }
        })
    }

    addMembers(mobileNumber, name) {
      console.log("date today: " + new Date());
      firebase.database().ref('groups/' + this.state.id + '/members/').push().set({
          name: name,
          mobile_number: mobileNumber,
      }, function(error) {
        if (error) {
          alert("Creation failed");
        } else {
          alert("Successfully Added");
        }
      });
    }
  
    render() {
    return (
      <View style = {{ flex: 1 }}>
        <View style = {{ alignItems: "center" }} marginTop={30} >
          <TextInput
            keyboardType='numeric'
            placeholder = "Enter Mobile Number"
            placeholderTextColor = "#666666"
            autoCapitalize = "none"
            clearButtonMode = "always" 
            maxLength = {80}
            marginTop = {50}
            onChangeText = {(memberMobile) => this.setState({memberMobile})}
            style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
          /> 
          <View style = { styles.button }>
            <Button
              title = "Create"
              color = "#fff"
              onPress = {() => this.checkWallet()}
            />
          </View>
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
    marginTop:35, 
    backgroundColor: "#2E4053", 
    width: 120, 
    height: 60, 
    justifyContent: "center",
  }
});

export default AddMembersScreen;