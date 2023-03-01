import { v4 as uuidv4 } from 'uuid';
import { UserAttributePairCollectionRow } from '../model/communicationCollectionEvent';
import InstrumentReference from '../model/instrumentReference';

export const createIntlRecord = (
  input: {
    id: number;
    language: string;
    value: string;
  }[]
): Record<'fr-FR' | 'en-IE' | string, string> => {
  const record = input.reduce(
    (map: Record<'fr-FR' | 'en-IE' | string, string>, obj) => {
      map[obj.language] = obj.value;
      return map;
    },
    {}
  );
  return record;
};

export const createCollectionCommunicationMode = (
  input: {
    id: number;
    type: string;
    media: string;
    paperQuestionnaire: string;
  }[]
): UserAttributePairCollectionRow[] => {
  return input.map((obj) => ({
    id: uuidv4(),
    type: obj.type,
    media: obj.media,
    paperQuestionnaire: JSON.parse(obj.paperQuestionnaire),
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
