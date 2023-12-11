export default class CodeList {
  label: string;

  code: string;

  constructor(label: string, code: string) {
    this.label = label;
    this.code = code;
  }

  // dirty parsing
  toString(): string {
    return `{"label": ${this.label.toString()}, "code": "${this.code}"}`;
  }

  static fromString(jsonString: string): CodeList {
    const escapedValue = jsonString
      .replace(/\\/g, '"')
      .replace(/'/g, "\\'")
      .replace(/\\/g, '\\\\');
    console.log('escapedValue', escapedValue);
    try {
      const { label, code }: { label: string; code: string } =
        JSON.parse(escapedValue);
      return new CodeList(label, code);
    } catch (error) {
      console.error(error);
      return new CodeList('', '');
    }
  }
}
export interface CodeListValue {
	label: string;

	code: string;
}
