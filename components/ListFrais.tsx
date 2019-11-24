import { ListItem, Text } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    ScrollView
} from 'react-native';
import NavigationService from '../services/NavigationService';
import FraisService from '../services/FraisService';
import { List, ActivityIndicator } from 'react-native-paper';
import { load } from 'jsdom/lib/jsdom/browser/resource-loader';



const ListMenu = (props) =>
    (
        <ScrollView>
            <View>
                {
                    props.list.map((l, i) => (
                        <View key={i}>
                            {/* <Moment locale="fr" calendar={calendarStrings} element={Text}>{l.created_at}</Moment> */}
                            <List.Item
                                title={`Frais de ${l.type.libelle}`}
                                description={`${l.status.libelle} - ${l.description}`}
                                left={() => <LeftIcon type={l.status.libelle} />}
                                right={() => <Text>+ {l.montant} EUR</Text>}
                                onPress={() => NavigationService.navigate('FraisDetails', { id: l.id })}
                            />
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )

const LeftIcon = (props) => {
    switch (props.type) {
        case "En attente":
            return (
                <ActivityIndicator size={25} color={"#fbc02d"} />
            )
            break;
        case "Validé":
            return (
                <ValidatedIcon></ValidatedIcon>
            )
            break;
        case "Refusé":
            return (
                <RefusedIcon></RefusedIcon>
            )
            break;
        default:
            return null;
            break;

    }
}


const ValidatedIcon = () => (
    <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50 }}>
        <Icon name="check" size={25} color="#7cb342" style={{ marginTop: 12, alignSelf: 'center' }} />
    </View>
)

const RefusedIcon = () => (
    <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 50, height: 50 }}>
        <Icon name="x" size={25} color="#e53935" style={{ marginTop: 12, alignSelf: 'center' }} />
    </View>
)

export default class ListFrais extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        frais: []
    }

    componentDidMount() {
        FraisService.getMyFrais(async (frais) => {
            await this.setState({ frais });
        });
    }


    render() {
        let loading = this.state.frais.length == 0;
        return (

            <ScrollView>
                {loading ? <ActivityIndicator color="#475ee9" size={50}></ActivityIndicator> : <ListMenu list={this.state.frais}></ListMenu> }
            </ScrollView>

        )
    }
}
