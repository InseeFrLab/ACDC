/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import StatisticalSeries from '@/lib/model/statisticalSeries';
import LanguageRecord from '@/lib/model/languageRecord';
import { transformLabels } from '../../utils/magmaUtils';

export function getAllSeries(): Promise<any[]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/external/magma/series`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error while fetching series');
  });
}

export function getSerieOperation(id: string): Promise<StatisticalSeries[]> {
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/external/magma/operations/${id}`
  ).then((response) => {
    if (response.ok) {
      const operations = [] as StatisticalSeries[];
      response.json().then((json) => {
        json.forEach((operation: any) => {
          operations.push({
            id: operation.id,
            label: transformLabels(operation.label),
            altLabel: operation.altlabel
              ? transformLabels(operation.altlabel)
              : ({ 'fr-FR': '', 'en-IE': '' } as LanguageRecord),
          });
        });
        return operations;
      });
    }
    throw new Error(`Error while fetching operations for serie ${id}`);
  });
}
