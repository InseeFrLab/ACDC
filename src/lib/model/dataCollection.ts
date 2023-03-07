import CollectionEvent from './collectionEvents';
import { CollectionGroup } from './collectionGroups';
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
  userAttributePair?: CollectionGroup[];
}

export interface DataCollectionRow {
  label: string | (() => string);
  studyUnitReference: string | (() => string);
  groupReference: string | (() => string);
  version: number;
  versionDate: string;
  action: DataCollection;
}
