/* eslint-disable @typescript-eslint/no-unsafe-argument */
import StatisticalSeries from '@/lib/model/statisticalSeries';
import { StudyUnitReference } from '../../model/studyUnitReference';
import { transformLabels } from '../../utils/magmaUtils';

export function getAllSeries(): Promise<StatisticalSeries[]> {
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/external/magma/series`
  ).then((response) => {
    if (response.ok) {
      const series = [] as StatisticalSeries[];
      response.json().then((json) => {
        json.forEach((serie: any) => {
          series.push({
            id: serie.id,
            label: transformLabels(serie.label),
            altLabel: serie.altlabel ? transformLabels(serie.altlabel) : {},
          });
        });
        return series;
      });
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
              : {},
          });
        });
        return operations;
      });
    }
    throw new Error(`Error while fetching operations for serie ${id}`);
  });
}
