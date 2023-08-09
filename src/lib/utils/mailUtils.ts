/* eslint-disable no-template-curly-in-string */
import { XMLSerializer } from 'xmldom';
import { DataCollection } from '../model/dataCollection';
import MailVariables from '../model/mailVariables';
import { UserAttributePair } from '../model/userAttributePair';
import { CollectionGroup } from '../model/collectionGroups';

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
export const replaceLabel = async (label: string) => {
  // Temp while waiting for real datamodel
  try {
    const xmlDocument = await getMockCourrier();
    const xmlString = new XMLSerializer().serializeToString(xmlDocument);
    const updatedXmlString: string = xmlString.replace(
      '${Enq_LibelleEnquete}',
      label
    );
    // console.log('Update XML string', updatedXmlString);
    return updatedXmlString;
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
        case 'Enq_AnneeVisa':
          mailVariables.Enq_AnneeVisa = userAttribute.attributeValue;
          break;
        case 'Enq_MinistereTutelle':
          mailVariables.Enq_MinistereTutelle = userAttribute.attributeValue;
          break;
        case 'Enq_ParutionJo':
          mailVariables.Enq_ParutionJo =
            userAttribute.attributeValue === 'true';
          break;
        case 'Enq_DateParutionJo':
          mailVariables.Enq_DateParutionJo = userAttribute.attributeValue;
          break;
        case 'Enq_ServiceCollecteurSignataireNom':
          mailVariables.Enq_ServiceCollecteurSignataireNom =
            userAttribute.attributeValue;
          break;
        case 'Enq_ServiceCollecteurSignataireFonction':
          mailVariables.Enq_ServiceCollecteurSignataireFonction =
            userAttribute.attributeValue;
          break;
        case 'Enq_MailRespOperationnel':
          mailVariables.Enq_MailRespOperationnel = userAttribute.attributeValue;
          break;
        default:
          break;
      }
    }
  });

  return mailVariables;
};
