export default class Mail {
	xml: string;

	mailVariable: MailVariables;

	constructor(xml: string, mailVariable: MailVariables) {
		this.xml = xml;
		this.mailVariable = mailVariable;
	}
}

export interface MailVariables {
	Enq_AnneeVisa: string;

	Enq_MinistereTutelle: string;

	Enq_ParutionJo: string;

	Enq_DateParutionJo: string;

	Enq_ServiceCollecteurSignataireNom: string;

	Enq_ServiceCollecteurSignataireFonction: string;

	Enq_MailRespOperationnel: string;

	Enq_LibelleEnquete: string;

	Enq_CaractereObligatoire: string;
}
