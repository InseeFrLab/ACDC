/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Params } from 'react-router-dom';
import {
  UserAttributePair,
  isUserAttributePair,
} from '@/lib/model/userAttributePair';
import { isCollectionGroup } from '@/lib/model/collectionGroups';
import { DataCollection } from '@/lib/model/dataCollection';
import CollectionEvent from '@/lib/model/collectionEvents';
import { isCollectionCommunication } from '@/lib/model/communicationCollectionEvent';
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
  return fetch(`${import.meta.env.VITE_API_BASE_URL}api/data-collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataCollectionApi),
  }).then((response) => response.json());
}

export function updateDataCollection(
  dataCollectionApi: DataCollectionApi
): Promise<DataCollectionApi> {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}api/data-collections`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataCollectionApi),
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
// TODO : Move it elsewhere
export const flattenCollectionGroups = (
  dataCollectionObject: DataCollection
) => {
  const flattenedUserAttributePairs: UserAttributePair[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const userAttribute of dataCollectionObject.userAttributePair || []) {
    if (isCollectionGroup(userAttribute)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const groupValue of userAttribute.attributeValue) {
        flattenedUserAttributePairs.push({
          attributeKey: userAttribute.attributeKey,
          attributeValue: JSON.stringify(groupValue),
        });
      }
    } else if (isUserAttributePair(userAttribute)) {
      flattenedUserAttributePairs.push(userAttribute);
    }
  }
  console.log('flattenedUserAttributePairs: ', flattenedUserAttributePairs);
  return {
    ...dataCollectionObject,
    userAttributePair: flattenedUserAttributePairs,
  };
};

export const flattenCollectionCommunication = (
  collectionEventObject: CollectionEvent
) => {
  const flattenedUserAttributePairs: UserAttributePair[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const userAttribute of collectionEventObject.userAttributePair || []) {
    if (isCollectionCommunication(userAttribute)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const groupValue of userAttribute.attributeValue) {
        flattenedUserAttributePairs.push({
          attributeKey: userAttribute.attributeKey,
          attributeValue: JSON.stringify(groupValue),
        });
      }
    } else if (isUserAttributePair(userAttribute)) {
      flattenedUserAttributePairs.push(userAttribute);
    }
  }
  console.log('flattenedUserAttributePairs: ', flattenedUserAttributePairs);
  return {
    ...collectionEventObject,
    userAttributePair: flattenedUserAttributePairs,
  };
};
