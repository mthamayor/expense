import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchables from './Touchables';
import Screens from './../utils/constants/screens';
import { ICourseState } from '../ts/interfaces/index';
import { ColorPalette } from '../utils/styles/colors';

interface CourseData {
  course: ICourseState
  navigate: any;
}

const CourseCard = (props: CourseData) => {
  const { course, navigate } = props;
  const { id, title } = course;

  const handleClick = (): void => {
    navigate(Screens.CourseContent, {
      course,
    });
  }
  return (
    <Touchables onPress={handleClick}>
      <View style={styles.container}>
        <View style={styles.numberingContainer}>
          <Text style={styles.numbering}>{id}</Text>
        </View>

        <View style={styles.topicContainer}>
          <Text style={styles.topicHeader}>{title}</Text>
        </View>
      </View>
    </Touchables>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    width: '100%',
    height: 80,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.background
  },
  numberingContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numbering: {
    color: ColorPalette.secondaryDark,
    fontSize: 22
  },
  topicContainer: {
    flex: 1
  },
  topicHeader: {
    color: '#696464'
  }
});

export default CourseCard;