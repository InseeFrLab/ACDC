import LanguageRecord from './languageRecord';

export class StudyUnitReference {
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
