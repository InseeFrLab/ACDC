import InstrumentReference from './instrumentReference';
import { TypeOfModeOfCollection } from './typeOfModeOfCollection';
import { UserAttributePairCollection } from './communicationCollectionEvent';

export default interface CollectionEvent {
  id: string;
  agency: string;
  version: number;
  collectionEventName: Record<'fr-FR' | 'en-IE' | string, string>;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  description: Record<'fr-FR' | 'en-IE' | string, string>;
  dataCollectionDate: Record<'startDate' | 'endDate' | string, string>;
  typeOfModeOfCollection: TypeOfModeOfCollection[];
  instrumentReference: InstrumentReference;
  userAttributePair: UserAttributePairCollection[];
}
