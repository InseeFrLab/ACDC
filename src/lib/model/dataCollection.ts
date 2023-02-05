import CollectionEvent from './collectionEvents';
import { UserAttributePair } from './userAttributePair';

export interface DataCollection {
  id: string;
  agency: string;
  version: number;
  versionDate: string;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  description: Record<'fr-FR' | 'en-IE' | string, string>;
  collectionEvents?: CollectionEvent[];
  userAttributePair?: UserAttributePair[];
}

export interface DataCollectionRow {
  id: string;
  label: string | (() => string);
  version: number;
  versionDate: string;
  action: DataCollection;
}
