import CollectionGroupValue from './collectionGroupValue';
import LanguageRecord from './languageRecord';

export class CollectionGroup {
  attributeKey: string;

  attributeValue: CollectionGroupValue[];
}

function isCollectionGroupItem(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'attributeKey' in value &&
    'attributeValue' in value
  );
}
export function isCollectionGroup(value: unknown): value is CollectionGroup[] {
  return (
    Array.isArray(value) && value.every((item) => isCollectionGroupItem(item))
  );
}
