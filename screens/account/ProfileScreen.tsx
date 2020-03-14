import { ListItem, Text } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';
import { TextInput } from 'react-native-paper';
import {
    View,
    ScrollView,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import UserService from '../../services/UserService';
import Moment from 'react-moment';
import LottieView from 'lottie-react-native';


export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    animation;

    state = {
        isDisplayed: true,
        user: {
            firstname: '',
            lastname: '',
            phone: '',
            lastLogin: ''
        }
    }

    async componentDidMount() {
        await this.getCurrentUser();
    }


    getCurrentUser = async () => {
        await UserService.currentUser.subscribe(user => {
            this.setState({ user });
        });
    }

    handleChange = () => {
        this.setState({ isDisplayed: !this.state.isDisplayed });
    }



    _GenerateQRValue = (): string => {
        const { user } = this.state;
        return `MECARD:N:${user.lastname},${user.firstname};ADR:58 Rue Pierre Dupont 69004 Croix Rousse ;Note: Visiteur chez GSB;TEL:0611286286;EMAIL:${user.lastname}@gsb.com;;`;
    }


    render() {

        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Mon Profil</Text>
                    <Text style={styles.subtitle}>Détails de votre compte</Text>

                    <View style={{ marginTop: 15 }}>
                        <TouchableOpacity onPress={this.handleChange}>

                            {this.state.isDisplayed ?

                                <LottieView source={require('../../assets/animations/user.json')} style={{ height: 150, alignSelf: "center" }} autoPlay loop ref={animation => {
                                    this.animation = animation;
                                }} />
                                // <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }} style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 300 }}></Image>
                                :
                                <View style={{ alignSelf: 'center', height: 150 }}>
                                    <QRCode size={150} color="#7a62ff" value={this._GenerateQRValue()} ></QRCode>
                                </View>
                            }
                        </TouchableOpacity>
                        <Text h4 style={{ textAlign: 'center' }}>{this.state.user.firstname} {this.state.user.lastname}</Text>
                        <Text style={{ textAlign: 'center', color: 'grey', fontFamily: "ProductSansItalic" }}>Visiteur chez Galaxy Swiss Bourdin</Text>

                        <TextInput label="Numéro de téléphone" style={styles.inputs} value={this.state.user.lastLogin.toString() ? " " : ""} disabled></TextInput>
                        <Text style={{ fontFamily: "ProductSansRegular", marginTop: -40, marginLeft: 22 }}>{this.state.user.phone ? this.state.user.phone : "Non renseigné"}</Text>
                        <TextInput label="Dernière connexion" style={styles.inputs} value={this.state.user.lastLogin.toString() ? " " : ""} disabled></TextInput>
                        <Moment calendar={calendarStrings} style={{ fontFamily: "ProductSansRegular", marginTop: -40, marginLeft: 22 }} element={Text}>{this.state.user.lastLogin}</Moment>
                    </View>
                </View>
            </>
        )
    }


    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.otherParam : 'A Nested Details Screen',
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
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontFamily: "ProductSansBold"
    },
    subtitle: {
        fontSize: 12,
        color: '#a3a3a3',
        fontFamily: "ProductSansItalic"

    },
    card: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0
    },
    inputs: {
        marginVertical: 10,
        paddingTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#222a5b',
    }
});

const calendarStrings = {
    lastDay: '[Hier à] HH:mm',
    sameDay: "[Aujourd'hui à] HH:mm",
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
};
