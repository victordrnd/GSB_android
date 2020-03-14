import { ListItem } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    ScrollView
} from 'react-native';
import NavigationService from '../services/NavigationService';


const list = [
    {
        name: 'Restauration',
        subtitle: 'Frais de restauration',
        icon: 'utensils',
    },
    {
        name: 'Grand déplacement',
        subtitle: "Frais de voyage à l'étranger",
        icon: 'plane-departure',
    },
    {
        name: 'Télétravail',
        subtitle: 'Frais de télétravail',
        icon: 'headset',
    },
    {
        name: 'Transport',
        subtitle: 'Frais de transport',
        icon: 'bus-alt'
    },
    {
        name: 'Logement',
        subtitle: 'Frais de logement',
        icon: 'bed'
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
                            chevron={<Icon name="chevron-right" size={15} color="grey" />}
                            subtitle={l.subtitle}
                            subtitleStyle={{fontFamily : "ProductSansItalic"}}
                            style={{ marginVertical: 15 }}
                            onPress={() => NavigationService.navigate('Frais', { name: l.name })}
                        />
                    ))
                }
            </View>
        </ScrollView>
    )


  export default class Menu extends React.Component {

    
    render() {
        
        return (

            <View>
                <ListMenu></ListMenu>
            </View>

        )
    }
}
