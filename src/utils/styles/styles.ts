import { StyleSheet } from 'react-native';
import { Colors, ColorPalette } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    alignItems: 'center'
  },
  controlsInner: {
    padding: 6,
    width: '100%',
    maxWidth: 350,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: ColorPalette.background
  },
  controlsHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    width: '100%',
    height: 30,
    paddingLeft: 30,
    paddingRight: 30,
    maxWidth: 350,
    borderTopStartRadius: 20,
    backgroundColor: ColorPalette.background,
    borderBottomColor: ColorPalette.primaryDark,
    borderBottomWidth: 1
  },
  controlsHeaderText: {
    textTransform: 'uppercase',
    color: ColorPalette.secondaryDark,
    fontSize: 18
  }
});
