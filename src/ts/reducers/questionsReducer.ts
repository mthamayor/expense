import { IQuestions } from '../interfaces';

interface Action {
  type: string;
  payload?: null;
}


const questionsState: IQuestions[] = [
];

const questionsReducer = (state = questionsState, action: Action): IQuestions[] => {
  return state;
};

export default questionsReducer;