import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import * as firebase from 'firebase';

class AddMembersScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Add Member',
    });

    constructor(props){
        super(props);
        this.state = { isLoading: true, memberMobile: '' }
    }

    create() {
      console.log("date today: " + new Date());
    //   firebase.database().ref('groups/').push().set({
    //       group_name: this.state.groupName,
    //       group_desc: this.state.groupDescription,
    //   }, function(error) {
    //     if (error) {
    //       alert("Creation failed");
    //     } else {
    //       alert("Successfully Created");
    //     }
    //   });
    }
  
    render() {
    return (
      <View style = {{ flex: 1 }}>
        <View style = {{ alignItems: "center" }} marginTop={30} >
          <TextInput
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
              onPress = {() => this.create()}
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