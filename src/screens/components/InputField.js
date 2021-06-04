import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Colors, Fonts } from '../../themes';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import IconsOfferApp from './IconsOfferApp';

export default function InputField(props) {
  const [visible, setVisible] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      primary: Colors.ButtonPrimary,
      accent: '#f1c40f',
    },
  };

  return (
    <View style={props.style}>
      <View style={styles.container}>
        {props.icon && (
          <View style={styles.iconView}>
            {/* <IconsOfferApp icons={props.icon} size={20} /> */}
            <Icon
              name={props.icon}
              size={20}
              color={Colors.primary}
            />
          </View>
        )}
        <View
          style={[
            { flex: 1, height: (props.numberOfLines ? 110 : 50) },
            props.shadow
              ? {
                  shadowOffset: { width: 0, height: 3 },
                  shadowColor: '#bdc3c7',
                  shadowOpacity: 0.3,
                  elevation: 2,
                }
              : null,
          ]}>
          <TextInput
            ref={props.innerRef}
            {...props}
            onChangeText={props.onChange}
            placeholderTextColor={Colors.TextSemiBlack}
            style={[
              styles.textInput,
              { color: props.editable === false ? '#bdc3c7' : null },
              props.shadow
                ? {
                    borderColor: '#EFEFEF',
                    borderRadius: 8,
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }
                : null,
            ]}
            underlineColor={'transparent'}
            underlineColorAndroid={'transparent'}
            value={props.value}
            autoFocus={false}
            autoCapitalize="none"
            theme={theme}
            secureTextEntry={props.password ? !visible : false}
            style={{height: (props.numberOfLines ? undefined : undefined)}}
          />
        </View>
        {props.password && props.showPassword && (
          // null
          <View style={styles.iconRightView}>
            {visible ? (
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                <Text
                  style={{
                    ...Fonts.fontRegular,
                    color: Colors.TextPrimary,
                    fontSize: 12,
                  }}>
                  OCULTAR
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                <Text
                  style={{
                    ...Fonts.fontRegular,
                    color: Colors.TextPrimary,
                    fontSize: 12,
                  }}>
                  MOSTRAR
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      {props.error ? (
        <Text
          style={[styles.errorText, props.icon ? { marginLeft: 40 } : null]}>
          {props.error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: 10
  },
  textInput: {
    ...Fonts.fontRegular,
    fontSize: 14,
    flex: 1,
    height: 50,
    marginTop: 0,
  },
  iconRightView:{
    position: 'absolute',
    right: 10
  },
  errorText: {
    ...Fonts.fontSemiBold,
    color: '#e74c3c',
    marginTop: 3,
    marginBottom: 3,
  },
});
