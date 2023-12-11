import CollectionEvent from './collectionEvents';
import { CollectionGroup } from './collectionGroups';
import { StudyUnitReference } from './studyUnitReference';
import LanguageRecord from './languageRecord';
import { UserAttributePair } from './userAttributePair';

export class DataCollection {
  id: string;

  agency: string;

  version: number;

  versionDate: string;

  studyUnitReference: StudyUnitReference;

  label: LanguageRecord;

  description: LanguageRecord;

  collectionEvents?: CollectionEvent[];

  userAttributePair?: (CollectionGroup | UserAttributePair)[];
}

export interface DataCollectionRow {
  label: string | (() => string);
  studyUnitReference: string | (() => string);
  groupReference: string | (() => string);
  version: number;
  versionDate: string;
  action: DataCollection;
}

// TODO: Find better implementation?
export interface DataCollectionApi {
	id: string;

	json: DataCollection;
}
