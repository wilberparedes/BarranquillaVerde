import React, { useEffect, useState  } from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar, Image, ImageBackground, } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { actions } from '../../store';
import { Colors, StylesGeneral, Functions, Metrics  } from '../../themes';

import ButtonOfferApp from '../components/ButtonOfferApp';
import InputField from '../components/InputField';
import HeaderOnlyBack from '../components/HeaderOnlyBack';

const Login = ({navigation, dispatch, Login: ALogin, datauuid}) => {

  const inputs = {};
  const focusTheField = (id) => inputs[id].focus();
  const { alertOK } = Functions;

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('');
  const [id_device, setId_device] = useState(datauuid)


  const sendLogin = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(email.trim() == ''){
      alertOK(
        'Advertencia',
        `Por favor, ingrese su Correo electrónico.`, 
        true
      );
    }
    else if(reg.test(email) === false){
      alertOK(
        'Mensaje', 
        'Correo Electrónico no es correcto.', 
        true
      );
      return false;
    }
    else if(pass.trim() == ''){
      alertOK(
        'Advertencia',
        `Por favor, ingrese su Contraseña.`, 
        true
      );
    }
    else{
      setLoading(true)
      const rALogin = ALogin(email, pass, id_device)
        .then((data) => data.json())
        .then((dataJson) => {
          if(dataJson.success){
            const { accessToken, id, nameuser, cellphone, name_complete } = dataJson;
            dispatch({
              type: 'SET_TOKEN',
              payload: {
                token: accessToken,
              }
            })
            dispatch({
              type: 'SET_USER',
              payload: { 
                id,
                name: name_complete,
                cellphone,
                email,
                id_device,
                nameuser: nameuser
              }
            })
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'SplashScreen'
                  }
                ]
              })
            )

          }else{
            alertOK(
              'Advertencia',
              `${dataJson.message}`, 
              true
            );
          }
          setLoading(false)
        });
      
    }
  }

  return (

    <View style={{backgroundColor: "white", flex: 1}}>
    
      <ImageBackground source={require('../../../assets/background-login.png')} style={{flex: 1, width: Metrics.screenWidth, height: undefined, alignContent: 'stretch', resizeMode: 'contain', backgroundColor: "white"}}>
      
        <HeaderOnlyBack navigation={navigation} />

        <View style={{flex: 1, marginHorizontal: 30, justifyContent: 'center'}}>
        
          <View style={{width: '100%', alignItems: 'center', marginBottom: 30}}>
            <Image source={require('../../../assets/logo.png')} style={{width: 250, height: 110, resizeMode: 'contain'} } />
          </View>

          <View style={{width: '100%'}}>

              <View style={{ ...StylesGeneral.containerInput, marginBottom: 5 }}>
                <InputField
                  icon={'envelope'}
                  value={email}
                  placeholder="Correo electrónico:"
                  keyboardType="email-address"
                  onChange={(text) => setEmail( text )}
                  returnKeyType="next"
                  onSubmitEditing={() => focusTheField('pass')}
                  blurOnSubmit={false}
                />
              </View>
              
              <View style={{ ...StylesGeneral.containerInput, marginBottom: 15 }}>
                <InputField
                  icon={'lock'}
                  innerRef={(input) => inputs['pass'] = input}
                  value={pass}
                  placeholder="Contraseña:"
                  password
                  showPassword
                  onChange={(text) => setPass(text)}
                  onSubmitEditing={() => sendLogin()}
                  />
              </View>

              <ButtonOfferApp 
                  uppercase={false}
                  loading={loading}
                  disabled={(loading)}
                  buttonColor={Colors.primary}
                  textColor={"white"}
                  text={'Iniciar sesión'}
                  style={{marginBottom: 5, width: '100%'}}
                  onPress={() => sendLogin()}
                  />

              {/* <View style={{ marginTop: 5, marginBottom: 30, alignSelf: 'center' }}>
                <Text 
                  style={{ ...Fonts.fontRegular, fontSize: 14, textDecorationLine: 'underline', color: "black"}}
                  onPress={() => navigation.push("PasswordRecovery")}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </View> */}

          </View>
        
        </View>
        
        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true}/>

      </ImageBackground>

    </View>
  );
};



const mapStateToProps = (state) =>{
  return{
    datauuid: state.user.uuid,
  }
}

const mapDispatchToProps = dispatch => ({
  Login: (email, pass, id_device) => 
    dispatch(actions.api.login(email, pass, id_device)),
  dispatch
});

export default connect( mapStateToProps, mapDispatchToProps )(Login);