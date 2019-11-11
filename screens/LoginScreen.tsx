import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Card, CheckBox } from 'react-native-elements';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface NavigationParams {
    my_param: string; // You can change "string" to what you are using
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export class LoginScreen extends Component<Props> {

    state = {
        login: '',
        password: ''
    }



    render() {
        return (
            <View>
                <View style={styles.headerView} >
                    <Text style={styles.title}>Connexion</Text>
                    <Text style={styles.subtitle}>Connectez vous pour déclarer vos frais.</Text>
                </View>
                <Card containerStyle={{ borderColor: 'transparent', elevation: 0 }}>
                    <Text style={{textAlign:'center'}}><Icon name="user-circle" size={55} color="#222a5b"/></Text>
                    <TextInput label="Nom d'utilisateur" keyboardType={'default'} style={styles.inputs} mode="outlined" value={this.state.login}
                        onChangeText={login => this.setState({ login })}></TextInput>

                    <TextInput label="Mot de passe" secureTextEntry={true} style={styles.inputs} mode="outlined" value={this.state.password}
                        onChangeText={password => this.setState({ password })}></TextInput>


                    <Button title="Envoyer" buttonStyle={styles.confirmButton} />
                    <Text style={{marginTop:20}}>Vous n'avez pas encore de compte ? <Text style={{color:'#adb8fa'}} onPress={() => this.props.navigation.navigate('Frais')}>Créez en un</Text></Text>
                </Card>

            </View>
        )
    }

}


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
    label: {
        marginLeft: 10,
        fontSize: 16,
        marginTop: 20,
        color: 'grey',

    },
    inputs: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#222a5b'
    },
    confirmButton: {
        marginHorizontal: 10,
        backgroundColor: '#adb8fa',
        marginVertical: 10

    }
});
