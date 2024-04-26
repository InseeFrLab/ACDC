import MailVariables from './mailVariables';

export default class Mail {
  xml: string;

  mailVariable: MailVariables;

  constructor(xml: string, mailVariable: MailVariables) {
    this.xml = xml;
    this.mailVariable = mailVariable;
  }
}
