import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Image } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import UserService from '../services/UserService';
interface NavigationParams {
    my_param: string; // You can change "string" to what you are using
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class LoginScreen extends Component<Props> {

    state = {
        email: '',
        password: ''
    }

    async submitForm() {
        await UserService.login(this.state, async (res) => {
            await UserService.setAuth(res);
            this.props.navigation.navigate('Home');
        });
    }



    render() {
        return (
            <>
                <View>
                    <StatusBar backgroundColor='#455eee' barStyle='light-content'></StatusBar>
                    <View style={styles.headerView} >
                        <Image source={require('../assets/logo.png')} style={{ width: 80, height: 80, alignSelf: "center", marginTop: 20, paddingBottom: 20 }} />
                        <View>
                            <View style={{ width: "50%", position: "absolute", top: 15 }}>
                                <Text style={styles.switch1}>Connexion</Text>
                            </View>
                            <View style={{ width: "50%", position: "absolute", left: "50%", top: 15 }}>
                                <Text style={styles.switch2} onPress={() => this.props.navigation.navigate('Register') }>Inscription</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: -30 }}>

                        <Card containerStyle={{ borderColor: 'transparent', elevation: 0, margin: -1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                            <Text style={styles.title}>Connexion</Text>
                            <Input label="Adresse email" keyboardType={'email-address'} inputStyle={styles.inputs} value={this.state.email} labelStyle={{ fontWeight: "normal" }} containerStyle={{ marginVertical: 10 }}
                                onChangeText={email => this.setState({ email })}
                                leftIcon={<Icon name='mail' size={24} color='grey' style={{marginLeft : -15}}/>}></Input>

                            <Input label="Mot de passe" secureTextEntry={true} style={styles.inputs} value={this.state.password} labelStyle={{ fontWeight: "normal" }} containerStyle={{ marginVertical: 10 }}
                                onChangeText={password => this.setState({ password })}
                                leftIcon={<Icon name='lock' size={24} color='grey' style={{marginLeft : -15}}/>}></Input>

                            <Text style={{ marginTop: 20, textAlign: "right",color: '#455eee' }}>Mot de passe oublié ?</Text>
                        </Card>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '100%' }}>
                    <Button title="Connexion" buttonStyle={styles.confirmButton} onPress={() => this.submitForm()} />
                </View>
            </>
        )
    }

}


const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#455eee',
        height: 200,
        padding: 10,
    },
    title: {
        color: '#000',
        fontSize: 28,
        fontWeight: "bold",
        margin: 20
    },
    subtitle: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 12
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
        marginTop: 20,
        color: 'grey',

    },
    switch1: {
        color: '#fff',
        fontSize: 20,
        textAlign: "center"
    },
    switch2: {
        color: '#fff',
        fontSize: 20,
        textAlign: "center",
        opacity: 0.5
    },
    inputs: {
        marginVertical: 0,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#222a5b'
    },
    confirmButton: {
        backgroundColor: '#455eee',
        width: '100%',
        height: '100%',
        borderRadius: 0
    }
});
