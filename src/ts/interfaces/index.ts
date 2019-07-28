export interface ICourseState {
  id: number;
  title: string;
  lessonUri: string;
}

export interface IRootReducer {
  courses: ICourseState[];
  questions: IQuestions[];
  quizSettings: IQuizSettings;

}

export interface IQuestions {
  questions: string;
  options: string[];
  answer: string;
}

export interface IQuizParamSettings {
  name: string,
  value: number | boolean
}

export interface IQuizSettings {
  timeAllowed: number;
  questions: number;
  shuffleOptions: boolean;
}

export interface IIntegerObjectValue<T> {
  value: T;
}