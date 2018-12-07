import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
    TouchableHighlight
} from 'react-native';
import * as firebase from 'firebase';

class GroupDashboardScreen extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            balance: 0,
            itemDataSource: ds
        }
        this.renderRow = this.renderRow.bind(this);
    }

    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Group Dashboard',
        headerRight: (
            <TouchableOpacity
                style={{ marginRight: 10 }}
                activeOpacity={0.5}
                onPress={() => { navigation.navigate('AddMember', {id: navigation.getParam('itemDetails', '').id}); }}>
                <Image source={require('../assets/add.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        ),
    });
    
    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {
        this.getItems();
        this.setState({
            isLoading: false,
        });
    }

    getItems() {
        let id = this.props.navigation.getParam('itemDetails', '').id
        firebase.database().ref('groups/' + id + '/members/').on('value', snapshot => {
            let items = [];
            snapshot.forEach((child) => {
                console.log("fetching data: " + child.key);
                console.log("fetching data: " + child.val().group_name);
                items.push({
                    title: child.val().name,
                    mobile: child.val().mobile,
                    id: child.key
                })
            });
            this.setState({ itemDataSource: this.state.itemDataSource.cloneWithRows(items) });
        });
    }

    renderRow(item) {
        return (
            <View style = {[{flex: 2, flexDirection:"row"}, styles.table]} >
                <View style = {{ marginLeft: 30 }}>
                    <Text style = {styles.titleMediumThinText}>{item.title}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex:2}}>
                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20, borderBottomWidth: 1, borderColor: "#CFCFCF", paddingBottom: 20}}>
                    <Text style={[styles.titleThinText]}>
                        No Token
                    </Text>
                    <Text style={styles.titleSmallThinText}>
                        Group Currency
                    </Text>
                    <Button
                        title="Create Currency"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Text style={[styles.titleSmallBoldText, {marginTop: 20}]}>
                        Description:
                    </Text>
                    <Text style={styles.titleSmallThinText}>
                        { this.props.navigation.getParam('itemDetails', '').description }
                    </Text>
                </View>
                <ScrollView>
                    <ListView 
                        dataSource = {this.state.itemDataSource}
                        renderRow = {this.renderRow}
                    />
                </ScrollView>
            </View>
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
    titleMediumThinText: {
        fontSize: 18,
        fontWeight: '100',
    },
    titleSmallThinText: {
        fontSize: 14,
        fontWeight: '100',
    },
    greyColor: {
        color: "#5F6A6A",
    },
    table: {
        padding: 20, 
        borderBottomWidth: 1, 
        borderColor:"#CFCFCF", 
        backgroundColor: "#fff"
    },
});


export default GroupDashboardScreen;