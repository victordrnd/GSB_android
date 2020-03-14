import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import UserService from '../services/UserService';
import LottieView from 'lottie-react-native';
import FraisService from '../services/FraisService';
interface NavigationParams {
    my_param: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class AuthLoadingScreen extends Component<Props> {

    state = {
    };
    animation;

    componentDidMount() {
        this.animation.play(60);
        setTimeout(this.loadUser.bind(this), 2500)
    }

    async loadUser() {
        let userToken;
        await UserService.populate();
        await AsyncStorage.getItem('@token').then(token => userToken = token);
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }


    render() {
        return (
            <>
                <StatusBar backgroundColor='#7a62ff' barStyle='light-content'></StatusBar>
                <View style={{ backgroundColor: "#7a62ff", height: "100%", width: "100%" }}>
                    <Image source={require('../assets/logo-white2x.png')} style={{ alignSelf: "center", marginTop: 150, height: 100, width: 100 }}></Image>
                    <LottieView source={require('../assets/animations/dna2.json')} style={{ marginTop: 100, width: 200, alignSelf: "center" }} autoPlay loop ref={animation => {
                        this.animation = animation;
                    }} />
                    <Text style={{ textAlign: "center", color: "#fff", fontFamily: "ProductSansRegular", marginTop: 100 }}>Chargement...</Text>
                    {/* <ActivityIndicator color="#fff" size="large" style={{marginTop : Dimensions.get('window').height/2 - 150}}/> */}
                </View>
            </>
        )
    }

}


const styles = StyleSheet.create({

});
