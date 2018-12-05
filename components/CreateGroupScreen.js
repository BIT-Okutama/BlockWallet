import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import * as firebase from 'firebase';

class CreateGroupScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Create Group',
    });

    constructor(props){
        super(props);
        this.state ={ isLoading: true, groupName: '', groupDescription: '' }
    }

    create() {
      console.log("date today: " + new Date());
        firebase.database().ref('group').push().set({
            group_name: this.state.groupName,
            group_desc: this.state.groupDescription,
            group_create_date: new Date()
        }, function(error) {
          if (error) {
            alert("Creation failed");
          } else {
            // Alert.alert(
            //   'Successfully Created',
            //   'You have successfully created your group.',
            //   [
            //     { text: 'OK', onPress: () => this.state.props.navigation.pop() },
            //   ],
            //   { cancelable: false }
            // )
            alert("Successfully Created");
          }
        });
    }
  
    render() {
    return (
      <View style = {{ flex: 1 }}>
        <View style = {{ paddingLeft: 20, paddingRight: 20 , marginTop: 20}}>
          <Text style = { styles.titleSmallThinText }>Create a group now to be able to give your thank you to your friends.</Text>
        </View>
        <View style = {{ alignItems: "center" }} >
          <TextInput
            placeholder = "Enter Group Name"
            placeholderTextColor = "#666666"
            autoCapitalize = "none"
            clearButtonMode = "always" 
            maxLength = {80}
            marginTop = {50}
            onChangeText = {(groupName) => this.setState({groupName})}
            style = {{width:300, fontSize:20, borderBottomColor: '#CFCFCF', borderBottomWidth: 1}}    
          /> 
          <TextInput
            placeholder = "Enter Description"
            placeholderTextColor = "#666666"
            autoCapitalize = "none"
            clearButtonMode = "always" 
            maxLength = {100}
            marginTop = {30}
            onChangeText={(groupDescription) => this.setState({groupDescription})}
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

export default CreateGroupScreen;