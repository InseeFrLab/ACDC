/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import StatisticalSeries from '@/lib/model/statisticalSeries';
import { PoguesQuestionnaireResponse } from '@/lib/model/poguesQuestionnaire';
import { transformLabels } from '@/lib/utils/magmaUtils';
import LanguageRecord from '@/lib/model/languageRecord';
import {
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
} from '../fetch/requests';
import { DataCollectionApi } from '@/lib/model/dataCollection';

const createApiClient = (baseUrl: string) => {
  return {
    getQuestionnaires: (): Promise<PoguesQuestionnaireResponse[]> =>
      getRequest(`${baseUrl}api/external/pogues/questionnaire`),
    getAllSeries: (): Promise<any[]> =>
      getRequest(`${baseUrl}api/external/magma/series`),
    getSerieOperation: async (id: string): Promise<StatisticalSeries[]> => {
      const operations = [] as StatisticalSeries[];
      getRequest(`${baseUrl}api/external/magma/operations/${id}`).then(
        (jsonBody) => {
          jsonBody.forEach((operation: any) => {
            const altLabel: LanguageRecord = operation.altlabel
              ? transformLabels(operation.altlabel)
              : { 'fr-FR': '', 'en-IE': '' };
            operations.push({
              id: operation.id,
              label: transformLabels(operation.label),
              altLabel,
            });
          });

          return operations;
        }
      );
      return Promise.resolve(operations);
    },
    getAllDataCollections: (): Promise<DataCollectionApi[]> =>
      getRequest(`${baseUrl}api/data-collections`),
    getDataCollection: async (id: string): Promise<DataCollectionApi> =>
      getRequest(`${baseUrl}api/data-collections/${id}`),
    createDataCollection: async (dataCollectionApi: DataCollectionApi) => {
      const response = await postRequest(
        `${baseUrl}api/data-collections`,
        dataCollectionApi
      );
      const data = await response.json();
      return data;
    },
    updateDataCollection: async (dataCollectionApi: DataCollectionApi) =>
      putRequest(`${baseUrl}api/data-collections/`, dataCollectionApi),
    deleteDataCollection: async (id: string) =>
      deleteRequest(`${baseUrl}api/data-collections/${id}`),
    publishDataCollection: async (id: string): Promise<unknown> =>
      getRequest(`${baseUrl}api/external/publish/${id}`),
    createPdfFromXml: async (xmlString: string): Promise<unknown> =>
      postRequest(`${baseUrl}api/external/mail/generate/fo`, xmlString),
  };
};

export default createApiClient;
