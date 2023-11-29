/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PoguesQuestionnaireResponse } from '../../model/poguesQuestionnaire';

export default function getQuestionnaires(): Promise<
  PoguesQuestionnaireResponse[]
> {
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/external/pogues/questionnaire`
  ).then((response) => response.json());
}
