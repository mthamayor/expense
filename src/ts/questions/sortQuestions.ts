import envPollution from './env-pollution.json';
import livingThings from './living-things.json';
import acids from './acids.json';
import { IQuestions } from './../interfaces';


const sortQuestions = (topicReceived: number, no: number, shuffled: boolean): IQuestions[] => {
  let topic: IQuestions[];

  if (topicReceived === 1) {
    topic = envPollution.map(question => question);
  } else if (topicReceived === 3) {
    topic = acids.map(question => question);
  } else if (topicReceived === 2) {
    topic = livingThings.map(question => question);
  }

  topic = shuffleArray(topic);
  topic = topic.slice(0, no);

  if (shuffled) {
    for (let i = 0; i < topic.length; i++) {
      const presentQuestion: IQuestions = topic[i];
      let { options } = presentQuestion;
      options = options.map(option => option);
      options = shuffleArray(options);
      topic[i].options = options;
    }
  }
  return topic;
};

const shuffleArray = <T>(a: T[]) => {
  
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
};

export default sortQuestions;
