import React from 'react';
import { Image, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { Button, Text, Badge } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import FraisService from '../../services/FraisService';


interface NavigationParams {
    frais: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

export default class FraisDetailsScreen extends React.Component<Props> {
    frais: any;
    constructor(props) {
        super(props);
        this.frais = this.props.navigation.getParam('frais');
    }

    state = {
        buttonDisabled: false,
        inputDisabled: true,
        showContainer: true,
        frais: undefined,
        montant: 0,
        description: ''
    }

    componentDidMount() {
        if (this.frais.status.libelle != "En attente") {
            this.setState({ buttonDisabled: true })
        }
        this.setState({ montant: this.frais.montant, description: this.frais.description });
    }





    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
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

    onDelete = () => {
        Alert.alert(
            'Confirmez la suppression',
            'Etes vous sûr de vouloir supprimer cette demande de frais ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => FraisService.deleteMyFrais(this.frais.id, () => {
                        this.props.navigation.state.params.onGoBack();
                        this.props.navigation.goBack();
                    })
                },
            ],
            { cancelable: false },
        );
    }

    onEdit = () => {
        this.setState({ inputDisabled: false, showContainer: false });
    }

    onSubmit = () => {
        let obj = {
            ...this.frais,
            montant : this.state.montant,
            description : this.state.description
        }
        FraisService.updateFrais(obj, (frais) => {
            console.log(frais);
            this.setState({frais});
            this.setState({ inputDisabled: true, showContainer: true });
            this.props.navigation.state.params.onGoBack();
        });
    }


    render() {
        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Détails du frais #{this.frais.id}</Text>
                    <Text style={styles.subtitle}>Frais de {this.frais.type.libelle}</Text>

                    <View style={{ marginTop: 15 }}>
                        <View>
                            <LinearGradient style={{ marginTop: 40, height: 150, borderRadius: 8 }} colors={['#3e5be6', '#1f2650']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>

                                <Text style={{ color: 'white', padding: 20, fontFamily: "ProductSansRegular" }}>Statut de la déclaration :</Text>
                                <Text style={{ fontSize: 24, color: 'white', textAlign: 'center', fontFamily: "ProductSansRegular" }}>{this.state.montant} EUR</Text>
                                {/* <Text style={{ textAlign: 'center', color: '#fff' }}>{this.frais.status.libelle}</Text> */}
                                <Badge badgeStyle={{ backgroundColor: this.frais.status.color, padding: 10, borderWidth: 0 }} containerStyle={{ marginTop: 10 }} value={<Text style={{ fontFamily: "ProductSansRegular", color: "#fff" }}>Statut : {this.frais.status.libelle}</Text>} />
                            </LinearGradient>
                        </View>

                        <TextInput label="Montant en EUR" keyboardType={"decimal-pad"} style={styles.inputs} value={`${this.state.montant}`} disabled={this.state.inputDisabled}
                            onChangeText={montant => this.setState({ montant })} />
                        <TextInput label="Description" style={styles.inputs} value={this.state.description} disabled={this.state.inputDisabled}
                            onChangeText={description => this.setState({ description })} />
                        <TextInput label="Date de déclaration" style={styles.inputs} value={this.frais.created_at} disabled />
                    </View>


                </View>
                {
                    !this.state.showContainer &&
                    <Button title="Valider" buttonStyle={styles.confirmButton} titleStyle={{ fontFamily: "ProductSansBold" }} onPress={() => this.onSubmit()} />
                }


                {
                    this.state.showContainer &&
                    <View style={styles.leftContainer} >
                        <Button title="Modifier" buttonStyle={styles.editButton} disabled={this.state.buttonDisabled} icon={<Icon name="edit-3" color="white" size={16} style={{ marginRight: 8 }} />} onPress={() => this.onEdit()} />
                    </View>
                }
                {this.state.showContainer &&
                    <View style={styles.rightContainer}>
                        <Button title="Supprimer" buttonStyle={styles.deleteButton} disabled={this.state.buttonDisabled} icon={<Icon name="trash" color="white" size={16} style={{ marginLeft: 8 }} />} iconRight onPress={() => this.onDelete()} />
                    </View>
                }
            </>
        )
    }
}


let styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12,
        color: '#a3a3a3'
    },
    card: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0
    },
    editButton: {
        backgroundColor: '#455eee',
        width: '100%',
        height: '100%',
        borderRadius: 0
    },
    deleteButton: {
        backgroundColor: '#f44336',
        width: '100%',
        height: '100%',
        borderRadius: 0,
    },
    cardSummary: {
        backgroundColor: '#e8eaf6'
    },
    inputs: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#222a5b',
        fontFamily: "ProductSansRegular"
    },
    confirmButton: {
        backgroundColor: '#455eee',
        width: '80%',
        height: 45,
        borderRadius: 30,
        alignSelf: "center",
        marginTop: 50
    },
    leftContainer: { position: 'absolute', bottom: 0, height: 50, width: '50%' },
    rightContainer: { position: 'absolute', bottom: 0, left: '50%', height: 50, width: '50%' }

})
