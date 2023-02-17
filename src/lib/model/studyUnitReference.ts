export interface StudyUnitReference {
  id: string;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  typeOfObject: string;
  groupReference: GroupReference;
}

export interface GroupReference {
  id: string;
  label: Record<'fr-FR' | 'en-IE' | string, string>;
  typeOfObject: string;
}
