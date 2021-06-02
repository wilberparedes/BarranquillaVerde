import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { connect } from  'react-redux';


import { Colors, Metrics, StylesGeneral, Fonts, Functions } from '../../themes';
import ButtonOfferApp from '../components/ButtonOfferApp';

const HomeAccess = ({ navigation }) => {

  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={require('../../../assets/background-login.png')} style={styles.imageBackground} >
        <View style={styles.container}>
          <View style={styles.sliders}>
            <Image source={require('../../../assets/logo.png')} style={{width: 250, height: 110, resizeMode: 'contain'} } />
          </View>
          <View styles={styles.buttons}>

            <ButtonOfferApp
              uppercase={false}
              buttonColor={Colors.primary}
              textColor={"white"}
              text={'INICIAR SESIÓN'}
              style={{marginBottom: 10, width: '100%'}}
              onPress={() => navigation.push("Login")}
              />
            
            <ButtonOfferApp
              uppercase={false}
              
              buttonColor={'white'}
              textColor={Colors.primary}
              text={'REGISTRARSE'}
              style={{ width: '100%'}}
              onPress={() => navigation.push("Register")}
              />
          </View>

          <View style={styles.espacio}></View>
        </View>

        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true}/>
      </ImageBackground>
  </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screen: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    flex: 1,
    backgroundColor: Colors.primary
  },
  imageBackground: {
    flex: 1,
    height: undefined,
    width: undefined,
    alignContent: 'stretch',
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    paddingHorizontal: 16,
  },
  sliders:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: 'contain',
    marginBottom: 5,
    height: Metrics.screenHeight/2.0,
    width: Metrics.screenWidth/2.0,
    marginTop: Metrics.screenHeight/20
  },
  buttons:{
    marginBottom: 20,
  },
  espacio:{
    height: 10
  }
})


export default connect( null, null )(HomeAccess);
