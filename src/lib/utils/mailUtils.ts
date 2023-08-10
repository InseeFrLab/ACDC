import { DataCollection } from '@/lib/model/dataCollection';
/* eslint-disable no-template-curly-in-string */
import { XMLSerializer } from 'xmldom';
import MailVariables from '../model/mailVariables';
import { CollectionGroup } from '../model/collectionGroups';
import Mail from '../model/mail';

const getMockCourrier = async () => {
  try {
    const response = await fetch('../courrier.xml').then((res) => res.text());
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    // console.log('XML document', xmlDoc);
    return xmlDoc;
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
};

export const createMailVariable = (
  dataCollection: DataCollection
): MailVariables => {
  const mailVariables: MailVariables = {
    Enq_AnneeVisa: '',
    Enq_MinistereTutelle: '',
    Enq_ParutionJo: false,
    Enq_DateParutionJo: '',
    Enq_ServiceCollecteurSignataireNom: '',
    Enq_ServiceCollecteurSignataireFonction: '',
    Enq_MailRespOperationnel: '',
  };

  const { userAttributePair = [] } = dataCollection;

  userAttributePair.forEach((value) => {
    if (!(value instanceof CollectionGroup)) {
      const userAttribute = value;

      switch (userAttribute.attributeKey) {
        case 'extension:anneeVisa':
          mailVariables.Enq_AnneeVisa = userAttribute.attributeValue;
          break;
        case 'extension:ministereTutelle':
          mailVariables.Enq_MinistereTutelle = userAttribute.attributeValue;
          break;
        case 'extension:parutionJO':
          mailVariables.Enq_ParutionJo =
            userAttribute.attributeValue === 'true';
          break;
        case 'extension:dateParutionJO':
          mailVariables.Enq_DateParutionJo = userAttribute.attributeValue;
          break;
        case 'extension:serviceCollecteurSignataireNom':
          mailVariables.Enq_ServiceCollecteurSignataireNom =
            userAttribute.attributeValue;
          break;
        case 'extension:serviceCollecteurSignataireFonction':
          mailVariables.Enq_ServiceCollecteurSignataireFonction =
            userAttribute.attributeValue;
          break;
        case 'extension:mailResponsableOperationel':
          mailVariables.Enq_MailRespOperationnel = userAttribute.attributeValue;
          break;
        default:
          break;
      }
    }
  });

  return mailVariables;
};

export const generateMailData = async (
  dataCollection: DataCollection
): Promise<string> => {
  // Temp while waiting for real datamodel
  try {
    const xmlDocument = await getMockCourrier();
    const xmlString = new XMLSerializer().serializeToString(xmlDocument);
    const mailVariables = createMailVariable(dataCollection);
    const mail = new Mail(xmlString, mailVariables);
    console.log('Mail', mail);
    return JSON.stringify(mail);
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
};
