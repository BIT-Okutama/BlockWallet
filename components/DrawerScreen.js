import React, { Component } from 'react';
import { Button, View, TextInput } from 'react-native';

class WalletCreationScreen extends Component {
    static navigationOptions = {
        title: '',
        headerVisible: false,
    };
    render() {
        return (
        <View style={{ flex: 1 }}>
            <Button
            title="Groups"
            backgroundColor="#2E4053"
            onPress={() => this.props.navigation.push('Group')}
            />
            <Button
            title="Logout"
            backgroundColor="#2E4053"
            onPress={() => this.props.navigation.popToTop()}
            />
        </View>
        );
    }
}

export default WalletCreationScreen;