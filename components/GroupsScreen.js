import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';

class GroupScreen extends Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        title: '',
        headerRight: (
            <TouchableOpacity 
              style={{marginRight: 10}} 
              activeOpacity={0.5}
              onPress={()=>{ navigation.navigate('CreateGroup'); }}>
              <Image source={require('../assets/add.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
        ),
    });

    render() {
        return (
            <View style={{ flex: 1 }}>
                
            </View>
        );
    }
}

export default GroupScreen;