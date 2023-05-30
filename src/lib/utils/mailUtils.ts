// import Courrier from '@/assets/mockData/courrier.xml';
import { XMLSerializer } from 'xmldom';

const getMockCourrier = async () => {
  try {
    const response = await fetch('courrier.xml');
    const xmlString = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    return xmlDoc;
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
};
const replaceLabel = async (label: string) => {
  try {
    const xmlDocument = await getMockCourrier();
    const xmlString = new XMLSerializer().serializeToString(xmlDocument);
    const updatedXmlString: string = xmlString.replace(
      // eslint-disable-next-line no-template-curly-in-string
      '${Enq_LibelleEnquete}',
      label
    );
    return updatedXmlString;
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
};
export default replaceLabel;
