import { combineReducers } from 'redux';
import coursesReducer from './courseReducer';
import questionsReducer from './questionsReducer';
import quizSettingsReducer from './quizSettingsReducer';

const rootReducer = combineReducers({
  courses: coursesReducer, questions: questionsReducer, quizSettings: quizSettingsReducer
});

export default rootReducer;
