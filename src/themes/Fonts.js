import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Metrics from './Metrics';

const family = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  lato: 'Lato',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extrabold: 'Poppins-ExtraBold',
  qb: 'Quicksand-Bold'
}

export default Fonts = StyleSheet.create({
  fontRegular:{
    fontFamily: family.regular
  },
  fontMedium:{
    fontFamily: family.medium
  },
  fontSemiBold:{
    fontFamily: family.semibold
  },
  fontBold:{
    fontFamily: family.bold
  },
  fontExtraBold:{
    fontFamily: family.extrabold
  },
  fontButton:{
    fontSize: 16
  },
  fontText:{
    fontFamily: family.bold,
    textAlign: 'center',
  },
  loginInput: {
    color: Colors.loginText,
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.3
  },
  registerInput: {
    color: Colors.registerText,
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.3
  },
  loginButton: {
    fontSize: 13,
    color: '#E8E8E8',
    letterSpacing: 0.65
  },
  recoveryPassword: {
    color: '#C8C8C8',
  },
  registerBackButton: {
    fontSize: 20,
    color: 'white',
  },
  registerNavigationLabel: {
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
  },
  registerTitle: {
    fontSize: 24,
    color: '#EDEDED',
  },
  tycText: {
    fontSize: 12,
    color: '#474747',
    textAlign: 'center'
  },
  smallGreenTitle:{
    fontSize: 14,
    color: '#98C04D',
    marginLeft: 6,
  },
  smallGreenTitleRed:{
    fontSize: 14,
    color: '#474747',
    marginLeft: 6,
  },
  fontTabBar:{
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 2,
  }
});