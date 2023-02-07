export interface UserAttributePairCollection {
  attributeKey: string;
  attributeValue: UserAttributePairCollectionRow[];
}

export interface UserAttributePairCollectionRow {
  id: string;
  type: string;
  media: string;
  paperQuestionnaire: boolean;
}
