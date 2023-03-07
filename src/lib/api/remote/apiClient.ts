/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import StatisticalSeries from '@/lib/model/statisticalSeries';
import DataCollectionApi from '@/lib/model/dataCollectionApi';
import { PoguesQuestionnaireResponse } from '@/lib/model/poguesQuestionnaire';
import { transformLabels } from '@/lib/utils/magmaUtils';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../fetch/requests';

const createApiClient = (baseUrl: string) => {
  return {
    getQuestionnaires: (): Promise<PoguesQuestionnaireResponse[]> =>
      getRequest(`${baseUrl}api/external/pogues/questionnaire`),
    getAllSeries: (): Promise<any[]> =>
      getRequest(`${baseUrl}api/external/magma/series`),
    getSerieOperation: (id: string): Promise<StatisticalSeries[]> => {
      const operations = [] as StatisticalSeries[];
      getRequest(`${baseUrl}api/external/magma/operations/${id}`).then(
        (jsonBody) => {
          jsonBody.forEach((operation: any) => {
            operations.push({
              id: operation.id,
              label: transformLabels(operation.label),
              altLabel: operation.altlabel
                ? transformLabels(operation.altlabel)
                : {},
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
    updateDataCollection: (dataCollectionApi: DataCollectionApi) =>
      putRequest(`${baseUrl}api/data-collections/`, dataCollectionApi),
    deleteDataCollection: (id: string) =>
      deleteRequest(`${baseUrl}api/data-collections/${id}`),
  };
};

export default createApiClient;
