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
import UserService from '../../services/UserService';

export class RegisterForm extends ValidationComponent {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: null,
        error: false
    }
    firstnameInput;
    emailInput;
    passwordInput;
    password2Input;

    submitForm =async () => {
        if (this.state.password == this.state.password2) {
            this.validate({
                lastname: { required: true },
                firstname: { required: true },
                email: { email: true, required: true },
                password: { required: true },
                password2: { required: true }
            });
            if(this.isFormValid()){
                await UserService.signup(this.state, (res) => {
                    console.log(res)
                });
            }
        }
    }

    render() {
        return (
            <>
                <Card containerStyle={{ borderColor: 'transparent', elevation: 0 }}>

                    <Text style={{ textAlign: 'center' }}><Icon name="user-circle" size={55} color="#222a5b" /></Text>
                    <Text style={{ textAlign: 'center', color: 'red' }}>{this.getErrorMessages(',')}</Text>
                    <TextInput label="Nom" keyboardType={'default'} style={styles.inputs} mode="outlined" value={this.state.lastname}
                        onChangeText={lastname => this.setState({ lastname })} onSubmitEditing={() => { this.firstnameInput.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(firstname) => this.firstnameInput = firstname} label="Prénom" keyboardType={'default'} style={styles.inputs} mode="outlined" value={this.state.firstname}
                        onChangeText={firstname => this.setState({ firstname })} onSubmitEditing={() => { this.emailInput.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(email) => this.emailInput = email} label="Email" keyboardType={'email-address'} style={styles.inputs} mode="outlined" value={this.state.email}
                        onChangeText={email => this.setState({ email })} onSubmitEditing={() => { this.passwordInput.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(password) => this.passwordInput = password} label="Mot de passe" secureTextEntry={true} style={styles.inputs} mode="outlined" value={this.state.password}
                        onChangeText={password => this.setState({ password })} onSubmitEditing={() => { this.password2Input.focus(); }} blurOnSubmit={false}></TextInput>

                    <TextInput ref={(password2) => this.password2Input = password2} label="Répétez votre mot de passe" secureTextEntry={true} style={styles.inputs} mode="outlined" value={this.state.password2}
                        onChangeText={password2 => this.setState({ password2 })} blurOnSubmit={false}></TextInput>

                </Card>
                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '100%' }}>
                    <Button title="Envoyer" buttonStyle={styles.confirmButton} onPress={() => this.submitForm()} />
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