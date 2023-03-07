export interface UserAttributePair {
  attributeKey: string;
  attributeValue: UserAttributePairValue[];
}

export interface UserAttributePairValue {
  id: string;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  collectionEventReference: Record<'id', string>[];
}