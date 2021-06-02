import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ImageBackground, Image, View, Text } from 'react-native';

import { connect } from  'react-redux';
import { Colors, Metrics, } from '../../themes';

// import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashComponents from '../components/SplashComponents';


const SplashScreen = ({navigation, tokenData}) => {

    useEffect(() => {
        console.log('SplashScreen');
        if(tokenData){
            setTimeout(() => {
                navigation.navigate('App')
            }, 3500);
        }else{
            setTimeout(() => {
                navigation.navigate('HomeAccess')
            }, 3500);
        }
    }, [])
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         permission: false,
    //         permissionGPS: falser
    //     };
    // }

    // async componentDidMount(){
        // await this.statePermissioGPS();
        // const cpermission = await AsyncStorage.getItem('@permission');
        // if(cpermission == 'no'){
        //     if(this.state.permissionGPS){
        //         AsyncStorage.setItem('@permission', 'si');
        //         // this.props.navigation.navigate('Loading');
        // this.props.navigation.navigate('App');
        //         this.props.navigation.dispatch(
        //             CommonActions.reset({
        //               index: 0,
        //               routes: [
        //                 {
        //                   name: 'Loading',
        //                   params: { user: 'init' },
        //                 },
        //               ],
        //             })
        //         );
        //     }else{
        //         AsyncStorage.setItem('@permission', 'no');
        //         this.props.navigation.navigate('SliderPermission');
        //     }
        // }else{
        //     if(this.state.permissionGPS){
        //         AsyncStorage.setItem('@permission', 'si');
        //         // this.props.navigation.navigate('Loading');
        //         this.props.navigation.dispatch(
        //             CommonActions.reset({
        //               index: 0,
        //               routes: [
        //                 {
        //                   name: 'Loading',
        //                   params: { user: 'init' },
        //                 },
        //               ],
        //             })
        //         );
        //     }else{
        //         AsyncStorage.setItem('@permission', 'no');
        //         this.props.navigation.navigate('SliderPermission');
        //     }
        // }
    // }

    // async statePermissioGPS(){
    //     const locationPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS;
    //     check(locationPermission)
    //     .then((result) =>{
    //         switch (result) {
    //             case RESULTS.DENIED:
    //                 this.setState({permissionGPS: false});
    //                 break;
    //             case RESULTS.GRANTED:
    //                 this.setState({permissionGPS: true});
    //                 break;
    //             case RESULTS.BLOCKED:
    //                 this.setState({permissionGPS: false});
    //                 break;
    //         }
    //     })
    //     .catch((error) =>{  this.setState({permissionGPS: false}); })
    // }

    return(
        <SplashComponents />
    )
}

const mapStateToProps = state => ({
    // allUser: state.user,
    // user: state.user.dataUser,
    tokenData: state.user.token
});

export default connect(mapStateToProps, null)(SplashScreen);