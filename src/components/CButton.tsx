import React from 'react';
import Touchables from './Touchables';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, ColorPalette } from '../utils/styles/colors';

enum ETransform {
  uppercase = 'uppercase',
  lowercase = 'lowercase',
}

enum EVariant {
  primary = 'primary',
  secondary = 'secondary',
}

interface IButton {
  name: string;
  color?: string;
  textTransform?: ETransform;
  variant?: string;
  onPress?: () => void;
}

const CButton = (props: IButton) => {
  const { variant } = props;
  let backgroundColor = variant === EVariant.secondary ? ColorPalette.secondary : Colors.primary;
  let color =
    variant === EVariant.secondary
      ? ColorPalette.primary
      : Colors.secondary;
  return (
    <Touchables onPress={ props.onPress }>
      <View style={[styles.container, {backgroundColor: backgroundColor} ]}>
        <Text style={[styles.text, { color: color }]}>{props.name}</Text>
      </View>
    </Touchables>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    minWidth: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    letterSpacing: 0.5,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    textTransform: 'uppercase'
  }
});

export default CButton;