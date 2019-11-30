import { ListItem, Text } from 'react-native-elements';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    View,
    ScrollView,
    RefreshControl,
    FlatList
} from 'react-native';
import NavigationService from '../services/NavigationService';
import FraisService from '../services/FraisService';
import { List, ActivityIndicator } from 'react-native-paper';
import Moment from 'react-moment';
import Loader from './Loader';





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

    state = {
        frais: [],
        refreshing: false
    }

    componentDidMount() {
        this.getMyFrais();
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
                {loading ? <Loader loading={loading} /> : <this.ListMenu list={this.state.frais}></this.ListMenu>}
            </ScrollView>

        )
    }

    ListMenu = (props) =>
        (
            <View>
                {
                    <FlatList
                        data={props.list}
                        renderItem={({ item, index }) => (
                            <View>
                                {
                                    checkDate(item.created_at, index) &&
                                    <Moment calendar={calendarStrings} style={{ fontFamily: "ProductSansBold" }} element={Text}>{item.created_at}</Moment>
                                }
                                <List.Item
                                    title={`Frais de ${item.type.libelle}`}
                                    description={`${item.status.libelle} - ${item.description}`}
                                    titleStyle={{ fontFamily: "ProductSansRegular" }}
                                    descriptionStyle={{ fontFamily: "ProductSansItalic" }}
                                    left={() => <LeftIcon type={item.status.libelle} />}
                                    right={() => <Text style={{ fontFamily: "ProductSansRegular", marginTop: 5 }}>+ {item.montant} EUR</Text>}
                                    onPress={() => NavigationService.navigate('FraisDetails', {
                                        frais: item,
                                        index: index,
                                        onUpdate: async (el, i) => {
                                            let frais = this.state.frais;
                                            frais[i] = el;
                                            await this.setState({ frais: frais });
                                        },
                                        onDelete: async (i) => {
                                            this.state.frais.splice(i,1);
                                            this.setState({frais : this.state.frais});
                                        }
                                    })}
                                />

                            </View>
                        )}
                        keyExtractor={(item: any) => item.id}
                    />
                }
            </View>
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