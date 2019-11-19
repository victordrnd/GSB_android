import { ListItem, Text, Divider, Button } from 'react-native-elements';
import React, { Component } from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    ScrollView,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';


export default class FraisDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
    }



    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                backgroundColor: '#fff',
                shadowOffset: { width: 0, height: 0, },
                shadowColor: 'white',
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
            },
            headerTintColor: '#475ee9',
            headerTitle: (
                <View style={{ backgroundColor: '#475ee9', height: 50 }}>
                    <Image source={require('../../assets/logo.png')} style={{
                        width: 40, height: 40, marginTop: 5
                    }} />
                </View>
            ),
            headerRight: <Icon name="user" size={20} color="white" style={{ elevation: 1, padding: 20 }} />

        };
    };




    render() {
        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Détails du frais #1</Text>
                    <Text style={styles.subtitle}>Frais de déplacement</Text>

                    <View style={{ marginTop: 15 }}>
                        <View>
                            <LinearGradient style={{ marginTop: 40, height: 150, borderRadius: 8 }} colors={['#3e5be6', '#1f2650']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>

                                <Text style={{ color: 'white', padding: 20, fontWeight: '500' }}>Statut de la déclaration :</Text>
                                <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>50 EUR</Text>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>En attente</Text>
                            </LinearGradient>
                        </View>
                        <TextInput label="Montant en EUR" style={styles.inputs} value="50€" disabled />
                        <TextInput label="Date de déclaration" style={styles.inputs} value="6 Nov. 2019" disabled />
                    </View>
                </View>

                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '50%' }}>

                    <Button title="Modifier" buttonStyle={styles.confirmButton} icon={<Icon name="edit-3" color="white" size={16} style={{marginRight:8}}/>}/>
                </View>
                <View style={{ position: 'absolute', bottom: 0,left: '50%', height: 50, width: '50%' }}>

                    <Button title="Supprimer" buttonStyle={styles.editButton} icon={<Icon name="trash" color="white" size={16} style={{marginLeft:8}}/>} iconRight/>
                </View>

            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        color: '#a3a3a3'
    },
    card: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0
    },
    confirmButton: {
        backgroundColor: '#455eee',
        width: '100%',
        height: '100%',
        borderRadius: 0
    },
    editButton: {
        backgroundColor: '#f44336',
        width: '100%',
        height: '100%',
        borderRadius : 0,
    },
    cardSummary: {
        backgroundColor: '#e8eaf6'
    },
    inputs: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#222a5b'
    },
})