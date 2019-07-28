import { QuizSettingsAction } from "../../utils/constants/action-types";
import { IQuizParamSettings } from "../interfaces";

export const setQuizSettings = (payload: IQuizParamSettings): object => {
  return { type: QuizSettingsAction.setQuizSettings, payload }
}
