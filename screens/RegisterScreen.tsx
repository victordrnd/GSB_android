import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import ValidationComponent from 'react-native-form-validator';
import { RegisterForm } from '../components/Form/RegisterForm';

interface NavigationParams {
    my_param: string; // You can change "string" to what you are using
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class RegisterScreen extends Component<Props> {

    render() {
        return (
            <View>
                <StatusBar backgroundColor='#222a5b' barStyle='light-content'></StatusBar>
                <View style={styles.headerView} >
                    <Text style={styles.title}>Inscription</Text>
                    <Text style={styles.subtitle}>Inscrivez vous pour déclarer vos frais.</Text>
                </View>
                <View style={styles.RegistrationForm}>
                    <RegisterForm></RegisterForm>
                </View>
            </View>
        )
    }

}

let ScreenHeight = Dimensions.get("window").height - 100;

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#222a5b',
        height: 100,
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 12
    },
    RegistrationForm:{
        height : ScreenHeight
    }
});

