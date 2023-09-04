import { v4 as uuidv4 } from 'uuid';
import InstrumentReference from '../model/instrumentReference';
import LanguageRecord from '../model/languageRecord';
import CollectionRow from '../model/collectionRow';

export const createIntlRecord = (
  input: {
    id: number;
    language: string;
    value: string;
  }[]
): LanguageRecord => {
  const intlRecord = new LanguageRecord('', '');

  input.forEach(({ language, value }) => {
    (intlRecord as any)[language] = value;
  });

  return intlRecord;
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

export const downloadFile = (
  data: string,
  fileName: string,
  fileType: string
) => {
  const blob = new Blob([data], { type: fileType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};
