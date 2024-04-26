import LanguageRecord from './languageRecord';

export default class CollectionGroupValue {
  collectionEventReference?: { id: string }[];

  id?: string;

  label?: LanguageRecord;
}
