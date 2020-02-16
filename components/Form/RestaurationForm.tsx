import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import FraisService from '../../services/FraisService';
import NavigationService from '../../services/NavigationService';
import Loader from '../Loader';
import ImageView from 'react-native-image-view';

export default class RestaurationForm extends React.PureComponent {

    state = {
        montant: '',
        description: '',
        photo_url: null,
        loading: false,
        isImageViewVisible: false
    }

    validate() {
        let { montant, photo_url, description } = this.state;
        if (montant != '' && photo_url != null && description != '') {
            return true;
        }
        return false;
    }

    handleChoosePhoto = () => {
        NavigationService.navigate('Scanner', {
            onScanned : (photo) => {
                this.setState({photo_url : photo });
            }
        })
    }

    async saveFrais() {
        if (this.validate()) {
            this.setState({ loading: true });
            let obj = {
                montant: this.state.montant,
                description: this.state.description,
                photo: this.state.photo_url.uri,
                type_id: 1
            };
            await FraisService.create(obj, () => {
                this.setState({ loading: false });
                NavigationService.navigate('MyFrais', {});
            })
        } else {
            alert('Certains champs sont manquants ou incorrectement remplis');
        }

    }

    render() {
        const photo = this.state.photo_url
        return (
            <>
                <ScrollView>
                    <Loader
                        loading={this.state.loading} />
                    <Card containerStyle={{ borderColor: 'transparent', elevation: 0 }}>

                        <Input label='Montant en €' keyboardType={'numeric'} underlineColorAndroid='transparent' style={styles.inputs} value={this.state.montant} labelStyle={{ fontWeight: "normal" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={montant => this.setState({ montant })}
                            leftIcon={<Icon name='credit-card' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                        <Input label="Nom de l'établissement" keyboardType={'default'} underlineColorAndroid='transparent' style={styles.inputs} value={this.state.description} labelStyle={{ fontWeight: "normal" }} containerStyle={{ marginVertical: 10 }}
                            onChangeText={description => this.setState({ description })}
                            leftIcon={<Icon name='hash' size={24} color='grey' style={{ marginLeft: -15 }} />}></Input>

                    </Card>
                    <Card title="Justificatif de frais" containerStyle={{ borderColor: 'transparent', elevation: 0 }}>

                        <View>
                            {photo && (
                                <>
                                    <TouchableOpacity onPress={() => this.setState({ isImageViewVisible: true })}>
                                        <Image source={{ uri: photo.data.croppedImage }} style={{ width: "100%", height: 200 }}></Image>
                                    </TouchableOpacity>
                                    <ImageView
                                        images={[{ source: {uri : photo.data.croppedImage } }]}
                                        imageIndex={0}
                                        isVisible={this.state.isImageViewVisible}
                                        onClose={() => this.setState({ isImageViewVisible: false })}
                                        isPinchZoomEnabled={false}
                                    />
                                </>
                            )}
                        </View>
                        <Button icon={<Icon name="camera" size={15} color="white" style={{marginHorizontal : 5, marginVertical : 8}}/>} title="Prendre une photo" onPress={this.handleChoosePhoto} buttonStyle={styles.uploadButton} />
                    </Card>



                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, height: 50, width: '100%' }}>

                    <Button title="Envoyer" buttonStyle={styles.confirmButton} onPress={() => this.saveFrais()} />
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
        width: '100%',
        height: '100%',
        borderRadius: 0
    },
    uploadButton: {
        width: 250,
        backgroundColor: '#455eee',
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})