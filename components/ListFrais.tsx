import { Text } from 'react-native-elements';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    View,
    FlatList
} from 'react-native';
import NavigationService from '../services/NavigationService';
import FraisService from '../services/FraisService';
import { List } from 'react-native-paper';
import Loader from './Loader';





const LeftIcon = (props) => {
    switch (props.type) {
        case "En attente":
            return (
                <WaitingIcon></WaitingIcon>
            )
        case "Validé":
            return (
                <ValidatedIcon></ValidatedIcon>
            )
        case "Refusé":
            return (
                <RefusedIcon></RefusedIcon>
            )
    }
}

const WaitingIcon = () => (
    <View style={{ backgroundColor: "#fbc02d", borderRadius: 100, width: 10, height: 10, marginVertical : 15 }}>
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

            <View style={{ minHeight: 200 }}>
                {loading ? <Loader loading={loading} /> : <this.ListMenu list={this.state.frais}></this.ListMenu>}
                <Text style={{ fontFamily: "ProductSansRegular", textAlign: "center", color: "#475ee9" }}>Aucune autre fiche de frais à afficher</Text>
                <Text style={{ fontFamily: "ProductSansRegular", textAlign: "center", color: "#475ee9" }}>Glissez vers le bas pour raffraichir <Icon name="arrow-up"></Icon></Text>
            </View>

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
                    <FlatList
                        data={props.list}
                        renderItem={this._renderItem}
                        keyExtractor={(item: any) => item.id}
                        removeClippedSubviews={true}
                        initialNumToRender={9}
                        legacyImplementation={true}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getMyFrais()}
                    />
        )



    _renderItem = ({item, index}) => {
        return (
            <View>
                {
                    checkDate(item.created_at, index) &&
                    <Text style={{ fontFamily: "ProductSansBold" }}>{lastDate}</Text>
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





let lastDate = new Date("2001-03-09").toLocaleDateString();
const checkDate = (date, i): boolean => {
    if (i == 0) {
        lastDate = new Date(date).toLocaleDateString();
        return true;
    }
    if (lastDate != new Date(date).toLocaleDateString()) {
        lastDate = new Date(date).toLocaleDateString();
        return true;
    }
    lastDate = new Date(date).toLocaleDateString()
    return false;
}