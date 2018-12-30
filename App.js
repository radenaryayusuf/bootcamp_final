import { createStackNavigator, createAppContainer, createBottomTabNavigator, TabBarBottom } from 'react-navigation'
import { LoginScreen, ProfileScreen, RegisterScreen, SearchScreen, NewHome, VideoScreen, WelcomeScreen,Parallax, listProduct,bill,cart,loginShop } from './app/screen'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import OneSignal from 'react-native-onesignal'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const bottomNavigator = createBottomTabNavigator(
    {
        Home: { screen: NewHome },
        SearchPage: { screen: SearchScreen },
        UserPage: { screen: ProfileScreen }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home-outline`;
                } else if (routeName === 'SearchPage') {
                    iconName = `compass-outline`;
                } else if (routeName === 'UserPage') {
                    iconName = `playlist-plus`;
                }

                return <MaterialIcon name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#E84393',
            inactiveTintColor: '#444444',
            showLabel: false,
            style: {
                backgroundColor: '#101010'
            }
        },
        animationEnabled: false,
        swipeEnabled: true,
    }
);

const RootSctack = createStackNavigator(
    {
        Home: {
            screen: bottomNavigator,
            navigationOptions: {
                header: null
            }
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        WelcomeScreen: {
            screen: WelcomeScreen,
            navigationOptions: {
                header: null
            }
        },
        SearchScreen: {
            screen: SearchScreen,
            navigationOptions: {
                header: null
            }
        },
        VideoScreen: {
            screen: VideoScreen,
            navigationOptions: {
                header: null
            }
        },
        Parallax:{
            screen:Parallax,
            navigationOptions: {
                header: null
            }
        },
        listProduct:{
            screen:listProduct,
            navigationOptions: {
                header: null
            }
        },
        cart:{
            screen:cart,
            navigationOptions: {
                header: null
            }
        },
        bill:{
            screen:bill,
            navigationOptions: {
                header: null
            }
        },
        loginShop:{
            screen:loginShop,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'loginShop'
    }
)

const AppContainer  = createAppContainer(RootSctack);
export default class App extends React.Component {
    constructor(properties) {
        super(properties);
        OneSignal.init("07d03c16-6f65-4330-8bad-4194b81483cb");
    
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        this.state = {
            player_id:''
        }
      }
    
    //   componentDidMount(){
    //     OneSignal.getUserId(function(id){console.log(id)});
    //   }
      componentWillUnmount() {
          
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
      }
      componentWillMount() {
        OneSignal.init("07d03c16-6f65-4330-8bad-4194b81483cb");

          OneSignal.configure();
          OneSignal.addEventListener('received', this.onReceived.bind(this));
          OneSignal.addEventListener('opened', this.onOpened.bind(this));
          OneSignal.addEventListener('ids', this.onIds.bind(this));
          
      }
    
      onReceived(notification) {
        console.log("Notification received: ", notification);
      }
    
      onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
      }
    
      onIds(device) {
        console.log('Device info: ', device);
        this.setState({
            player_id: device.userId,
          })
       console.log(this.state.player_id);
      }
  
  
    render() {
       
      
      return(
  < AppContainer />
  
      )
      
   
  
    }
  }