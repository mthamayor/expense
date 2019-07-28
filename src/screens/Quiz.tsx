import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPagerAndroid } from 'react-native';
import { connect } from 'react-redux';
import Touchables from '../components/Touchables';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';
import CountDown from 'react-native-countdown-component';
import { Colors, ColorPalette } from '../utils/styles/colors';
import { styles as baseStyles } from '../utils/styles/styles';
import RadioGroup from '../components/RadioGroup';
import sortQuestions from './../ts/questions/sortQuestions';
import { IQuestions, IRootReducer, IQuizSettings } from '../ts/interfaces';


interface IProps extends NavigationScreenProps {
  quizSettings: IQuizSettings;
}

interface IComponentQuestions extends IQuestions {
  selectedAnswer: string;
}

interface IState {
  presentQuestion: IComponentQuestions,
  presentQuestionNumber: number,
  completed: boolean,
  score: number
}

class Quiz extends Component<IProps, IState> {
  questions: IComponentQuestions[];
  timeAllowed: number;

  constructor(props: IProps) {
    super(props);
    this.setup();
  }

  setup = () => {
    const { navigation, quizSettings } = this.props;
    const { params } = navigation.state;
    const { id } = params;
    const { questions, shuffleOptions, timeAllowed } = quizSettings;

    this.timeAllowed = timeAllowed * 60;

    const getQuestions: IQuestions[] = sortQuestions(
      id,
      questions,
      shuffleOptions
    );

    const selectedQuestions: IComponentQuestions[] = getQuestions.map(
      (question: IQuestions) => {
        const selectedQuestion: IComponentQuestions = Object.assign(
          {},
          question,
          { selectedAnswer: '' }
        );
        return selectedQuestion;
      }
    );
    this.questions = selectedQuestions;

    const state: IState = {
      presentQuestionNumber: 0,
      presentQuestion: selectedQuestions[0],
      completed: false,
      score: 0
    };

    this.state = state;
  };

  nextQuestion = () => {
    let { presentQuestionNumber } = this.state;
    let num = presentQuestionNumber + 1;
    if (num > this.questions.length - 1) {
      num = 0;
      const q = this.questions[num];
      this.setState({ presentQuestionNumber: num, presentQuestion: q });
    } else {
      const q = this.questions[num];
      this.setState({ presentQuestionNumber: num, presentQuestion: q });
    }
  };

  previousQuestion = () => {
    let { presentQuestionNumber } = this.state;
    let num = presentQuestionNumber - 1
    if (num < 0) {
      num = this.questions.length - 1;
      const q = this.questions[num];
      this.setState({ presentQuestionNumber: num, presentQuestion: q });
    } else {
      const q = this.questions[num];
      this.setState({ presentQuestionNumber: num, presentQuestion: q });
    }
  };

  onValueChange = (value: string) => {
    const { presentQuestionNumber, presentQuestion } = this.state;
    
    const q = Object.assign({}, presentQuestion);
    q.selectedAnswer = value;

    this.setState({ presentQuestion: q });

    this.questions[presentQuestionNumber].selectedAnswer = value;

    
  }

  submitQuiz = () => {
    let correct = 0;
    for (let i = 0; i < this.questions.length; i++){
      const question = this.questions[i];
      if (question.answer === question.selectedAnswer) {
        correct += 1;
      }
    }
    this.setState({ completed: true, score: correct });
  }

  render() {
    const { presentQuestionNumber, presentQuestion, completed, score } = this.state;
    const { options } = presentQuestion;
    const renderOptions = options.map((option: string) => {
      return { value: option };
    });
    if (!completed) {
      return (
        <View style={[baseStyles.container, styles.container]}>
          <View style={styles.header}>
            <View style={styles.headerInner}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: '400',
                    fontSize: 16,
                    color: ColorPalette.textOnPrimary
                  }}
                >
                  Time left
              </Text>
              </View>
              <CountDown
                until={this.timeAllowed}
                onFinish={this.submitQuiz}
                size={12}
                digitStyle={{ backgroundColor: ColorPalette.primary }}
                digitTxtStyle={{ color: 'white' }}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ m: null, s: null }}
                separatorStyle={{ color: ColorPalette.primary }}
                showSeparator
              />
            </View>
          </View>

          <View style={styles.questionView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ paddingRight: 20 }}>
                <Text style={{ fontSize: 24 }}>
                  {presentQuestionNumber + 1}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {presentQuestion.questions}
                  </Text>
                </View>
                <View style={{ paddingLeft: 20, marginTop: 16 }}>
                  <RadioGroup
                    data={renderOptions}
                    selected={presentQuestion.selectedAnswer}
                    onValueChange={(value: string) => {
                      this.onValueChange(value);
                    }}
                  />
                </View>
              </View>
            </View>
          
          </View>

        
          <View style={styles.controls}>
            <Touchables onPress={this.previousQuestion}>
              <View
                style={{
                  backgroundColor: ColorPalette.secondary,
                  padding: 4,
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                  minWidth: 110,
                  height: 30
                }}
              >
                <MaterialIcons
                  name='skip-previous'
                  size={16}
                  color={ColorPalette.textOnSecondary}
                />
                <Text
                  style={{
                    color: ColorPalette.textOnSecondary,
                    marginLeft: 12,
                    padding: 0,
                    margin: 0,
                    fontSize: 10,
                    textTransform: 'uppercase'
                  }}
                  numberOfLines={1}
                >
                  Previous
              </Text>
              </View>
            </Touchables>

            <Touchables onPress={this.submitQuiz}>
              <View
                style={{
                  padding: 4,
                  borderRadius: 4,
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: ColorPalette.secondaryDark
                }}
              >
                <Text
                  style={{
                    fontWeight: '500',
                    color: ColorPalette.primaryLight
                  }}
                >
                  SUBMIT
              </Text>
              </View>
            </Touchables>

            <Touchables onPress={this.nextQuestion}>
              <View
                style={{
                  backgroundColor: ColorPalette.secondary,
                  padding: 4,
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  width: 110,
                  height: 30
                }}
              >
                <Text
                  style={{
                    color: ColorPalette.textOnSecondary,
                    marginRight: 12,
                    padding: 0,
                    margin: 0,
                    fontSize: 10,
                    textTransform: 'uppercase'
                  }}
                >
                  next
              </Text>
                <MaterialIcons
                  name='skip-next'
                  size={16}
                  color={ColorPalette.textOnSecondary}
                />
              </View>
            </Touchables>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ marginBottom: 30, fontSize: 20 }}>
            Quiz Score
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: ColorPalette.secondary
            }}
          >
            <Text style={{ color: ColorPalette.primary, fontSize: 40 }}>
              {score}
            </Text>
            <View
              style={{
                width: 50,
                borderBottomWidth: 2,
                borderBottomColor: ColorPalette.primaryDark
              }}
            />
            <Text style={{ color: ColorPalette.primary, fontSize: 40 }}>
              {this.questions.length}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { quizSettings } = state;
  return { quizSettings };
};

const styles = StyleSheet.create({
  container: {},
  header: {
    width: '100%',
    backgroundColor: ColorPalette.secondary,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderTopEndRadius: 4,
    borderTopStartRadius: 4
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  questionView: {
    width: '100%',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    borderTopWidth: 0.5,
    borderColor: ColorPalette.secondaryLight
  }
});

export default connect(mapStateToProps)(Quiz);
