import { rest } from 'msw';
import allDC from '@/assets/mockData/allDC.json';
import oneDC from '@/assets/mockData/oneDC.json';
import allQuestionnaires from '@/assets/mockData/allQuestionnaires.json';
import allSeries from '@/assets/mockData/allSeries.json';
import s1001 from '@/assets/mockData/s1001.json';

const handlers = [
  rest.get('/api/data-collections', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allDC));
  }),
  rest.get(
    '/api/data-collections/db7666e6-6162-4fc4-83c8-78ad85fba606',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(oneDC));
    }
  ),
  rest.get('/api/external/pogues/questionnaire', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allQuestionnaires));
  }),
  rest.get('/api/external/magma/series', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(allSeries));
  }),
  rest.get('/api/external/operations/s1001', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(s1001));
  }),
  rest.post('api/data-collections', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.put('api/data-collections', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

export default handlers;
