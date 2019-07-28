import React from 'react'
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ICourseState, IRootReducer } from '../ts/interfaces';
import CourseCard from './../components/CourseCard';
import {styles as baseStyles} from '../utils/styles/styles';

const CourseOutline = (props:any) => {
  const { courses, navigation } = props;
  const courseCards = courses.map((course: ICourseState) => {
    const { id, title } = course;
    return (
      <CourseCard
        key={id}
        course={course}
        navigate={navigation.navigate}
      />
    )
  })
  
  return (
    <View style={baseStyles.container}>
      { courseCards }
    </View>
  );
}

const mapStateToProps = (state: IRootReducer): object => {
  const { courses } = state;
  return { courses };
};

export default connect(mapStateToProps)(CourseOutline)
