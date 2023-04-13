export interface CollectionCommunication {
  attributeKey: string;
  attributeValue: CollectionRow[];
}

export interface CollectionRow {
  id: string;
  type: string;
  media: string;
  paperQuestionnaire: boolean;
}

function isCollectionCommunicationItem(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'attributeKey' in value &&
    'attributeValue' in value
  );
}
export function isCollectionCommunication(
  value: unknown
): value is CollectionRow[] {
  return (
    Array.isArray(value) &&
    value.every((item) => isCollectionCommunicationItem(item))
  );
}
