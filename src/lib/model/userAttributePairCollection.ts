export interface UserAttributePairCollection {
  attributeKey: string;
  attributeValue: Record<
    'id' | 'type' | 'media' | 'paperQuestionnaire',
    string | boolean
  >[];
}
