import React from 'react';
import { Colors } from '../../themes/';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function IconsOfferApp(props) {
  return (
    <Icon
      name={props.icons}
      size={props.size}
      color={Colors.TextBlack}
      style={{...props.style}}
      />
  );
}