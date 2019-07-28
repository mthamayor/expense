import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, Button, Switch } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { styles as baseStyles } from '../utils/styles/styles';
import { ColorPalette } from '../utils/styles/colors';
import CButton from '../components/CButton';
import {
  ICourseState,
  IQuizSettings,
  IRootReducer,
  IQuizParamSettings
} from '../ts/interfaces/index';
import Screens from '../utils/constants/screens';
import {
  setQuizSettings
} from '../ts/actions/questionSettingsAction';
import { timeSteps, questionSteps } from '../utils/constants/numbering';


interface IProps extends NavigationScreenProps {
  quizSettings: IQuizSettings;
  setQuizSettings: (payload: IQuizParamSettings) => object;
}

class QuizSettings extends Component<IProps> {
  course: ICourseState;
  constructor(props: IProps) {
    super(props);

    const { navigation } = this.props;
    const { params } = navigation.state;
    this.course = params.course;
  }

  state: IQuizSettings = {
    timeAllowed: 3,
    questions: 10,
    shuffleOptions: false
  };

  onValueChange = (name: string, value: number | boolean): void => {
    const { setQuizSettings } = this.props;
    setQuizSettings({ name, value });
  };

  startQuiz = () => {
    const { navigation } = this.props;
    const { id } = this.course;
    navigation.replace(Screens.Quiz, {id, quizSettings: this.state});
  };

  render() {
    const { quizSettings } = this.props;
    return (
      <View style={baseStyles.container}>
        <View style={styles.controls}>
          <View style={baseStyles.controlsHeader}>
            <Text style={baseStyles.controlsHeaderText} numberOfLines={1}>
              {this.course.title}
            </Text>
          </View>
          <View style={baseStyles.controlsInner}>
            <Dropdown
              label='Number of questions'
              baseColor={ColorPalette.primaryDark}
              data={questionSteps}
              value={quizSettings.questions}
              onChangeText={(value: number): void =>
                this.onValueChange('questions', value)
              }
            />
            <Dropdown
              label='Time allowed (Minutes)'
              baseColor={ColorPalette.primaryDark}
              data={timeSteps}
              value={quizSettings.timeAllowed}
              onChangeText={(value: number): void =>
                this.onValueChange('timeAllowed', value)
              }
            />

            <View style={styles.controlsShuffle}>
              <Text style={styles.controlsShuffleLabel}>Shuffle options?</Text>
              <Switch
                value={quizSettings.shuffleOptions}
                onValueChange={value =>
                  this.onValueChange('shuffleOptions', value)
                }
                trackColor={{
                  false: 'inherits',
                  true: ColorPalette.secondaryLight
                }}
                thumbColor={
                  quizSettings.shuffleOptions ? ColorPalette.secondaryDark : '#faf5ef'
                }
              />
            </View>

            <CButton
              name='Start quiz'
              variant='secondary'
              onPress={this.startQuiz}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  controls: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlsShuffle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  controlsShuffleLabel: {
    fontSize: 16
  }
});

const mapStateToProps = (state: IRootReducer) => {
  const { quizSettings } = state;
  return { quizSettings };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setQuizSettings
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSettings);
