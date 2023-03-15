import { v4 as uuidv4 } from 'uuid';
import { CollectionRow } from '../model/communicationCollectionEvent';
import InstrumentReference from '../model/instrumentReference';
import LanguageRecord from '../model/languageRecord';

export const createIntlRecord = (
  input: {
    id: number;
    language: string;
    value: string;
  }[]
): LanguageRecord => {
  return input.reduce((map, { language, value }) => {
    map[language] = value;
    return map;
  }, {} as LanguageRecord);
};
export type CommunicationMode = {
  id: number;
  type?: string;
  media?: string;
  paperQuestionnaire?: string;
};
export const createCollectionCommunicationMode = (
  input: CommunicationMode[]
): CollectionRow[] => {
  if (
    input.some(
      ({ type, media, paperQuestionnaire }) =>
        !(type || media || paperQuestionnaire)
    )
  ) {
    return [];
  }

  return input.map((obj) => ({
    id: uuidv4(),
    type: obj.type,
    media: obj.media,
    paperQuestionnaire: obj.paperQuestionnaire
      ? JSON.parse(obj.paperQuestionnaire)
      : null,
  }));
};

export const createInstrumentReference = (
  questionnaire: string,
  questionnaireLabel: string
): InstrumentReference => {
  return {
    id: questionnaire,
    agency: 'fr.insee',
    version: 1,
    typeOfObject: 'Instrument',
    label: questionnaireLabel,
  };
};
