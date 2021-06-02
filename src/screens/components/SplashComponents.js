
import React from 'react';
import { Colors } from '../../themes';
import { SafeAreaView, StatusBar, Image } from 'react-native';

const SplashComponents = () => {
  return (
    <SafeAreaView style={ { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary } }>
      <Image source={require('../../../assets/logo-white.png')} style={{width: 300, height: 110, resizeMode: 'contain'} } />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark}/>
    </SafeAreaView>
  )
}

export default SplashComponents;