import {
    Alert
} from 'react-native';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class Functions  {
    
    alertOK(title, message, cancel) {
        Alert.alert(
            title,
            message,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: cancel},
        );
    }

    alertLogout(title, message, cancel, props) {
        Alert.alert(
            title,
            message,
            [
                {text: 'Aceptar', onPress: 

                () => {
                    props.dispatch({
                        type: 'REMOVE_USER'
                    })
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'Loading',
                                    params: { user: 'jane' },
                                },
                            ],
                        })
                    );
                }
                },
            ],
            {cancelable: cancel},
        );
    }

    alertOKTitle(title, message, cancel) {
        Alert.alert(
            title,
            message,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: cancel},
        );
    }

    getKilometros(lat1, lon1, lat2, lon2)
    {
        km = 111.302;
        //1 Grado = 0.01745329 Radianes    
        degtorad = 0.01745329;
        //1 Radian = 57.29577951 Grados
        radtodeg = 57.29577951;

        dlong = (lon2 - lon1); 
        dvalue = (Math.sin(lat2 * degtorad) * Math.sin(lat1 * degtorad)) + (Math.cos(lat2 * degtorad) * Math.cos(lat1 * degtorad) * Math.cos(dlong * degtorad)); 
        dd = Math.acos(dvalue) * radtodeg; 
        return Math.round((dd * km), 2) * 1000;
    }

    getIcons(e){
        const directoryIconsAndroid = '../../assets/icons/android/';
        const directoryIconsIos = '../../assets/icons/ios/';
        const Icons = Platform.select({
            android: {
                back: require(directoryIconsAndroid + 'back-ico.png'),
                success: require(directoryIconsAndroid + 'success-ico.png'),
                close: require(directoryIconsAndroid + 'close-ico.png'),
                plus: require(directoryIconsAndroid + 'plus-ico.png'),
                add: require(directoryIconsAndroid + 'add-ico.png'),
                ubication: require(directoryIconsAndroid + 'ubication-ico.png'),
                home: require(directoryIconsAndroid + 'home-ico.png'),
                homeFocused: require(directoryIconsAndroid + 'home-focused-ico.png'),
                qr: require(directoryIconsAndroid + 'qr-ico.png'),
                qrFocused: require(directoryIconsAndroid + 'qr-focused-ico.png'),
                profile: require(directoryIconsAndroid + 'user-ico.png'),
                profileFocused: require(directoryIconsAndroid + 'user-focused-ico.png'),
                notification: require(directoryIconsAndroid + 'notification-ico.png'),
                
                
                stores: require(directoryIconsAndroid + 'stores-ico.png'),
                pedidos: require(directoryIconsAndroid + 'pedidos-ico.png'),
                entregas: require(directoryIconsAndroid + 'entregas-ico.png'),
                ganancias: require(directoryIconsAndroid + 'ganancias-ico.png'),
                recargas: require(directoryIconsAndroid + 'recargas-ico.png'),
                soporte: require(directoryIconsAndroid + 'soporte-ico.png'),

                calendar: require(directoryIconsAndroid + 'calendar-ico.png'),
                settings: require(directoryIconsAndroid + 'settings-ico.png'),
                
                
                edit: require(directoryIconsAndroid + 'edit-ico.png'),
                star: require(directoryIconsAndroid + 'star-ico.png'),
                history: require(directoryIconsAndroid + 'history-ico.png'),

                edit2: require(directoryIconsAndroid + 'edit2-ico.png'),
                password: require(directoryIconsAndroid + 'password-ico.png'),
                addfriend: require(directoryIconsAndroid + 'addfriend-ico.png'),
                history2: require(directoryIconsAndroid + 'history2-ico.png'),
                support: require(directoryIconsAndroid + 'support-ico.png'),
                suggestion: require(directoryIconsAndroid + 'suggestion-ico.png'),
                logout: require(directoryIconsAndroid + 'logout-ico.png'),
                deleteaccount: require(directoryIconsAndroid + 'deleteaccount-ico.png'),


                arrowright: require(directoryIconsAndroid + 'arrowright-ico.png'),
                menu2: require(directoryIconsAndroid + 'menu2-ico.png'),
                timer: require(directoryIconsAndroid + 'timer-ico.png'),
                storebold: require(directoryIconsAndroid + 'storebold-ico.png'),
                phone: require(directoryIconsAndroid + 'phone-ico.png'),
                maps: require(directoryIconsAndroid + 'maps-ico.png'),
                userrounded: require(directoryIconsAndroid + 'userrounded-ico.png'),
                
                like: require(directoryIconsAndroid + 'like-ico.png'),
                likechecked: require(directoryIconsAndroid + 'likechecked-ico.png'),
                notlike: require(directoryIconsAndroid + 'notlike-ico.png'),
                notlikechecked: require(directoryIconsAndroid + 'notlikechecked-ico.png'),
                
                
                info: require(directoryIconsAndroid + 'info-ico.png'),
                coins: require(directoryIconsAndroid + 'coins-ico.png'),

                useroutline: require(directoryIconsAndroid + 'useroutline-ico.png'),
                username: require(directoryIconsAndroid + 'username-ico.png'),
                email: require(directoryIconsAndroid + 'email-ico.png'),
                coinsoutline: require(directoryIconsAndroid + 'coinsoutline-ico.png'),
                
                chatsupport: require(directoryIconsAndroid + 'chatsupport-ico.png'),


                camera: require(directoryIconsAndroid + 'camera-ico.png'),
                addgray: require(directoryIconsAndroid + 'addgray-ico.png'),
                driverlicenceoutline: require(directoryIconsAndroid + 'driverlicenceoutline-ico.png'),
                driverlicence: require(directoryIconsAndroid + 'driverlicence-ico.png'),
                docid: require(directoryIconsAndroid + 'docid-ico.png'),
                docidoutline: require(directoryIconsAndroid + 'docidoutline-ico.png'),
                tecnooutline: require(directoryIconsAndroid + 'tecnocoutline-ico.png'),
                tecno: require(directoryIconsAndroid + 'tecno-ico.png'),
                
                city: require(directoryIconsAndroid + 'city-ico.png'),
                address: require(directoryIconsAndroid + 'address-ico.png'),
                gender: require(directoryIconsAndroid + 'gender-ico.png'),
                birthday: require(directoryIconsAndroid + 'birthday-ico.png'),

            },
            ios: {
                back: require(directoryIconsIos + 'back-ico.png'),
                success: require(directoryIconsIos + 'success-ico.png'),
                close: require(directoryIconsIos + 'close-ico.png'),
                plus: require(directoryIconsIos + 'plus-ico.png'),
                add: require(directoryIconsIos + 'add-ico.png'),
                ubication: require(directoryIconsIos + 'ubication-ico.png'),
                home: require(directoryIconsIos + 'home-ico.png'),
                homeFocused: require(directoryIconsIos + 'home-focused-ico.png'),
                qr: require(directoryIconsIos + 'qr-ico.png'),
                qrFocused: require(directoryIconsIos + 'qr-focused-ico.png'),
                profile: require(directoryIconsIos + 'user-ico.png'),
                profileFocused: require(directoryIconsIos + 'user-focused-ico.png'),
                notification: require(directoryIconsIos + 'notification-ico.png'),
                
                
                stores: require(directoryIconsIos + 'stores-ico.png'),
                pedidos: require(directoryIconsIos + 'pedidos-ico.png'),
                entregas: require(directoryIconsIos + 'entregas-ico.png'),
                ganancias: require(directoryIconsIos + 'ganancias-ico.png'),
                recargas: require(directoryIconsIos + 'recargas-ico.png'),
                soporte: require(directoryIconsIos + 'soporte-ico.png'),

                calendar: require(directoryIconsIos + 'calendar-ico.png'),
                settings: require(directoryIconsIos + 'settings-ico.png'),
                
                
                edit: require(directoryIconsIos + 'edit-ico.png'),
                star: require(directoryIconsIos + 'star-ico.png'),
                history: require(directoryIconsIos + 'history-ico.png'),

                edit2: require(directoryIconsIos + 'edit2-ico.png'),
                password: require(directoryIconsIos + 'password-ico.png'),
                addfriend: require(directoryIconsIos + 'addfriend-ico.png'),
                history2: require(directoryIconsIos + 'history2-ico.png'),
                support: require(directoryIconsIos + 'support-ico.png'),
                suggestion: require(directoryIconsIos + 'suggestion-ico.png'),
                logout: require(directoryIconsIos + 'logout-ico.png'),
                deleteaccount: require(directoryIconsIos + 'deleteaccount-ico.png'),
                
                
                arrowright: require(directoryIconsIos + 'arrowright-ico.png'),
                menu2: require(directoryIconsIos + 'menu2-ico.png'),
                timer: require(directoryIconsIos + 'timer-ico.png'),
                storebold: require(directoryIconsIos + 'storebold-ico.png'),
                phone: require(directoryIconsIos + 'phone-ico.png'),
                maps: require(directoryIconsIos + 'maps-ico.png'),
                userrounded: require(directoryIconsIos + 'userrounded-ico.png'),


                like: require(directoryIconsIos + 'like-ico.png'),
                likechecked: require(directoryIconsIos + 'likechecked-ico.png'),
                notlike: require(directoryIconsIos + 'notlike-ico.png'),
                notlikechecked: require(directoryIconsIos + 'notlikechecked-ico.png'),


                info: require(directoryIconsIos + 'info-ico.png'),
                coins: require(directoryIconsIos + 'coins-ico.png'),

                username: require(directoryIconsIos + 'username-ico.png'),
                email: require(directoryIconsIos + 'email-ico.png'),
                coinsoutline: require(directoryIconsIos + 'coinsoutline-ico.png'),
                
                chatsupport: require(directoryIconsIos + 'chatsupport-ico.png'),

                camera: require(directoryIconsIos + 'camera-ico.png'),
                addgray: require(directoryIconsIos + 'addgray-ico.png'),
                driverlicenceoutline: require(directoryIconsIos + 'driverlicenceoutline-ico.png'),
                driverlicence: require(directoryIconsIos + 'driverlicence-ico.png'),
                docid: require(directoryIconsIos + 'docid-ico.png'),
                docidoutline: require(directoryIconsIos + 'docidoutline-ico.png'),
                tecnooutline: require(directoryIconsIos + 'tecnooutline-ico.png'),
                tecno: require(directoryIconsIos + 'tecno-ico.png'),

                city: require(directoryIconsIos + 'city-ico.png'),
                address: require(directoryIconsIos + 'address-ico.png'),
                gender: require(directoryIconsIos + 'gender-ico.png'),
                birthday: require(directoryIconsIos + 'birthday-ico.png'),
            },
        });
        return Icons[e];
    }

    

    

}



export default new Functions();