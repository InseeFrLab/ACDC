import InstrumentReference from './instrumentReference';
import { TypeOfModeOfCollection } from './typeOfModeOfCollection';
import { CollectionCommunication } from './communicationCollectionEvent';
import { UserAttributePair } from './userAttributePair';
import LanguageRecord from './languageRecord';

export default class CollectionEvent {
  id: string;

  agency: string;

  version: number;

  collectionEventName: LanguageRecord;

  label: LanguageRecord;

  description: LanguageRecord;

  dataCollectionDate: Record<'startDate' | 'endDate' | string, string>;

  typeOfModeOfCollection: TypeOfModeOfCollection[];

  instrumentReference: InstrumentReference;

  userAttributePair: CollectionCommunication[] | UserAttributePair[];
}
