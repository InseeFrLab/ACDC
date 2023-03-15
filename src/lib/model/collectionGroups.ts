import LanguageRecord from './languageRecord';

export interface CollectionGroup {
  attributeKey: string;
  attributeValue: CollectionGroupValue[];
}

export interface CollectionGroupValue {
  id: string;
  label: LanguageRecord;
  collectionEventReference: Record<'id', string>[];
}
