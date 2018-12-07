import React, { Component } from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ListView } from 'react-native';
import * as firebase from 'firebase';

class GroupScreen extends Component {

    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Groups',
        headerRight: (
            <TouchableOpacity 
              style={{marginRight: 10}} 
              activeOpacity={0.5}
              onPress={()=>{ navigation.navigate('CreateGroup'); }}>
              <Image source={require('../assets/add.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state ={ 
          itemDataSource: ds
        }
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    componentWillMount() {
        this.getItems();
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        firebase.database().ref('groups/').on('value', snapshot => {
            let items = [];
            snapshot.forEach((child) => {
                console.log("fetching data: " + child.key);
                console.log("fetching data: " + child.val().group_name);
                items.push({
                    title: child.val().group_name,
                    description: child.val().group_desc,
                    id: child.key
                })
            });
            this.setState({ itemDataSource: this.state.itemDataSource.cloneWithRows(items) });
        });
    }

    pressRow(item) {
        console.log(item);
    }

    renderRow(item) {
        return (
            <TouchableHighlight underlayColor="#f1f1f1" activeOpacity={70} style = {styles.table} onPress={() => this.props.navigation.push("GroupDashboard", {itemDetails: item})}>
                <View style = {{ marginLeft: 30 }}>
                    <Text style = {styles.titleMediumThinText}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView 
                dataSource = {this.state.itemDataSource}
                renderRow = {this.renderRow}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
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
    titleThinText: {
        fontSize: 25,
        fontWeight: '100',
    },
    titleSmallThinText: {
      fontSize: 14,
      fontWeight: '100',
    },
    titleMediumThinText: {
        fontSize: 18,
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
})

export default GroupScreen;