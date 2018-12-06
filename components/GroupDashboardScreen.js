import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import * as firebase from 'firebase';

class GroupDashboardScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Group Dashboard',
        headerRight: (
            <TouchableOpacity
                style={{ marginRight: 10 }}
                activeOpacity={0.5}
                onPress={() => { navigation.navigate('AddMember'); }}>
                <Image source={require('../assets/add.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            balance: 0,
            mobileNumber: this.props.navigation.getParam('mobileNumber', '')
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({
            isLoading: false,
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View>
                        <Text style={[styles.titleThinText]}>
                            No Token
                        </Text>
                    </View>
                    <Text style={styles.titleSmallThinText}>
                        Group Currency
                    </Text>
                    <Text style={[styles.titleSmallBoldText, { marginTop:20 }]} >
                        Description:
                    </Text>
                    <Text style={styles.titleSmallThinText}>
                        { this.props.navigation.getParam('itemDetails', '').description }
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 25,
    },
    titleSmallBoldText: {
        fontSize: 14,
        fontWeight: 'bold',
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


export default GroupDashboardScreen;