import * as React from 'react';
import { Text } from 'react-native-elements';
import { StatusBar, View, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
interface NavigationParams {
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#7a62ff',
        height: 100,
        padding: 10
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontFamily : "ProductSansBold"
        //fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
        //fontStyle: 'italic',
        fontSize: 12,
        fontFamily : "ProductSansItalic"
    }
});





export class HomeScreen extends React.Component<Props> {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>

                <StatusBar backgroundColor='#7a62ff' barStyle='light-content'></StatusBar>

                <View style={styles.headerView} >
                    <Text style={styles.title}>Accueil</Text>
                    <Text style={styles.subtitle}>Enregistrez vos frais Galaxy Swiss Bourdin</Text>
                </View>
                <View style={{marginTop : -30, margin: -1, borderTopLeftRadius: 25, borderTopRightRadius: 25 , backgroundColor : "#fff"}}>

                    <Menu />
                </View>
            </View>
        );
    }

}
