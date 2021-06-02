import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Metrics, Colors } from '../../themes';

function Loading(props){
    return(
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/logo-white.png')} 
                style={styles.logo}
                />
            <ActivityIndicator size="large" color={'white'} />
            <Text style={{color: 'white'}}>Cargando...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        resizeMode: 'contain',
        marginBottom: 5,
        width: 300, 
        height: 110,
        marginBottom: 16
        // marginTop: Metrics.screenHeight/45.0
    },
})

export default Loading;