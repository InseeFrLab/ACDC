import LanguageRecord from './languageRecord';

export interface StudyUnitReference {
  id: string;
  label: LanguageRecord;
  typeOfObject: string;
  groupReference: GroupReference;
}

export interface GroupReference {
  id: string;
  label: LanguageRecord;
  typeOfObject: string;
}
