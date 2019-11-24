import { ListItem, Text, Divider } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather'
import { List } from 'react-native-paper';
import {
    View,
    ScrollView,
    Image,
    StatusBar,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';
import NavigationService from '../../services/NavigationService';



const AnimatedIcon = Animated.createAnimatedComponent(Icon);


export default class MyFraisScreen extends React.Component {
    spinValue;
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.spin()
    }
    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
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
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <>
                <StatusBar backgroundColor='#fff' barStyle="dark-content"></StatusBar>
                <View style={{ marginHorizontal: 15 }}>
                    <Text style={styles.title}>Mes fiches de frais</Text>
                    <Text style={styles.subtitle}>Historique de vos déclaration</Text>

                    <View style={{ marginTop: 15 }}>
                        <List.Section>
                            <Text>17 nov. 2019</Text>
                            <List.Item
                                title="Frais de déplacement"
                                description="En cours de vérification"
                                left={() => <Animated.View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50, transform: [{ rotate: spin }] }}>
                                    <Icon name="loader" size={25} color="#fbc02d" style={{ marginTop: 12, alignSelf: 'center' }} />
                                </Animated.View>
                                }
                                right={() => <Text style={{}}>+ 50,00 EUR</Text>}
                                onPress={()=>NavigationService.navigate('FraisDetails', {id : 1})}
                            />
                            <Text>4 nov. 2019</Text>
                            <List.Item
                                title="Frais de restauration"
                                description="Validé"
                                left={() => <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50 }}>
                                    <Icon name="check" size={25} color="#7cb342" style={{ marginTop: 12, alignSelf: 'center' }} />
                                </View>
                                }
                                right={() => <Text style={{}}>+ 8,00 EUR</Text>}
                            />
                            <Text>12 oct. 2019</Text>
                            <List.Item
                                title="Frais de déplacement"
                                description="Validé"
                                left={() => <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50 }}>
                                    <Icon name="check" size={25} color="#7cb342" style={{ marginTop: 12, alignSelf: 'center' }} />
                                </View>
                                }
                                right={() => <Text style={{}}>+ 50,00 EUR</Text>}
                            />
                            <Text>6 oct. 2019</Text>
                            <List.Item
                                title="Frais de restauration"
                                description="Refusé"
                                left={() => <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50 }}>
                                    <Icon name="x" size={25} color="#e53935" style={{ marginTop: 12, alignSelf: 'center' }} />
                                </View>
                                }
                                right={() => <Text style={{}}>+ 13,00 EUR</Text>}
                            />
                            <List.Item
                                title="Frais de déplacement"
                                description="Validé"
                                left={() => <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50 }}>
                                    <Icon name="check" size={25} color="#7cb342" style={{ marginTop: 12, alignSelf: 'center' }} />
                                </View>
                                }
                                right={() => <Text style={{}}>+ 150,00 EUR</Text>}
                            />
                        </List.Section>
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
    },
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
})