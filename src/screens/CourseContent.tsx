import React, { Component, useEffect } from 'react';
import { StyleSheet, TouchableNativeFeedback, Text, ActivityIndicator, View, TouchableHighlight } from 'react-native';
import { ICourseState } from '../ts/interfaces';
import WebView from 'react-native-webview';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  NavigationScreenProps,
} from 'react-navigation';
import Screens from '../utils/constants/screens';
import { ColorPalette } from '../utils/styles/colors';

interface IProps extends NavigationScreenProps {
}

class CourseContent extends Component<IProps> {
  course: ICourseState;
  state = {
    error: false,
  }
  static navigationOptions = ({ navigation }): object => {
    const { params } = navigation.state;
    const { course, quizSettingsPage } = params;
    return {
      headerTitle: `${course.title}`,
      headerRight: (
        <TouchableNativeFeedback onPress={quizSettingsPage}>
          <Text style={{marginRight: 15, color:'white', textTransform: "uppercase", fontWeight: "bold", backgroundColor: ColorPalette.primary}}>Take quiz</Text>
        </TouchableNativeFeedback>
      )
    };
  };

  constructor(props: IProps) {
    super(props);

    const { navigation } = this.props;
    const { params } = navigation.state;
    this.course = params.course;
  }

  componentDidMount() {
    this.props.navigation.setParams({ quizSettingsPage: this.quizSettingsPage });
  }

  quizSettingsPage = (): void => {
    const { navigation } = this.props;
    const { id } = this.course;
    navigation.navigate(Screens.QuizSettings, {course: this.course});
  };

  reload = () => {
    this.setState({ error: false });
  }

  handleError = () => {
    this.setState({ error: true });
  }

  render() {
    const { id, title, lessonUri } = this.course;
    const { error } = this.state;
    const view = !error ? (
      <WebView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        source={{ uri: lessonUri }}
        renderLoading={() => (
          <ActivityIndicator size='large' color={ColorPalette.primary} />
        )}
        onError={this.handleError}
      />
    ) : (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 50, color: ColorPalette.primary }}>
          Oops
        </Text>
        <Text style={{ fontSize: 16, color: ColorPalette.secondary }}>
          Loading error. Please check your internet
        </Text>
        <TouchableHighlight onPress={this.reload}>
          <SimpleLineIcons name="reload" color={ColorPalette.primary} size={22} />
        </TouchableHighlight>
      </View>
    );
    return (
      <View style={{flex: 1}}>{view}</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: 'blue',
    alignItems: 'center'
  }

});

export default CourseContent;