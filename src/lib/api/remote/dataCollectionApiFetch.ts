/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Params } from 'react-router-dom';
import { flattenUserAttributeFromDataCollectionApi } from '@/lib/utils/dataCollectionUtils';
import DataCollectionApi from '../../model/dataCollectionApi';

export function getDataCollection(
  id: Readonly<Params<string>>
): Promise<DataCollectionApi> {
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/data-collections/${id}`
  ).then((response) => response.json());
}

export async function getAllDataCollections(): Promise<DataCollectionApi[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/data-collections`
  );
  return response.json();
}

export function getDataCollectionById(id: string): Promise<DataCollectionApi> {
  return fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/data-collections/${id}`
  ).then((response) => response.json());
}

export async function createDataCollection(
  dataCollectionApi: DataCollectionApi
): Promise<DataCollectionApi> {
  const flattenDataCollection: DataCollectionApi =
    flattenUserAttributeFromDataCollectionApi(dataCollectionApi);
  return fetch(`${import.meta.env.VITE_API_BASE_URL}api/data-collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flattenDataCollection),
  }).then((response) => response.json());
}

export function updateDataCollection(
  dataCollectionApi: DataCollectionApi
): Promise<DataCollectionApi> {
  const flattenDataCollection: DataCollectionApi =
    flattenUserAttributeFromDataCollectionApi(dataCollectionApi);
  return fetch(`${import.meta.env.VITE_API_BASE_URL}api/data-collections`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flattenDataCollection),
  }).then((response) => response.json());
}

export function deleteDataCollection(id: string) {
  try {
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}api/data-collections/${id}`,
      {
        method: 'DELETE',
      }
    );
  } catch (error) {
    console.error('Error while deleting data collection: ', error);
    throw error;
  }
}
