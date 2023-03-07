import { getAllDataCollections, getDataCollection } from './mockDataCollection';
import getQuestionnaires from './mockQuestionnaires';
import { getAllSeries, getSerieOperation } from './mockSeries';

const createApiMockClient = () => {
  return {
    getAllDataCollections,
    getDataCollection: (id: string) => Promise.resolve(getDataCollection(id)),
    getQuestionnaires,
    getAllSeries,
    getSerieOperation: (id: string) => Promise.resolve(getSerieOperation(id)),
  };
};
export default createApiMockClient;
