import React from 'react';
import { Fonts  } from '../../themes';
import { Button } from 'react-native-paper';
import { Colors } from '../../themes';
import IconsOfferApp from './IconsOfferApp';

const ButtonOfferApp = (props) => {

    const LabelStyle = {
        ...Fonts.fontBold,
        fontSize: 16,
        letterSpacing: 0,
        color: props.textColor,
        textAlign: 'center'
    }
    const LabelStyleDisabled = {
        ...Fonts.fontBold,
        fontSize: 16,
        letterSpacing: 0,
        color: 'white'
    }
    const ButtonStyle = {
        ...props.buttonStyle,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: props.buttonColor,
    }
    const ButtonStyleDisabled = {
        ...props.buttonStyle,
        height: 50,
        justifyContent: 'center',
        backgroundColor: Colors.GreyDisabled,
    }

    return (
        <Button
            mode="outlined"
            icon={({ size, color }) => (
                (props.icon ? <IconsOfferApp icons={props.icon} size={25} /> : null)
            )}
            disabled={props.disabled}
            loading={props.loading}
            uppercase={props.uppercase}
            labelStyle={(props.disabled ? LabelStyleDisabled : LabelStyle)}
            contentStyle={(props.disabled ? ButtonStyleDisabled : ButtonStyle)}
            style={{
                ...props.style,
                borderRadius: 8,
                // flex: .4, 
            }}
            mode="contained"
            onPress={props.onPress}>
            {props.text}
        </Button>
    );
};

export default ButtonOfferApp;