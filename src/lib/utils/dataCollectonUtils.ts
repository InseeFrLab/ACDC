/* eslint-disable no-restricted-syntax */
import DataCollectionApi from '../model/dataCollectionApi';
import { DataCollection } from '../model/dataCollection';
import {
  UserAttributePair,
  isUserAttributePair,
} from '../model/userAttributePair';
import { CollectionGroup } from '../model/collectionGroups';
import CollectionEvent from '../model/collectionEvents';
import { CollectionCommunication } from '../model/communicationCollectionEvent';

export const flattenCollectionGroups = (
  dataCollectionObject: DataCollection
) => {
  const flattenedUserAttributePairs: UserAttributePair[] = [];

  for (const userAttribute of dataCollectionObject.userAttributePair || []) {
    if (Array.isArray(userAttribute.attributeValue)) {
      for (const groupValue of userAttribute.attributeValue) {
        flattenedUserAttributePairs.push({
          attributeKey: userAttribute.attributeKey,
          attributeValue: JSON.stringify(groupValue),
        });
      }
    }
  }
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
    if (Array.isArray(userAttribute.attributeValue)) {
      for (const groupValue of userAttribute.attributeValue) {
        flattenedUserAttributePairs.push({
          attributeKey: userAttribute.attributeKey,
          attributeValue: JSON.stringify(groupValue),
        });
      }
    }
  }
  return {
    ...collectionEventObject,
    userAttributePair: flattenedUserAttributePairs,
  };
};

export const flattenUserAttributeFromDataCollectionApi = (
  dataCollectionApi: DataCollectionApi
): DataCollectionApi => {
  const dataCollectionFlattenGroup: DataCollection = flattenCollectionGroups(
    dataCollectionApi.json
  );
  console.log(
    'flattenedUserAttributePairs CollectionGroup: : ',
    dataCollectionFlattenGroup
  );
  const dataCollectionFlattenCommunication: CollectionEvent[] =
    dataCollectionFlattenGroup.collectionEvents?.map((collectionEvent) => {
      const flattenCollectionEvent: CollectionEvent =
        flattenCollectionCommunication(collectionEvent);
      return flattenCollectionEvent;
    }) || [];
  console.log(
    'dataCollectionFlattenCommunication: ',
    dataCollectionFlattenCommunication
  );
  const flattenedDataCollectionObject: DataCollection = {
    ...dataCollectionFlattenGroup,
    collectionEvents: dataCollectionFlattenCommunication,
  };
  const response: DataCollectionApi = {
    ...dataCollectionApi,
    json: flattenedDataCollectionObject,
  };
  console.log('Flattened dataCollectionApi: ', response);
  return response;
};

export const parseCollectionGroups = (dataCollectionObject: DataCollection) => {
  const collectionGroups: CollectionGroup[] = [];
  for (const userAttribute of dataCollectionObject.userAttributePair || []) {
    if (isUserAttributePair(userAttribute)) {
      const collectionGroup: CollectionGroup = {
        attributeKey: userAttribute.attributeKey,
        attributeValue: JSON.parse(userAttribute.attributeValue),
      };
      collectionGroups.push(collectionGroup);
    }
  }
  return {
    ...dataCollectionObject,
    userAttributePair: collectionGroups,
  };
};

export const parseCollectionCommunication = (
  collectionEventObject: CollectionEvent
) => {
  const collectionCommunication: CollectionCommunication[] = [];
  for (const userAttribute of collectionEventObject.userAttributePair || []) {
    if (isUserAttributePair(userAttribute)) {
      const communication: CollectionCommunication = {
        attributeKey: userAttribute.attributeKey,
        attributeValue: JSON.parse(userAttribute.attributeValue),
      };
      collectionCommunication.push(communication);
    }
  }
  return {
    ...collectionEventObject,
    userAttributePair: collectionCommunication,
  };
};

export const parseUserAttributeFromDataCollectionApi = (
  dataCollectionApi: DataCollectionApi
) => {
  const dataCollectionParseGroup: DataCollection = parseCollectionGroups(
    dataCollectionApi.json
  );
  const dataCollectionParseCommunication: CollectionEvent[] =
    dataCollectionParseGroup.collectionEvents?.map((collectionEvent) => {
      const parseCollectionEvent: CollectionEvent =
        parseCollectionCommunication(collectionEvent);
      return parseCollectionEvent;
    }) || [];
  const parsedDataCollectionObject: DataCollection = {
    ...dataCollectionParseGroup,
    collectionEvents: dataCollectionParseCommunication,
  };
  const response: DataCollectionApi = {
    ...dataCollectionApi,
    json: parsedDataCollectionObject,
  };
  return response;
};
