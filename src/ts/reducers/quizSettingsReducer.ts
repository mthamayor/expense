import { IQuestions, IQuizSettings, IQuizParamSettings } from '../interfaces';
import { QuizSettingsAction } from '../../utils/constants/action-types';

interface Action {
  type: string;
  payload: IQuizParamSettings;
}

const questionSettings: IQuizSettings = {
  timeAllowed: 3,
  questions: 10,
  shuffleOptions: false 
};

const quizSettingsReducer = (state = questionSettings, action: Action): IQuizSettings => {
  const { type, payload } = action;

  if (type === QuizSettingsAction.setQuizSettings) {
    return Object.assign({}, state, {
      [payload.name]: payload.value
    });
  }

  return state;
};

export default quizSettingsReducer;