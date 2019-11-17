import { ListItem } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    ScrollView,
    Image,
    StatusBar,
    StyleSheet,
    Text
} from 'react-native';
import NavigationService from '../../services/NavigationService';
const list = [
    {
        name: 'Mes fiches de frais',
        subtitle: 'Gérez vos fiches de frais',
        icon: 'address-card',
        route : 'MyFrais'
    },
    {
        name: 'Mon Profil',
        subtitle: "Gérez votre profil",
        icon: 'user-cog',
        route: 'Profile'
    }
];

const ListMenu = () =>
    (
        <ScrollView>
            <View>
                {
                    list.map((l, i) => (
                        <ListItem
                            key={i}
                            title={l.name}
                            leftAvatar={<Icon name={l.icon} size={20} color="#adb8fa" />}
                            titleStyle={{ color: 'black', fontWeight: 'bold' }}
                            chevron={<Icon name="chevron-right" size={15} color="grey" />}
                            subtitle={l.subtitle}
                            style={{ marginVertical: 15 }}
                            onPress={() => NavigationService.navigate(l.route, {})}
                        />
                    ))
                }
            </View>
        </ScrollView>
    )


export default class MyAccountScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
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

    render() {
        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Mon Compte & Activité</Text>
                    <Text style={styles.subtitle}>Accédez à vos déclarations de frais</Text>

                    <LinearGradient style={{ marginTop: 40, height: 150, borderRadius: 8 }} colors={['#3e5be6', '#1f2650']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>

                        <Text style={{ color: 'white', padding: 20, fontWeight: '500' }}>Résumé de votre activité :</Text>
                        <Text style={{ fontSize: 34, color: 'white', textAlign: 'center' }}>50€ <Text style={{ fontSize: 17 }}>En attente</Text></Text>
                    </LinearGradient>
                    <View style={{ marginTop: 15 }}>
                        <ListMenu></ListMenu>
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
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
    }
})