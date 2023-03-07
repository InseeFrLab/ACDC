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
