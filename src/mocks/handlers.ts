import { http, HttpResponse } from 'msw';
import allDC from '@/assets/mockData/allDC.json';
import oneDC from '@/assets/mockData/oneDC.json';
import allQuestionnaires from '@/assets/mockData/allQuestionnaires.json';
import allSeries from '@/assets/mockData/allSeries.json';
import s1001 from '@/assets/mockData/s1001.json';

const handlers = [
  http.get('/api/data-collections', () => HttpResponse.json(allDC)),
  http.get('/api/data-collections/db7666e6-6162-4fc4-83c8-78ad85fba606', () => HttpResponse.json(oneDC)),
  http.get('/api/external/pogues/questionnaire', () => HttpResponse.json(allQuestionnaires)),
  http.get('/api/external/magma/series', () => HttpResponse.json(allSeries)),
  http.get('/api/external/operations/s1001', () => HttpResponse.json(s1001)),
  http.post('/api/data-collections', () => new HttpResponse(null, { status: 401 })),
  http.put('/api/data-collections', () => new HttpResponse(null, { status: 401 })),
];

export default handlers;
