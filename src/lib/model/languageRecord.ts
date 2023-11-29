export default class LanguageRecord {
  'fr-FR': string;

  'en-IE': string;

  constructor(frFR: string, enIE: string) {
    this['fr-FR'] = frFR;
    this['en-IE'] = enIE;
  }

  // dirty parsing
  toString(): string {
    return `{"fr-FR": "${this['fr-FR']}", "en-IE": "${this['en-IE']}"}`;
  }
}
