import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Card } from 'react-native-elements';
import ValidationComponent from 'react-native-form-validator';


export class RegisterForm extends ValidationComponent {

    state = {
        nom: '',
        login: '',
        email: '',
        password: '',
        password2: null,
        error: false
    }
    emailInput;
    passwordInput;
    password2Input;

    submitForm = () => {
        if (this.state.password == this.state.password2) {
            this.validate({
                login: { minlength: 3, required: true },
                email: { email: true, required: true },
                password: { required: true },
                password2: { required: true }
            });
        }
    }

    render() {
        return (
            <>
                <Card containerStyle={{ borderColor: 'transparent', elevation: 0 }}>

                    <Text style={{ textAlign: 'center' }}><Icon name="user-circle" size={55} color="#222a5b" /></Text>
                    <Text style={{ textAlign: 'center', color: 'red' }}>{this.getErrorMessages(',')}</Text>
                    <TextInput label="Nom d'utilisateur" keyboardType={'default'} style={styles.inputs} mode="outlined" value={this.state.login}
                        onChangeText={login => this.setState({ login })} onSubmitEditing={() => { this.emailInput.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(email) => this.emailInput = email} label="Email" keyboardType={'email-address'} style={styles.inputs} mode="outlined" value={this.state.email}
                        onChangeText={email => this.setState({ email })} onSubmitEditing={() => { this.passwordInput.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(password) => this.passwordInput = password} label="Mot de passe" secureTextEntry={true} style={styles.inputs} mode="outlined" value={this.state.password}
                        onChangeText={password => this.setState({ password })} onSubmitEditing={() => { this.password2Input.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(password2) => this.password2Input = password2} label="Répétez votre mot de passe" secureTextEntry={true} style={styles.inputs} mode="outlined" value={this.state.password2}
                        onChangeText={password2 => this.setState({ password2 })} blurOnSubmit={false}></TextInput>

                </Card>
                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '100%' }}>
                    <Button title="Envoyer" buttonStyle={styles.confirmButton} onPress={() => this.submitForm()} disabled={(this.state.password != this.state.password2)} />
                </View>

            </>
        )
    }

}

const styles = StyleSheet.create({
    inputs: {
        marginVertical: 10,
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