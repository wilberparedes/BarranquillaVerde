import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ImageBackground, Image, View, Text } from 'react-native';

import { connect } from  'react-redux';
import { Colors, Metrics, } from '../../themes';

import { CommonActions } from '@react-navigation/native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashComponents from '../components/SplashComponents';


const SplashScreen = ({navigation, tokenData}) => {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         permission: false,
    //         permissionGPS: falser
    //     };
    // }
    const [permission, setPermission] = useState(false)
    let permissionGPS = false;
    let permissionWrite = false;
    let permissionCamera = false;

    useEffect( () => {
        console.log('SplashScreen');
        compPermission();
    }, [])

    const compPermission = async () => {
        await statePermissioGPS();
        await statePermissioStorage();
        await statePermissioCamera();

        const cpermission = await AsyncStorage.getItem('@permission');
        console.log(cpermission, permissionGPS , permissionWrite , permissionCamera)
        if(cpermission == 'no'){
            if(permissionGPS && permissionWrite && permissionCamera){
                AsyncStorage.setItem('@permission', 'si');
                // setTimeout(() => {
                    // navigation.navigate('Loading')
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                            {
                                name: 'Loading'
                            }
                            ]
                        })
                    );
                // }, 3500);
            }else{
                AsyncStorage.setItem('@permission', 'no');
                navigation.navigate('SliderPermission')
            }
        }else{
            if(permissionGPS && permissionWrite && permissionCamera){
                AsyncStorage.setItem('@permission', 'si');
                // setTimeout(() => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                        {
                            name: 'Loading'
                        }
                        ]
                    })
                );
                    // navigation.navigate('Loading')
                // }, 3500);
            }else{
                AsyncStorage.setItem('@permission', 'no');
                navigation.navigate('SliderPermission')
            }
        }
    }

    
    const statePermissioGPS = async () => {
        const locationPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS;
        await check(locationPermission)
            .then(async (result) =>{
                switch (result) {
                    case RESULTS.DENIED:
                        permissionGPS = false
                        // await setPermissionGPS(false)
                        break;
                    case RESULTS.GRANTED:
                        permissionGPS = true
                        // await setPermissionGPS(true)
                        break;
                    case RESULTS.BLOCKED:
                        permissionGPS = false
                        // await setPermissionGPS(false)
                        break;
                }
            })
            .catch(async (error) =>{  
                permissionGPS = false
                // await setPermissionGPS(false) 
            })
    }

    const statePermissioStorage = async () =>{
        const storagePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        await check(storagePermission)
            .then(async (result) =>{
                switch (result) {
                    case RESULTS.DENIED:
                        permissionWrite = false;
                        // await setPermissionWrite(false)
                        break;
                    case RESULTS.GRANTED:
                        // await setPermissionWrite(true)
                        permissionWrite = true;
                        break;
                    case RESULTS.BLOCKED:
                        permissionWrite = false;
                        // await setPermissionWrite(false)
                        break;
                }
            })
            .catch( async (error) =>{ 
                // await setPermissionWrite(false) 
                permissionWrite = false;
            })
    }

    const statePermissioCamera = async () => {
        const cameraPermission = PERMISSIONS.ANDROID.CAMERA;
        await check(cameraPermission)
            .then(async (result) => {
                switch (result) {
                    case RESULTS.DENIED:
                        // await setPermissionCamera(false)
                        permissionCamera = false;
                        break;
                    case RESULTS.GRANTED:
                        permissionCamera = true;
                        // await setPermissionCamera(true)
                        break;
                    case RESULTS.BLOCKED:
                        permissionCamera = false;
                        // await setPermissionCamera(false)
                        break;
                }
            })
            .catch(async (error) => {
                permissionCamera = false;
                // await setPermissionCamera(false)
            });
    }

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