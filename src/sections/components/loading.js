import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { Colors } from '../../themes';

function Loading(){
    return(
        <SafeAreaView style={[styles.safContainer, { backgroundColor: Colors.primary }]}>
            <View style={styles.container}>
                <Image 
                    source={require('../../../assets/logo-white.png')} 
                    style={styles.logo}
                    />
                <ActivityIndicator size="large" color={'white'} />
                <Text style={{color: 'white'}}>Cargando...</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
    },
})

export default Loading;