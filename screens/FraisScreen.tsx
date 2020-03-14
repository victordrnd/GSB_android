import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import RestaurationForm from '../components/Form/RestaurationForm';
import DeplacementForm from '../components/Form/DeplacementForm';
import TeletravailForm from '../components/Form/TeletravailFrom';
import { ScrollView } from 'react-native-gesture-handler';
import TransportForm from '../components/Form/TransportForm';
import LogementForm from '../components/Form/LogementForm';

interface NavigationParams {
    name: any;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}



const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#7a62ff',
        height: 100,
        padding: 10,
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontFamily : "ProductSansBold"
    },
    subtitle: {
        color: '#fff',
        fontSize: 12,
        fontFamily : "ProductSansItalic"
    }
});

export class FraisScreen extends Component<Props> {



    render() {
        const name = this.props.navigation.getParam("name");
        let form;
        switch (name) {
            case "Restauration":
                form = <RestaurationForm></RestaurationForm>
                break;

            case "Grand déplacement":
                form = <DeplacementForm></DeplacementForm>
                break;
            case "Télétravail":
                form = <TeletravailForm></TeletravailForm>
                break;
            case "Transport":
                form = <TransportForm></TransportForm>
            case "Logement":
                form = <LogementForm></LogementForm>
            default:
                break;
        }
        return (
            <>
                <StatusBar backgroundColor='#7a62ff' barStyle='light-content'></StatusBar>

                <View style={styles.headerView}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>Remplissez la fiche de frais.</Text>
                </View>
                <View style={{flex:1, marginTop:-30, backgroundColor:"#fff",margin: -1, borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop : 50}}>
                    {form}
                </View>
            </>
        );
    }

}