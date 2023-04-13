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
function isCollectionGroupItem(value: any): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'attributeKey' in value &&
    'attributeValue' in value
  );
}
export function isCollectionGroup(value: any): value is CollectionGroup[] {
  return (
    Array.isArray(value) && value.every((item) => isCollectionGroupItem(item))
  );
}
