export default class MailVariables {
  Enq_AnneeVisa: string;

  Enq_MinistereTutelle: string;

  Enq_ParutionJo: string;

  Enq_DateParutionJo: string;

  Enq_ServiceCollecteurSignataireNom: string;

  Enq_ServiceCollecteurSignataireFonction: string;

  Enq_MailRespOperationnel: string;

  Enq_LibelleEnquete: string;

  Enq_CaractereObligatoire: string;

  constructor(
    Enq_AnneeVisa: string,
    Enq_MinistereTutelle: string,
    Enq_ParutionJo: string,
    Enq_DateParutionJo: string,
    Enq_ServiceCollecteurSignataireNom: string,
    Enq_ServiceCollecteurSignataireFonction: string,
    Enq_MailRespOperationnel: string,
    Enq_LibelleEnquete: string,
    Enq_CaractereObligatoire: string
  ) {
    this.Enq_AnneeVisa = Enq_AnneeVisa;
    this.Enq_MinistereTutelle = Enq_MinistereTutelle;
    this.Enq_ParutionJo = Enq_ParutionJo;
    this.Enq_DateParutionJo = Enq_DateParutionJo;
    this.Enq_ServiceCollecteurSignataireNom =
      Enq_ServiceCollecteurSignataireNom;
    this.Enq_ServiceCollecteurSignataireFonction =
      Enq_ServiceCollecteurSignataireFonction;
    this.Enq_MailRespOperationnel = Enq_MailRespOperationnel;
    this.Enq_LibelleEnquete = Enq_LibelleEnquete;
    this.Enq_CaractereObligatoire = Enq_CaractereObligatoire;
  }
}