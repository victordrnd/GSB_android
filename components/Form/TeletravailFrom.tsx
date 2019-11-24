import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    View,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'



export default class TeletravailForm extends React.PureComponent {

    state = {
        montant: '',
        description: '',
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
                <ScrollView>
                    <Input label='Montant en €' keyboardType={'numeric'} style={styles.inputs} value={this.state.montant} leftIcon={<Icon name='credit-card' size={24} color='grey' style={{marginLeft : -15}}/>}
                        onChangeText={montant => this.setState({ montant })} labelStyle={{ fontWeight: "normal" }} containerStyle={{ marginVertical: 10 }}></Input>

                    <Input label="Description" multiline numberOfLines={4} keyboardType={'default'} style={styles.inputs} value={this.state.description}
                        onChangeText={description => this.setState({ description })} labelStyle={{ fontWeight: "normal" }} containerStyle={{ marginVertical: 10 }}></Input>

                    <Card title="Justificatif de frais" containerStyle={{ borderColor: 'transparent', elevation: 0 }}>
                        <Button icon={<Icon name="download" size={15} color="white" />} title="Choisir un fichier" onPress={this.handleChoosePhoto} buttonStyle={styles.uploadButton} />
                        <View>
                            {photo && (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: '100%', height: 200, alignSelf: 'center', justifyContent: 'center' }}
                                />
                            )}
                        </View>
                    </Card>




                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '100%' }}>

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
        borderColor: '#455eee'
    },
    confirmButton: {
        backgroundColor: '#455eee',
        width:'100%',
        height:'100%',
        borderRadius:0
    },
    uploadButton: {
        width: 250,
        backgroundColor: '#455eee',
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})