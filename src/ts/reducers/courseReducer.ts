import { ICourseState } from '../interfaces';

interface Action {
  type: string;
  payload?: null;
}


const coursesState: ICourseState[] = [
  {
    id: 1,
    title: 'Environmental pollution',
    lessonUri: 'https://mthamayor.github.io/app-software/#/env_pollution', 
  },
  {
    id: 2,
    title: 'Characteristics of living things',
    lessonUri: 'https://mthamayor.github.io/app-software/#/living_things',
  },
  {
    id: 3,
    title: 'Acids',
    lessonUri: 'https://mthamayor.github.io/app-software/#/acids',
  }
];

const coursesReducer = (state = coursesState, action: Action): object | object[] => {
  return state;
};

export default coursesReducer;