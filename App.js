import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Transition } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';
import { fadeOut, zoomIn, fromRight, flipY, fromBottom } from 'react-navigation-transitions';
import OfflineNotice from './components/OfflineNotice';
import FraisDetailsScreen from './screens/account/FraisDetailsScreen';
import MyAccountScreen from './screens/account/MyAccountScreen';
import MyFraisScreen from './screens/account/MyFraisScreen';
import ProfileScreen from './screens/account/ProfileScreen';
import { AuthLoadingScreen } from './screens/AuthLoadingScreen';
import { FraisScreen } from './screens/FraisScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import NavigationService from './services/NavigationService';
import Service from './services/Service';
import UserService from './services/UserService';
import DocumentScan from './components/DocumentScan';
//TODO delete
// AsyncStorage.clear();
export default class App extends React.Component {
  async componentDidMount() {
    await AsyncStorage.getItem('@token').then(async (token) => {
      UserService.tokenSubject.next(token);
      Service.token = token;
      await UserService.populate();
      
    });
  }



  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        <OfflineNotice />
      </PaperProvider>
    )
  }
}




const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Frais: { screen: FraisScreen },
  Account: { screen: MyAccountScreen },
  Profile: { screen: ProfileScreen },
  MyFrais: { screen: MyFraisScreen },
  FraisDetails: { screen: FraisDetailsScreen },
  Scanner: { screen: DocumentScan }
},
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7a62ff',
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'white',
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerTitle: <Image source={require('./assets/logo.png')} style={{ width: 40, height: 40 }} />,
      headerRight: <Icon name="user" size={20} color="white" style={{ elevation: 1, padding: 20 }} onPress={async () => NavigationService.navigate('Account', {})} />
    },
    headerLayoutPreset: 'center',
    transitionConfig: (nav) => zoomIn()
  });

const AuthNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
},
  {
    headerMode: "none",
    transitionConfig: (nav) => flipY()
  })




const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222a5b',
    accent: '#f1c40f',
    background: '#222a5b'
  },
};




AppNavigator = createAppContainer(createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'AuthLoading',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }),
);

const AppContainer = createAppContainer(AppNavigator);
