export interface CollectionGroup {
  attributeKey: string;
  attributeValue: CollectionGroupValue[];
}

export interface CollectionGroupValue {
  id: string;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  collectionEventReference: Record<'id', string>[];
}
