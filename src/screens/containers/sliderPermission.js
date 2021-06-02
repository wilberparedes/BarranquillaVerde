import React, { Component } from 'react';
import {  
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    Alert,
    BackHandler,
    StatusBar
 } from 'react-native';

import { connect } from  'react-redux';
import { Colors, Metrics, StylesGeneral, Fonts, Functions } from '../../themes';

import {  
    Button,
} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import Swiper from 'react-native-swiper';

class SliderPermission extends Component{

    constructor(props){
        super(props);
        this.state = {
            permission: false,
            permissionGPS: false,
            permissionWrite: false,
            permissionCamera: false,
            indexSwiper: 0
        };      
        this.locationPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS;
        this.storagePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        this.cameraPermission = PERMISSIONS.ANDROID.CAMERA;
    }

    async componentDidMount(){
        await this.statePermissioGPS();
        await this.statePermissioStorage();
        await this.statePermissioCamera();
        const cpermission = await AsyncStorage.getItem('@permission');
        if(cpermission != 'no'){
            if(this.state.permissionGPS && this.state.permissionWrite && this.state.permissionCamera){
                AsyncStorage.setItem('@permission', 'si');
                this.props.navigation.navigate('Loading');
            }else{
                AsyncStorage.setItem('@permission', 'no');
                // this.props.navigation.navigate('SliderPermission');
            }
        }else{
            if(this.state.permissionGPS && this.state.permissionWrite && this.state.permissionCamera){
                AsyncStorage.setItem('@permission', 'si');
                this.props.navigation.navigate('Loading');
            }
        }
        this.setState({ 
            permission: cpermission  == 'no' ? false : true
        });
    }

    //PERMISOS
    checkPermissionStatus = (permission) => {
        check(permission)
        .then((result) =>{
            switch (result) {
                case RESULTS.DENIED:
                    this.requestPermission(permission);
                break;
                case RESULTS.GRANTED:
                    if(permission === this.locationPermission)
                        this.setState({permissionGPS: true, indexSwiper: 1});

                    else if(permission === this.storagePermission)
                        this.setState({permissionWrite: true, indexSwiper: 2});
                    
                    else if (permission === this.cameraPermission)
                        this.setState({permissionCamera: true, indexSwiper: 3})

                    if (this.state.permissionGPS === this.state.permissionWrite && this.state.permissionCamera === this.state.permissionGPS) {
                        this.setState({permission: true});
                    }
                break;
                case RESULTS.BLOCKED:
                    this.permissionErrorNotification();
                break;
            }
        })
        .catch((error) =>{ console.error('errorrrr', error)})
    }
        

    permissionErrorNotification = () => {
        Alert.alert(
            'Se necesitan permisos adicionales',
            'Barranquilla verde necesita acceder al almacenamiento, cámara y el GPS de tu dispositivo para funcionar, por favor concede los permisos para continuar usando la aplicación.',
            [
            {text: 'Entendido', onPress: () => BackHandler.exitApp()}
            ]
        );
    }

    requestPermission = (permission) => {
        request(permission)
        .then((result) => {
            switch (result) {
            case RESULTS.DENIED:
                // console.log('The permission has not been requested / is denied but requestable',);
                this.permissionErrorNotification();
                break;
            case RESULTS.GRANTED:
                if(permission === this.locationPermission)
                    this.setState({permissionGPS: true, indexSwiper: 1});
                else if(permission === this.storagePermission)
                    this.setState({permissionWrite: true, indexSwiper: 2});
                else if(permission === this.cameraPermission)
                    this.setState({permissionCamera: true})

                if(this.state.permissionGPS === this.state.permissionWrite && this.state.permissionCamera === this.state.permissionGPS){
                    this.setState({permission: true});
                }
                break;
            case RESULTS.BLOCKED:
                // console.log('The permission is denied and not requestable anymore');
                this.permissionErrorNotification();
                break;
            }
        })
        .catch((error) => {})
    }

    async statePermissioGPS(){
        const locationPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS;
        check(locationPermission)
        .then((result) =>{
            switch (result) {
                case RESULTS.DENIED:
                    this.setState({permissionGPS: false});
                    break;
                case RESULTS.GRANTED:
                    this.setState({permissionGPS: true, indexSwiper: 1});
                    break;
                case RESULTS.BLOCKED:
                    this.setState({permissionGPS: false});
                    break;
            }
        })
        .catch((error) =>{  this.setState({permissionGPS: false}); })
    }

    async statePermissioStorage(){
        const storagePermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        check(storagePermission)
        .then((result) =>{
            switch (result) {
            case RESULTS.DENIED:
                this.setState({permissionWrite: false});
                break;
            case RESULTS.GRANTED:
                this.setState({permissionWrite: true, indexSwiper: 2 });
                break;
            case RESULTS.BLOCKED:
                this.setState({permissionWrite: false});
                break;
            }
        })
        .catch((error) =>{ this.setState({permissionWrite: false}); })
    }

    async statePermissioCamera() {
        const cameraPermission = PERMISSIONS.ANDROID.CAMERA;
        check(cameraPermission)
          .then((result) => {
            switch (result) {
              case RESULTS.DENIED:
                this.setState({permissionCamera: false});
                break;
              case RESULTS.GRANTED:
                this.setState({permissionCamera: true});
                break;
              case RESULTS.BLOCKED:
                this.setState({permissionCamera: false});
                break;
            }
          })
          .catch((error) => {
            this.setState({permissionCamera: false});
          });
    }

    render(){

        return(
            <SafeAreaView style={[styles.safContainer, { backgroundColor: Colors.primary }]}>
                  <StatusBar barStyle="light-content" backgroundColor={Colors.primary}/>
                    <Swiper style={styles.wrapper} showsButtons={false} loop={false} index={this.state.indexSwiper}> 
                        <View style={styles.slide1}>
                            {/* <View style={styles.sliders}>
                                <Image 
                                    source={require('../../../assets/permission_gps.png')} 
                                    style={styles.logo}
                                    />
                            </View> */}
                            <View styles={styles.buttons}>
                                <Text style={styles.title}>Solicitando permiso GPS</Text>
                                <Text style={styles.text}>{ this.state.permissionGPS ? 'Gracias por concedernos el permiso, puedes continuar deslizando hacia la derecha.' : 'Barranquilla verde necesita acceder al  GPS de tu dispositivo para funcionar, por favor concede los permisos a la aplicación persionando en el botón "Conceder", y luego permitir.' }</Text>
                                <Button
                                    title={ this.state.permissionGPS ? 'Permitido' : 'Conceder' }
                                    titleStyle={StylesGeneral.fontPrimaryButton}
                                    buttonStyle={StylesGeneral.buttonSecond}
                                    containerStyle={StylesGeneral.marginvertical}
                                    onPress={() => this.checkPermissionStatus(this.locationPermission)}
                                    disabled={this.state.permissionGPS}
                                    /> 
                            </View>
                        </View>
                        
                        <View style={styles.slide3}>
                            {/* <View style={styles.sliders}>
                                <Image
                                    source={require('../../../assets/permission_camera.png')}
                                    style={styles.logo}
                                />
                            </View> */}
                            <View styles={styles.buttons}>
                                <Text style={styles.title}>Solicitando permiso Cámara</Text>
                                <Text style={styles.text}>
                                    {this.state.permissionGPS
                                    ? 'Gracias por concedernos el permiso, puedes continuar deslizando hacia la derecha.'
                                    : 'Barranquilla verde necesita acceder a la cámara de tu dispositivo para funcionar, por favor concede los permisos a la aplicación persionando en el botón "Conceder", y luego permitir.'}
                                </Text>
                                <Button
                                    title={this.state.permissionCamera ? 'Permitido' : 'Conceder'}
                                    titleStyle={StylesGeneral.fontPrimaryButton}
                                    buttonStyle={StylesGeneral.buttonSecond}
                                    containerStyle={StylesGeneral.marginvertical}
                                    onPress={() =>
                                    this.checkPermissionStatus(this.cameraPermission)
                                    }
                                    disabled={this.state.permissionCamera}
                                />
                            </View>
                        </View>

                        <View style={styles.slide2}>
                            {/* <View style={styles.sliders}>
                                <Image 
                                    source={require('../../../assets/permission_storage.png')} 
                                    style={styles.logo}
                                    />
                            </View> */}
                            <View styles={styles.buttons}>
                                <Text style={styles.title}>Solicitando permiso Almacenamiento</Text>
                                <Text style={styles.text}>{ this.state.permissionWrite ? 'Gracias por otorgarnos el permiso, puedes continuar deslizando hacia la derecha.' : 'Barranquilla verde necesita acceder al almacenamiento de tu dispositivo para funcionar, por favor concede los permisos a la aplicación persionando en el botón "Conceder", y luego permitir.' }.</Text>
                                <Button
                                    title={ this.state.permissionWrite ? 'Permitido' : 'Conceder' }
                                    titleStyle={StylesGeneral.fontPrimaryButton}
                                    buttonStyle={StylesGeneral.buttonSecond}
                                    containerStyle={StylesGeneral.marginvertical}
                                    onPress={() => this.checkPermissionStatus(this.storagePermission)}
                                    disabled={this.state.permissionWrite}
                                    /> 
                            </View>
                        </View>
          
                        <View style={styles.slide4}>
                            {(this.state.permission) && ( <View style={styles.sliders}>
                                {/* <Image 
                                    source={require('../../../assets/permission_complete.png')} 
                                    style={styles.logo}
                                    /> */}
                            </View>)}

                            {(this.state.permission) && ( <Text style={styles.title}>Te damos la bienvenida a </Text>)}
                            {(this.state.permission) && (<Image 
                                    source={require('../../../assets/logo-white.png')} 
                                    style={{marginTop: -10,width: 150, height: 50, resizeMode: 'contain',}}
                                    />
                                    )}
                                
                            <Text style={styles.text}>{ this.state.permission ? '¡Ya puedes ingresar a nuestra plataforma!' : 'Para ingresar a la aplicación es necesario conceder los permisos.'}</Text>
                            {(this.state.permission) && ( 
                                <Button
                                    title="Ingresar"
                                    titleStyle={StylesGeneral.fontPrimaryButton}
                                    buttonStyle={StylesGeneral.buttonSecond}
                                    
                                    containerStyle={[{ width: '100%' }, StylesGeneral.marginvertical]}
                                    onPress={() => this.props.navigation.navigate('Loading') }
                                    />
                            )}
                        </View>
                    </Swiper>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logo: {
        resizeMode: 'contain',
        height: 250,
        width: 250,
    },
    title: {
        ...Fonts.fontBold,
        marginVertical: 5,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.primary,
        padding: 20
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 20
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 20
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 20
    },
    buttons:{
    },
    text: {
        ...Fonts.fontRegular,
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    }
})

export default connect(null, null)(SliderPermission);
