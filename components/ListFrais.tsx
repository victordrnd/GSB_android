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
                <WaitingIcon></WaitingIcon>
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
    }
}

const WaitingIcon = () => (
    <View style={{ backgroundColor: "transparent", borderRadius: 100, width: 25, height: 25 }}>
        <Icon name="refresh-cw" size={25} color="#fbc02d" style={{ marginTop: 12 }} />
    </View>
)

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
        refreshing: false,
        loading: true
    }

    componentDidMount() {
        this.getMyFrais();
    }


    getMyFrais() {
        FraisService.getMyFrais((frais) => {
            this.setState({ frais: frais, loading: false });
        });
    }


    render() {
        let { loading } = this.state
        return (

            <ScrollView style={{ minHeight: 200 }} refreshControl={
                <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.getMyFrais.bind(this)}
                    colors={["#475ee9"]}
                />
            }>
                {loading ? <Loader loading={loading} /> : <this.ListMenu list={this.state.frais}></this.ListMenu>}
                <Text style={{ fontFamily: "ProductSansRegular", textAlign: "center", color: "#475ee9" }}>Aucune autre fiche de frais à afficher</Text>
                <Text style={{ fontFamily: "ProductSansRegular", textAlign: "center", color: "#475ee9" }}>Glissez vers le bas pour raffraichir <Icon name="arrow-up"></Icon></Text>
            </ScrollView>

        )
    }


    _onPress = (item, index) => NavigationService.navigate('FraisDetails', {
        frais: item,
        index: index,
        onUpdate: async (el, i) => {
            let frais = this.state.frais;
            frais[i] = el;
            await this.setState({ frais: frais });
        },
        onDelete: async (i) => {
            this.state.frais.splice(i, 1);
            this.setState({ frais: this.state.frais });
        }
    })


    ListMenu = (props) =>
        (
            <View>
                {
                    <FlatList
                        data={props.list}
                        renderItem={this._renderItem}
                        keyExtractor={(item: any) => item.id}
                        removeClippedSubviews={true}
                        initialNumToRender={9}
                        legacyImplementation={true}
                    />
                }
            </View>
        )



    _renderItem = ({item, index}) => {
        return (
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
                    onPress={() => this._onPress(item, index)}
                />

            </View>
        )
    }
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