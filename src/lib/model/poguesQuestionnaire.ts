export class PoguesQuestionnaire {
  id: string;

  label: string;

  date: string;

  constructor(id: string, label: string, date: string) {
    this.id = id;
    this.label = label;
    this.date = date;
  }
}

export interface PoguesQuestionnaireResponse {
  owner: string;
  ComponentGroup: unknown[];
  agency: string;
  genericeName: string;
  Label: string[];
  Name: string;
  Variables: unknown;
  lastUpdatedDate: string;
  DataCollection: unknown[];
  final: boolean;
  flowLogic: string;
  id: string;
  TargetMode: string[];
  CodeLists: unknown;
  Iterations: unknown;
  Child: unknown;
}
