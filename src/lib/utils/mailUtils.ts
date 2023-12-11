import { DataCollection } from '@/lib/model/dataCollection';
/* eslint-disable no-template-curly-in-string */
import { XMLSerializer } from 'xmldom';
import { CollectionGroup } from '../model/collectionGroups';
import Mail, { MailVariables } from '../model/mail';

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
    Enq_ParutionJo: 'non',
    Enq_DateParutionJo: '',
    Enq_ServiceCollecteurSignataireNom: '',
    Enq_ServiceCollecteurSignataireFonction: '',
    Enq_MailRespOperationnel: '',
    Enq_LibelleEnquete: '',
    Enq_CaractereObligatoire: 'non',
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
            userAttribute.attributeValue === 'true' ? 'oui' : 'non';
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
        case 'extension:surveyStatus':
          // eslint-disable-next-line no-case-declarations
          const escapedValue = userAttribute.attributeValue.replace(
            /'/g,
            "\\\\'"
          );
          try {
            const json = JSON.parse(escapedValue);
            console.log('json', json);
            if (json.code === 'C' || json.code === 'T') {
              mailVariables.Enq_CaractereObligatoire = 'oui';
            } else {
              mailVariables.Enq_CaractereObligatoire = 'non';
            }
          } catch (error) {
            console.error(error);
          }
          break;
        default:
          break;
      }
    }
  });
  mailVariables.Enq_LibelleEnquete =
    dataCollection.studyUnitReference.label['fr-FR'];

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
    return JSON.stringify(mail);
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
};
