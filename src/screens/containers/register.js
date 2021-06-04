import React, { useEffect, useState  } from 'react';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { actions } from '../../store';

import { Text, View, StatusBar, Image, ImageBackground, Linking, Alert,  } from 'react-native';
import { Colors, Fonts, StylesGeneral, Functions, Metrics  } from '../../themes';
import ButtonOfferApp from '../components/ButtonOfferApp';
import InputField from '../components/InputField';
import HeaderOnlyBack from '../components/HeaderOnlyBack';


const Register = ({navigation, dispatch, RegisterAccount, datauuid}) => {

  const inputs = {};
  const focusTheField = (id) => inputs[id].focus();
  const { alertOK } = Functions;

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [email, setEmail] = useState('')
  const [nameuser, setNameuser] = useState('')
  const [pass, setPass] = useState('')
  const [id_device, setId_device] = useState(datauuid)


  const sendRegister = () => {
    console.log('sendRegister');
    let regexNum = /^[0-9]*$/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(name.trim() == ''){
      alertOK(
        'Advertencia',
        `Por favor, ingrese su Nombre.`, 
        true
      );
    }
    else if(cellphone.trim() == ''){
      alertOK(
        'Advertencia',
        `Por favor, ingrese su Número de teléfono.`, 
        true
      );
    }
    else if(regexNum.test(cellphone) === false){
      alertOK(
        'Mensaje', 
        'Por favor, ingrese solo Números en Celular.', 
        true
      );
      return false;
    }
    // else if(nameuser.trim() == ''){
    //   alertOK(
    //     'Advertencia',
    //     `Por favor, ingrese su Nombre de usuario.`, 
    //     true
    //   );
    // }
    else if(email.trim() == ''){
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
      console.log('success');
      setLoading(true)
      setNameuser(name.trim())
      const rRegisterAccount = RegisterAccount(name, cellphone, email, name.trim(), pass, "12355651")
        .then((data) => data.json())
        .then((dataJson) => {
          if(dataJson.success){
            dispatch({
              type: 'SET_TOKEN',
              payload: {
                token: dataJson.accessToken,
              }
            })
            dispatch({
              type: 'SET_USER',
              payload: { 
                id: dataJson.id,
                name,
                cellphone,
                email,
                id_device,
                nameuser: name.trim(),
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

          <View style={{flex: 1, marginHorizontal: 30, justifyContent: 'flex-start'}}>
          
           
            <Text style={{...Fonts.fontBold, fontSize: 22, color: Colors.TextBlack, marginBottom: 15, marginTop: 20}}>Crear cuenta</Text>

            <View style={{width: '100%'}}>

              <View style={{ ...StylesGeneral.containerInput, marginBottom: 5 }}>
                <InputField
                  icon={'user'}
                  value={name}
                  placeholder="Nombre y Apellido:"
                  onChange={(text) => setName( text )}
                  returnKeyType="next"
                  onSubmitEditing={() => focusTheField('cellphone')}
                  blurOnSubmit={false}
                />
              </View>

              <View style={{ ...StylesGeneral.containerInput, marginBottom: 5 }}>
                <InputField
                  innerRef={(input) => inputs['cellphone'] = input}
                  icon={'phone'}
                  value={cellphone}
                  placeholder="Número de teléfono:"
                  keyboardType="phone-pad"
                  onChange={(text) => setCellphone( text )}
                  returnKeyType="next"
                  onSubmitEditing={() => focusTheField('email')}
                  
                  blurOnSubmit={false}
                />
              </View>
              {/* 
              <View style={{ ...StylesGeneral.containerInput, marginBottom: 5 }}>
                <InputField
                  innerRef={(input) => inputs['nameuser'] = input}
                  icon={'user'}
                  value={nameuser}
                  placeholder="Nombre de usuario:"
                  onChange={(text) => setNameuser( text )}
                  returnKeyType="next"
                  onSubmitEditing={() => focusTheField('pass')}
                  blurOnSubmit={false}
                />
              </View> */}

              <View style={{ ...StylesGeneral.containerInput, marginBottom: 5 }}>
                <InputField
                  innerRef={(input) => inputs['email'] = input}
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
                  innerRef={(input) => inputs['pass'] = input}
                  icon={'lock'}
                  value={pass}
                  placeholder="Contraseña:"
                  password
                  showPassword
                  onChange={(pass) => setPass(pass)}
                  onSubmitEditing={() => sendRegister()}
                  />
              </View>

              <ButtonOfferApp 
                uppercase={false}
                loading={loading}
                disabled={(loading)}
                buttonColor={Colors.primary}
                textColor={"white"}
                text={'Registrarme'}
                style={{marginBottom: 5, width: '100%'}}
                onPress={() => sendRegister()}
                />

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
  RegisterAccount: (name, cellphone, email, nameuser, pass, id_device) => 
    dispatch(actions.api.registerAccount(name, cellphone, email, nameuser, pass, id_device)),
  dispatch
});

export default connect( mapStateToProps, mapDispatchToProps )(Register);