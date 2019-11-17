import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Card } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'



export default class RestaurationForm extends React.PureComponent {

    state = {
        montant: '',
        nom: '',
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
            <>
                <View>
                    <TextInput label='Montant en €' keyboardType={'numeric'} underlineColorAndroid='transparent' style={styles.inputs} mode="outlined" value={this.state.montant}
                        onChangeText={montant => this.setState({ montant })}></TextInput>

                    <TextInput label="Nom de l'établissement" keyboardType={'default'} underlineColorAndroid='transparent' style={styles.inputs} mode="outlined" value={this.state.nom}
                        onChangeText={nom => this.setState({ nom })}></TextInput>

                    <Card title="Justificatif de frais" containerStyle={{ borderColor: 'transparent', elevation: 0 }}>

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



                </View>
                <View style={{position: 'absolute', bottom:0,height:50,  width:'100%'}}>

                    <Button title="Envoyer" buttonStyle={styles.confirmButton} />
                </View>
            </>
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
        backgroundColor: '#455eee',
        width:'100%',
        height:'100%',
        borderRadius:0
    },
    uploadButton: {
        width: 250,
        backgroundColor: '#222a5b',
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})