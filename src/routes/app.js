import * as React from 'react';
import { Linking } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import { App1, SplashScreen, SliderPermission, Loading, HomeAccess, Login, Register, HomeApp } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import SplashComponents from '../screens/components/SplashComponents';

// import DrawerContent from '../screens/components/DrawerContent';


// const Drawer = createDrawerNavigator();
// function MyDrawer(props) {
//   return(
//       <Drawer.Navigator
//         initialRouteName="Home"
//         drawerContent={props => <DrawerContent {...props} />}
//         drawerPosition={'left'}
//         >
//         <Drawer.Screen name="Home" component={Home} />
//       </Drawer.Navigator>
//   );
// }


  const stackApp = createStackNavigator();
  const MenuStackApp = () => (
    <stackApp.Navigator initialRouteName="HomeApp" headerMode="none">
      <Stack.Screen name="HomeApp" component={HomeApp} />
      <stackApp.Screen 
        name="Home" 
        component={App1} //MyDrawer
        />
    </stackApp.Navigator>
    );

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const AppStack = ({user, tokenData, allUser}) => {

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  let [token, setToken] = React.useState(null);
  const getToken = async () => {
    token = tokenData;
    setToken(token);
  };

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      restoreState();
    }
    //FIN PERSIST NAVIGATION
    if (tokenData) {
      getToken();
    }

  }, [isReady, getToken, user, tokenData]);

  if (!isReady) {
    return null;
  }

  return(
      
      <NavigationContainer
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }>
        <Stack.Navigator headerMode="none" initialRouteName="SplashScreen"> 
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Loading" component={Loading} />

          {tokenData ? (
            <Stack.Screen 
              name="App" 
              component={MenuStackApp} 
              />
          ) : (
            <>
              <Stack.Screen name="HomeAccess" component={HomeAccess} />
              <Stack.Screen name="SliderPermission" component={SliderPermission} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
          
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  allUser: state.user,
  user: state.user.dataUser,
  tokenData: state.user.token
});
export default connect( mapStateToProps, null )(AppStack);