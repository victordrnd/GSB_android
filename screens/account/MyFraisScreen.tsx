import { ListItem, Text, Divider } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather'
import { List } from 'react-native-paper';
import {
    View,
    Image,
    StatusBar,
    StyleSheet,
    ScrollView
} from 'react-native';
import ListFrais from '../../components/ListFrais';
import { NavigationState, NavigationScreenProp } from 'react-navigation';

interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}



export default class MyFraisScreen extends React.Component<Props> {
    constructor(props) {
        super(props);
    };


    render() {

        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Mes fiches de frais</Text>
                    <Text style={styles.subtitle}>Historique de vos déclaration</Text>

                    <View style={{ marginTop: 15 , marginBottom : 30}}>
                        <List.Section>
                            <ListFrais></ListFrais>
                        </List.Section>
                    </View>
                </View>
            </>
        )
    }




    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.otherParam : 'A Nested Details Screen',
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                backgroundColor: '#fff',
                shadowOffset: { width: 0, height: 0, },
                shadowColor: 'white',
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
            },
            headerTintColor: '#7a62ff',
            headerTitle: (
                <View style={{ backgroundColor: '#7a62ff', height: 50 }}>
                    <Image source={require('../../assets/logo.png')} style={{
                        width: 40, height: 40, marginTop: 5
                    }} />
                </View>
            ),
            headerRight: <Icon name="user" size={20} color="white" style={{ elevation: 1, padding: 20 }} />

        };
    };




}





const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontFamily: "ProductSansBold"
    },
    subtitle: {
        fontSize: 12,
        color: '#a3a3a3',
        fontFamily: "ProductSansItalic"
    },
    card: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0
    },
    inputs: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#7a62ff'
    },
    confirmButton: {
        backgroundColor: '#7a62ff',
        width: '100%',
        height: '100%',
        borderRadius: 0

    }
})


