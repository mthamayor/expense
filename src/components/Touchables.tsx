import React, { ReactNode } from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

interface IProps {
  onPress?: () => void;
  children: ReactNode;
}

const Touchables = (props: IProps) => {
  return (
    Platform.OS === 'ios' ?
    <TouchableOpacity onPress={ props.onPress }>
      {props.children}
    </TouchableOpacity>
    :
    <TouchableNativeFeedback onPress={ props.onPress }>
      {props.children}
    </TouchableNativeFeedback>
  )
};

export default Touchables;
