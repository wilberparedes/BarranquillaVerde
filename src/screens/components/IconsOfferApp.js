import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Colors, Functions } from '../../themes/';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function IconsOfferApp(props) {
  return (
    // <Image
    //   resizeMode={props.resizeMode}
    //   source={Functions.getIcons(props.icons)}
    //   style={{ ...props.style, width: props.size, height: props.size }}
    // />
    <Icon
      name={props.icons}
      size={props.size}
      color={Colors.TextBlack}
      style={{...props.style}}
      />
  );
}

const styles = StyleSheet.create({});