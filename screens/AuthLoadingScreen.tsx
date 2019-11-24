import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import UserService from '../services/UserService';
interface NavigationParams {
    my_param: string; // You can change "string" to what you are using
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class AuthLoadingScreen extends Component<Props> {


    componentDidMount(){
        setTimeout(this.loadUser.bind(this), 2500);
    }

    async loadUser(){
        let userToken;
        await UserService.populate();
        await AsyncStorage.getItem('@token').then(token => userToken = token);
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }


    render() {
        return (
            <>
            <StatusBar backgroundColor='#455eee' barStyle='light-content'></StatusBar>
            <View style={{backgroundColor: "#455eee", height:"100%", width:"100%"}}>
                <Image source={ require('../assets/logo.png')} style={{alignSelf : "center", marginTop : 150}}></Image>
                <ActivityIndicator color="#fff" size="large" style={{marginTop : Dimensions.get('window').height/2 - 150}}/>
            </View>
            </>
        )
    }

}


const styles = StyleSheet.create({
    
});
