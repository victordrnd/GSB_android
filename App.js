import React from 'react';
import { Image, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './screens/HomeScreen';
import { FraisScreen } from './screens/FraisScreen';
import {LoginScreen} from './screens/LoginScreen'
import NavigationService from './services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { zoomIn} from 'react-navigation-transitions'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { RegisterScreen } from './screens/RegisterScreen';
import MyAccountScreen from './screens/account/MyAccountScreen';
import OfflineNotice from './components/OfflineNotice';
import ProfileScreen from './screens/account/ProfileScreen';
import MyFraisScreen from './screens/account/MyFraisScreen';
import FraisDetailsScreen from './screens/account/FraisDetailsScreen';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Frais: { screen: FraisScreen },
  Login : {screen : LoginScreen},
  Register : {screen : RegisterScreen},
  Account : {screen : MyAccountScreen},
  Profile : {screen : ProfileScreen},
  MyFrais : {screen : MyFraisScreen},
  FraisDetails : {screen : FraisDetailsScreen}
},
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#222a5b',
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'white',
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerTitle: <Image source={require('./assets/logo.png')} style={{ width: 40, height: 40 }} />,
      headerRight: <Icon name="user" size={20} color="white" style={{ elevation: 1,padding:20 }} onPress={() => NavigationService.navigate('Login', {})} />
    },
    headerLayoutPreset: 'center',
    transitionConfig: (nav) => zoomIn()
  });


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222a5b',
    accent: '#f1c40f',
    background : '#222a5b'
  },
};





const AppContainer = createAppContainer(MainNavigator);



export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        <OfflineNotice />
      </PaperProvider>
    )
  }
}
