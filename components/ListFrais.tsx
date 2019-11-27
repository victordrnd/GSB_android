import { ListItem, Text } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import NavigationService from '../services/NavigationService';
import FraisService from '../services/FraisService';
import { List, ActivityIndicator } from 'react-native-paper';
import Moment from 'react-moment';
import { NavigationScreenProp, NavigationState } from 'react-navigation';






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
    <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 25, height: 25 }}>
        <Icon name="check" size={25} color="#475ee9" style={{ marginTop: 12 }} />
    </View>
)

const RefusedIcon = () => (
    <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 25, height: 25 }}>
        <Icon name="x" size={25} color="#e53935" style={{ marginTop: 12 }} />
    </View>
)

export default class ListFrais extends React.Component {
    count: any;

    constructor(props) {
        super(props);
    }

    state = {
        frais: [],
        refreshing: false
    }

    async componentDidMount() {
        await this.getMyFrais();
    }
    

    async getMyFrais() {
        FraisService.getMyFrais(async (frais) => {
            await this.setState({ frais });
        });
    }


    render() {
        let loading = this.state.frais.length == 0;
        return (

            <ScrollView refreshControl={
                <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.getMyFrais.bind(this)}
                />
            }>
                {loading ? <ActivityIndicator color="#475ee9" size={50}></ActivityIndicator> : <this.ListMenu list={this.state.frais}></this.ListMenu>}
            </ScrollView>

        )
    }

    ListMenu = (props) =>
        (
            <ScrollView >
                <View>
                    {
                        props.list.map((l, i) => (
                            <View key={i}>
                                {
                                    checkDate(l.created_at, i) &&
                                    <Moment calendar={calendarStrings} style={{ fontFamily: "ProductSansBold" }} element={Text}>{l.created_at}</Moment>
                                }
                                <List.Item
                                    title={`Frais de ${l.type.libelle}`}
                                    description={`${l.status.libelle} - ${l.description}`}
                                    titleStyle={{ fontFamily: "ProductSansRegular" }}
                                    descriptionStyle={{ fontFamily: "ProductSansItalic" }}
                                    left={() => <LeftIcon type={l.status.libelle} />}
                                    right={() => <Text style={{ fontFamily: "ProductSansRegular", marginTop: 5 }}>+ {l.montant} EUR</Text>}
                                    onPress={() => NavigationService.navigate('FraisDetails', {
                                        frais: l, onGoBack: async () => {
                                            await FraisService.getMyFrais((frais) => {
                                                this.setState({ frais });
                                            });
                                        }
                                    })}
                                />
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
}

const calendarStrings = {
    lastDay: '[Hier à] HH:mm',
    sameDay: "[Aujourd'hui à] HH:mm",
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
};




let lastDate = new Date("2001-03-09").getDate();


const checkDate = (date, i): boolean => {
    if (i == 0) {
        lastDate = new Date(date).getDate();
        return true;
    }
    if (lastDate != new Date(date).getDate()) {
        lastDate = new Date(date).getDate();
        return true;
    }
    lastDate = new Date(date).getDate()
    return false;
}