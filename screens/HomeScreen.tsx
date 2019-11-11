import * as React from 'react';
import { Text } from 'react-native-elements';
import { StatusBar, View, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
interface NavigationParams {
    my_param: string; // You can change "string" to what you are using
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
    navigation: Navigation;
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#222a5b',
        height: 100,
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 12
    }
});





export class HomeScreen extends React.Component<Props> {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>

                <StatusBar backgroundColor='#222a5b' barStyle='light-content'></StatusBar>

                    <View style={styles.headerView} >
                        <Text style={styles.title}>Accueil</Text>
                        <Text style={styles.subtitle}>Enregistrez vos frais Galaxy Swiss Bourdin</Text>
                    </View>
                    <Menu />
            </View>
        );
    }

}
