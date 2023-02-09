export interface PoguesQuestionnaire {
  id: string;
  label: string;
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
