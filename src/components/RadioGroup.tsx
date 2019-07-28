import React, { ReactNode, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Touchables from './Touchables';
import { ColorPalette } from '../utils/styles/colors';
import { IIntegerObjectValue } from "../ts/interfaces";

interface IRadioButton{
  selected?: boolean,
  value: string,
  onPress: (value: string) => any
}

interface IProps {
  selected: string,
  data: IIntegerObjectValue<string>[],
  onValueChange?
}

const RadioGroup = (props: IProps) => {
  const { selected, data, onValueChange } = props;

  const radioClicked = (value: string) => {
    if (onValueChange) {
     onValueChange(value); 
    }
  }
  
  const radios = data.map((item: IIntegerObjectValue<string>) => {
    return (
      <RadioButton
        key={item.value}
        value={item.value}
        selected={item.value === selected}
        onPress={radioClicked}
      />
    );
  });

  return (
    <View style={{ width: '100%' }}>
      {radios}
    </View>
  );
};

const RadioButton = (props: IRadioButton) => {
  const { selected, value, onPress } = props;
  const selectedStyle = selected ? styles.selectedOption : styles.unselectedOption; 
  return (
    <Touchables onPress={()=>onPress(value)}>
      <View style={styles.baseContainer}>
        <View style={styles.optionContainer}>
          <View style={[styles.innerOptionContainer, selectedStyle]} />
        </View>
        <View style={{ flex: 1 }}>
          <Text>{value}</Text>
        </View>
      </View>
    </Touchables>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  selectedOption: {
    backgroundColor: ColorPalette.primaryDark
  },
  unselectedOption: {
    backgroundColor: ColorPalette.secondary
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: ColorPalette.secondary
  },
  innerOptionContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red'
  }
});

export default RadioGroup;
