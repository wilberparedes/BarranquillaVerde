import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Alert,
    PermissionsAndroid,
    BackHandler,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ImageBackground,
} from 'react-native';

import LoadingComponent from '../../sections/components/loading'

import { Colors, Metrics, StylesGeneral, Fonts, Functions } from '../../themes';

class Loading extends Component{
    
    componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'short_name',
        postal_code: 'short_name'

    };

    constructor(props){
        super(props);
        this.state = {
            localityDetails: [],
            locationGranted: false,
            locationEnabled: false,
        };
    }

    functionss(){
        this.checkIfUserIsAlreadyLogged();
        // this.props.navigation.navigate('HomeAccess');
        // Geocoder.init(API_KEY); // use a valid API key
    }
    
    async checkPermission(){
        await this.checkLocationPermission()
        .then((resolve) => this.setState({
            locationGranted: resolve,
        }))
        .catch((error) => BackHandler.exitApp());
    
        if (this.state.locationGranted === true){
            await this.checkLocationEnabled()
            .then((resolve) => this.setState({
                locationEnabled: true
            }))
            .catch((error) => this.setState({
                locationEnabled: false
            }));
            this.loopLocationEnabled();
        }
    }

    async checkLocationPermission() {
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

    async loopLocationEnabled(){
        if (this.state.locationEnabled){
            this.checkIfUserIsAlreadyLogged();
        }
        else {
            await this.checkLocationEnabled()
            .then((resolve) => {
                this.setState({
                    locationEnabled: true
                });
                this.checkIfUserIsAlreadyLogged();
            })
            .catch((error) => this.loopLocationEnabled());
        }
    }

    async checkLocationEnabled(){
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

    checkIfUserIsAlreadyLogged = () => {
        if(this.props.user){
            if(this.props.token){
                console.log('token si')
                this.props.navigation.navigate('App');
            }else{
                console.log('token no')
                this.props.navigation.navigate('HomeAccess');
            }
        }else{
            console.log('user no')
            this.props.navigation.navigate('HomeAccess');
        }
    }
    
    // add a focus listener onDidMount
    async componentDidMount () {
        this.functionss()
    }
    
    // and don't forget to remove the listener
    UNSAFE_componentWillUnmount () {
        this.focusListener.remove()
    }

    render(){
        return(
            <SafeAreaView style={[styles.safContainer, { backgroundColor: Colors.primary }]}>
               <LoadingComponent />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    safContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageBackground: {
        flex: 1,
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        alignContent: 'stretch',
        resizeMode: 'contain'
    }
});

function mapStateToProps(state){
    return {
        token: state.user.token,
        user: state.user,
        dataAccess: state.user.dataUser,
    }
}


export default connect(mapStateToProps)(Loading);