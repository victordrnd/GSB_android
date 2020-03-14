import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { ContributionGraph } from "react-native-chart-kit";
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FraisService from '../../services/FraisService';
import NavigationService from '../../services/NavigationService';
import UserService from '../../services/UserService';


const list = [
    {
        name: 'Mes fiches de frais',
        subtitle: 'Gérez vos fiches de frais',
        icon: 'address-card',
        route: 'MyFrais'
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
                            leftAvatar={<Icon name={l.icon} size={20} color="#7a62ff" />}
                            titleStyle={{ color: 'black', fontFamily : "ProductSansBold" }}
                            subtitleStyle={{fontFamily : "ProductSansItalic"}}
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
            headerTintColor: '#7a62ff', 
            headerTitle: (
                <View style={{ backgroundColor: '#7a62ff', height: 50 }}>
                    <Image source={require('../../assets/logo.png')} style={{
                        width: 40, height: 40, marginTop: 5
                    }} />
                </View>
            ),
            headerRight: <Icon name="power-off" size={20} color="#7a62ff" style={{ elevation: 1, padding: 20 }} onPress={() => {
                Alert.alert(
                    'Déconnexion',
                    'Etes vous sûr de vouloir vous déconnecter ?',
                    [
                        {
                            text: 'Annuler',
                            onPress: () => { },
                            style: 'cancel',
                        },
                        {
                            text: 'OK', onPress: () => {UserService.purgeAuth(); NavigationService.navigate('Login', {})}
                        },
                    ],
                    { cancelable: false },
                );
            }}/>
        };
    };




    state = {
        commitsData : []
    }


    componentDidMount(){
        FraisService.getMyFraisByDate((data) => {
            this.setState({commitsData : data});
        });
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Mon Compte & Activité</Text>
                    <Text style={styles.subtitle}>Accédez à vos déclarations de frais</Text>
                    <View style={{marginTop : 40}}>
                        <ContributionGraph values={this.state.commitsData} endDate={new Date()}
                            numDays={105} width={Dimensions.get('window').width - 30} height={220} chartConfig={chartConfig} />
                    </View>
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
        //fontWeight: 'bold',
        fontFamily : "ProductSansBold"
    },
    subtitle: {
        fontSize: 12,
        color: '#a3a3a3',
        fontFamily : "ProductSansItalic"
    },
    card: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0
    }
})


const chartConfig =
{
    backgroundColor: "#7a62ff",
    backgroundGradientFrom: "#7a62ff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 3, // optional, defaults to 2dp
    color: (opacity = 0.6) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 0.6) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 8,
        marginTop: 40
    },
}