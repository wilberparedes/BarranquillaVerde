import Colors from './Colors';
import Fonts from './Fonts';

const styles = {
    paddingContent:{
        paddingHorizontal: 16,
    },
    marginvertical:{
        marginVertical: 5,
    },
    marginverticalInput:{
        marginVertical: -10,
    },
    inputWhiteWithBorder:{
        width: "100%",
        borderRadius: 18,
        borderColor: Colors.second, 
        borderWidth: 1,
        backgroundColor: Colors.backgroundInputWhite, 
        paddingHorizontal: 10, 
        paddingVertical: 0
    },
    inputTextPrimary:{
        ...Fonts.fontRegular,
        fontSize: 16,
        marginTop: 0,
        color: Colors.primary,
        height: 50,
    },
    buttonOutlinePrimary:{
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 22,
        paddingVertical: 6,
        backgroundColor: 'transparent'
    },
    buttonSecond:{
        marginHorizontal: 20,
        borderRadius: 18,
        paddingVertical: 10,
        backgroundColor: Colors.second,
    },
    buttonPrimary: {
        borderRadius: 18,
        paddingVertical: 5,
        backgroundColor: 'transparent'
    },
    fontWhiteButton :{
        ...Fonts.fontSemiBold,
        ...Fonts.fontButton,
        fontSize: 14,
        color: Colors.primary,
        textDecorationLine: 'underline'
    },
    buttonWhite: {
        borderWidth: 0,
        borderRadius: 18,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "white"
    },
    buttonOutlineWhite: {
        borderWidth: 0,
        borderRadius: 18,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 1
    },
    buttonBlack: {
        borderWidth: 0,
        borderRadius: 18,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#030303'
    },
    fontPrimaryButton : {
        ...Fonts.fontBold,
        ...Fonts.fontButton,
        color: 'white'
    },
    fontTerButton : {
        ...Fonts.fontBold,
        ...Fonts.fontButton,
        color: 'white'
    },
    contentAvatar : {
        alignItems: 'flex-end',
        justifyContent: 'center', 
        position: 'absolute', 
        top: 1, 
        right: 10, 
        borderWidth: 2, 
        borderColor: Colors.second, 
        borderRadius: 30,
        overflow: 'hidden'
    },
    contentTextFooter:{
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        borderWidth: 1, 
        borderRadius: 20
    },
    textFooter:{
        ...Fonts.fontMedium,
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    numberTextFooter:{
        ...Fonts.fontMedium, color: 'white', fontSize: 16, paddingHorizontal: 15 
    },
    buttonFooter: {
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        borderRadius: 20, 
        paddingVertical: 10
    },
    textButtonFooter:{
        ...Fonts.fontBold,
        fontSize: 16,
        paddingHorizontal: 15
    },
    priceButtonFooter:{
        ...Fonts.fontSemiBold, 
        color: Colors.primary, 
        fontSize: 16, 
        paddingHorizontal: 15
    },
    inputContainerStyle:{
        backgroundColor: Colors.grisInput,
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontSize:16
    },
    containerStyle:{
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingTop:0,
        paddingLeft:0,
        paddingRight: 0,
        paddingBottom:0,
        backgroundColor: 'trasparent'
    },
    contentCategory:{
        // flex: 1,
        flexDirection: "row"
    },
    categoryItem:{
        marginHorizontal: 5, 
        marginVertical: 10,
        // width: 100,
        position: 'relative',
        // height: 100,
        overflow: 'hidden',
        alignContent: "center",
        justifyContent: 'center',
        alignItems:'center',
    },
    titleCategoryItem:{
        ...Fonts.fontRegular,
        fontSize: 12
    },
    buttonPrimaryHeader:{
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 18,
        backgroundColor: Colors.primary
    },
    fontbuttonPrimaryHeader : {
        ...Fonts.fontRegular,
        ...Fonts.fontButton,
        color: 'white',
        fontSize: 12
    },
    
    inputBGgris:{
        width: '100%',
        borderRadius: 10,
        borderWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: '#E5E5E5', 
        paddingHorizontal: 10, 
        paddingVertical: 0
    },
    inputTextBlack:{
        ...Fonts.fontRegular,
        fontSize: 16,
        marginTop: 0,
        color: '#000000',
        height: 50,
    },
    input: {
        borderBottomWidth: 0,
        borderRadius: 30,
        backgroundColor: "white",
        marginVertical: 5,
    },
    // -----------
    containerInput:{
        backgroundColor: '#D4EEDA', 
        borderRadius: 10,
        overflow: 'hidden'
    }

}

export default styles;