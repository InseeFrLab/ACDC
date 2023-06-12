/* eslint-disable no-template-curly-in-string */
import { XMLSerializer } from 'xmldom';

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
const replaceLabel = async (label: string) => {
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

export default replaceLabel;
