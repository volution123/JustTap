import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Button, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon, Footer, FooterTab } from 'native-base';
import firebase from 'react-native-firebase';

class ViewReceipt extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'FULL RECEIPT',
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#A7A9AB',
            textAlign: 'center',
            width: '80%'
        },
        headerLeft: (
            <TouchableOpacity onPress={() =>{navigation.navigate("Main")}}>
                <View style={{marginLeft: 15}}>
                    <Icon name="arrow-back"
                        style={{fontSize: 25, color: '#A7A9AB'}}
                    />
                </View>
            </TouchableOpacity>
        ),
    });

    //delete expense from flatlist
    deleteExpense = () => {
        //get a key for a new receipt
        var newReceiptKey = firebase.database().ref().child('receipts').remove().key;
        this.props.navigation.navigate('ExpensesScreen');
    }

    //function that calls the 'deleteExpense' function
    alertDeleteExpense = () => {
        Alert.alert(
            'JUSTTAP',
             'Are you sure you want to delete this expense?',
              [
                {text: 'Confirm', onPress: this.deleteExpense.bind(this)},
                {text: 'Cancel', onPress:() => console.log('Cancel Pressed'), style: 'cancel'},
              ],
              { cancelable: false }
        )
    }

    render(item) {
        //const {params} = this.props.navigation.state;
        //const mainData = this.props.navigation.state.params.receiptsData;
        const { params } = this.props.navigation.state;
        const data = params ? params.data : null;
        return(
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.company}>Company: {JSON.stringify(data.fields.merchantname.value)}</Text>

            <Text style={styles.quantity}>Quantity: {JSON.stringify(data.lineItems[0].quantity)}</Text>
            <Text style={styles.product}>Product 1: {JSON.stringify(data.lineItems[0].productName)}</Text>
            <Text style={styles.product}>Product 2: {JSON.stringify(data.lineItems[1].productName)}</Text>
            <Text style={styles.price}>Price: £{JSON.parse(data.lineItems[0].finalPrice).toFixed(2)}</Text>

            <Image
                style={styles.preview}
                source={{uri: data.imageUrl}}
            />

            <Text style={styles.amount}>Bill Amount: £{JSON.parse(data.fields.totalbillamount.value).toFixed(2)}</Text>
            <Text style={styles.date}>Billing Date: {JSON.stringify(data.fields.billingdate.value)}</Text>

            <TouchableOpacity onPress={this.alertDeleteExpense.bind(this)}>
                <View style={styles.deleteBtn}>
                    <Text style={{ fontSize: 16, color: '#FFF', marginTop: 8, textAlign: 'center' }}>DELETE EXPENSE</Text>
                </View>
            </TouchableOpacity>
        </View>
        )
    }
}

export default ViewReceipt;

const styles = StyleSheet.create({
    company: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10
    },
    quantity: {
        fontSize: 16,
    },
    product: {
        fontSize: 16
    },
    price: {
        fontSize: 16,
    },
    amount: {
        fontSize: 20,
        fontWeight: '500'
    },
    date: {
        fontSize: 20,
        fontWeight: '500'
    },
    preview: {
        width: 280,
        height: 280,
        borderColor: '#0893CF',
        borderWidth: 3,
        borderRadius: 4
    },
    deleteBtn: {
        width: 150, 
        height: 40, 
        backgroundColor: '#FF4D4D',
        marginTop: 30,
        borderColor: '#FFF',
        borderRadius: 5
    }
});