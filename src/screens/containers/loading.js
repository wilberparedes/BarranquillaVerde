import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
    Alert,
    PermissionsAndroid,
    BackHandler,
} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from 'react-native-geolocation-service';
// NOTIFICATION PUSH
import messaging from '@react-native-firebase/messaging';


import LoadingComponent from '../../sections/components/loading';

const Loading = ({navigation, dispatch, user, token}) => {
    
    let locationGranted = false;
    let locationEnabled = false

    const functionss = async () =>{
        console.log("hereee")
        
        messaging()
            .getToken()
            .then(token => {
                dispatch({
                    type: 'SET_UUID',
                    payload: {
                        uuid: token
                    }
                });
            });
        messaging().onTokenRefresh(token => {
            dispatch({
                type: 'SET_UUID',
                payload: {
                    uuid: token
                }
            });
        });
        await checkPermission();
        // await checkIfUserIsAlreadyLogged();
    }
    
    const checkPermission = async () =>{
        await checkLocationPermission()
        .then((resolve) => locationGranted = resolve)
        .catch((error) => BackHandler.exitApp());
    
        if (locationGranted){
            await checkLocationEnabled()
            .then((resolve) => locationEnabled = true)
            .catch((error) => locationEnabled = false);
            loopLocationEnabled();
        }
    }

    const checkLocationPermission = async () => {
        return new Promise(async(resolve, reject) => {
          try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED)
              resolve(true);
            else
              throw new Error('Rejected');
          } catch (error){
            reject(new Error(error));
          }
        });
    }

    const loopLocationEnabled = async () =>{
        if (locationEnabled){
            checkIfUserIsAlreadyLogged();
        }
        else {
            await checkLocationEnabled()
            .then((resolve) => {
                locationEnabled = true;
                checkIfUserIsAlreadyLogged();
            })
            .catch((error) => loopLocationEnabled());
        }
    }

    const checkLocationEnabled = async () => {
        return new Promise(async (resolve, reject)=> {
          if(Platform.OS === 'android'){
            await LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2 style='color: #0af13e'>No se pudo acceder a la ubicación</h2></br>Debes tener el GPS activado para usar esta app<br/></a>",
                ok: "Activar",
                cancel: "Cancelar",
                enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
                showDialog: true, // false => Opens the Location access page directly
                openLocationServices: true, // false => Directly catch method is called if location services are turned off
                preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
                preventBackClick: true , // true => To prevent the location services popup from closing when it is clicked back button
                providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
            }).then(function(success) {
                resolve(true);
            }).catch((error) => {
                reject(new Error(error));
            });
          }
        });
    }

    const checkIfUserIsAlreadyLogged = async () => {
        console.log("checkIfUserIsAlreadyLogged")
        await Geolocation.getCurrentPosition(
            async (position)  => {

                await dispatch({
                    type: 'SET_POSITION',
                    payload: {
                        location: position,
                    }
                })

                if(user){
                    if(token){
                        console.log('token sixxxxxxx')
                        navigation.navigate('App');
                    }else{
                        console.log('token no')
                        navigation.navigate('HomeAccess');
                    }
                }else{
                    console.log('user no')
                    navigation.navigate('HomeAccess');
                }
                
            },
            (error) => {
                console.log("error", error)
                if(error.code == 1){
                    // this.checkPermission();
                }else{
                    Alert.alert('Error de GPS', 'No se pudo obtener la ubicación del usuario.\nCódigo de error:' +error.code);
                    checkIfUserIsAlreadyLogged();
                }
            },
            { enableHighAccuracy: true, maximumAge: 15000, timeout: 10000  }
        )
    }
    
    useEffect(() => {
        console.log("---------------------------------------------")
        console.log("----------------------///////////////////////-----------------------")
        functionss();
        // return () => {
        // }
    }, [])
    
    return(
        <LoadingComponent />
    )

}

function mapStateToProps(state){
    return {
        token: state.user.token,
        user: state.user,
        dataAccess: state.user.dataUser,
    }
}


export default connect(mapStateToProps)(Loading);