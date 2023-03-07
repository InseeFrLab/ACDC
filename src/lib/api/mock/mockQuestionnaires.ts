import allQuestionnaires from '@/assets/mockData/allQuestionnaires.json';

const getQuestionnaires = (): Promise<unknown[]> => {
  return Promise.resolve(allQuestionnaires);
};

export default getQuestionnaires;
