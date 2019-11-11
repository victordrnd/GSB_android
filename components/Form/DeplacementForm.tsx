import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Card, CheckBox } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'



export default class DeplacementForm extends React.PureComponent {

    state = {
        montant: '',
        train: false,
        avion: false,
        voiture: true,
        photo: null

    }


    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }

    render() {
        const { photo } = this.state
        return (
            <ScrollView>
                <TextInput label='Montant en €' keyboardType={'numeric'} underlineColorAndroid='transparent' style={styles.inputs} mode="outlined" value={this.state.montant}
                    onChangeText={montant => this.setState({ montant })}></TextInput>

                <CheckBox title="Train" checked={this.state.train} onPress={() => this.setState({ train: !this.state.train })} checkedColor="#adb8fa">
                </CheckBox>
                <CheckBox title="Avion" checked={this.state.avion} onPress={() => this.setState({ avion: !this.state.avion })} checkedColor="#adb8fa">
                </CheckBox>
                <CheckBox title="Voiture" checked={this.state.voiture} onPress={() => this.setState({ voiture: !this.state.voiture })} checkedColor="#adb8fa">
                </CheckBox>

                <Card title="Justificatif de frais" containerStyle={{borderColor: 'transparent', elevation : 0}}>
                    <View>
                        {photo && (
                            <Image
                                source={{ uri: photo.uri }}
                                style={{ width: '100%', height: 200, alignSelf: 'center', justifyContent: 'center' }}
                            />
                        )}
                    </View>
                    <Button icon={<Icon name="download" size={15} color="white" />} title="Choisir un fichier" onPress={this.handleChoosePhoto} buttonStyle={styles.uploadButton} />
                </Card>


                <Button title="Envoyer" buttonStyle={styles.confirmButton} />

            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
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

    },
    uploadButton: {
        width: 250,
        backgroundColor: '#222a5b',
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})