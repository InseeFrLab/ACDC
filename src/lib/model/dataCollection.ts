import CollectionEvent from './collectionEvents';
import { UserAttributePair } from './collectionGroups';
import { StudyUnitReference } from './studyUnitReference';

export interface DataCollection {
  id: string;
  agency: string;
  version: number;
  versionDate: string;
  studyUnitReference: StudyUnitReference;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  description: Record<'fr-FR' | 'en-IE' | string, string>;
  collectionEvents?: CollectionEvent[];
  userAttributePair?: UserAttributePair[];
}

export interface DataCollectionRow {
  label: string | (() => string);
  studyUnitReference: string | (() => string);
  groupReference: string | (() => string);
  version: number;
  versionDate: string;
  action: DataCollection;
}
