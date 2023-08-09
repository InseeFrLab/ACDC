/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import { v4 as uuidv4 } from 'uuid';
import DataCollectionApi from '../model/dataCollectionApi';
import { DataCollection } from '../model/dataCollection';
import {
  UserAttributePair,
  isUserAttributePair,
} from '../model/userAttributePair';
import { CollectionGroup } from '../model/collectionGroups';
import CollectionEvent from '../model/collectionEvents';
import { CollectionCommunication } from '../model/communicationCollectionEvent';
import CollectionGroupValue from '../model/collectionGroupValue';

export const flattenCollectionGroups = (
  dataCollectionObject: DataCollection
) => {
  console.log('dataCollectionObject', dataCollectionObject);
  const flattenedUserAttributePairs: UserAttributePair[] = [];
  let attributeKey = '';
  let attributeValue = '';
  const collectionGroupIndex =
    dataCollectionObject.userAttributePair?.findIndex(
      (userAttribute) =>
        userAttribute.attributeKey === 'extension:CollectionEventGroup'
    );

  if (collectionGroupIndex !== undefined && collectionGroupIndex !== -1) {
    const collectionGroup =
      dataCollectionObject.userAttributePair[collectionGroupIndex];
    if (Array.isArray(collectionGroup.attributeValue)) {
      attributeKey = collectionGroup.attributeKey;
      for (let i = 0; i < collectionGroup.attributeValue.length; i++) {
        attributeValue += JSON.stringify(collectionGroup.attributeValue[i]);
        if (i < collectionGroup.attributeValue.length - 1) {
          attributeValue += ',';
        }
      }
    }
    attributeValue = `[${attributeValue}]`;
    flattenedUserAttributePairs.push({
      attributeKey,
      attributeValue,
    });
    if (Array.isArray(dataCollectionObject.userAttributePair)) {
      const filteredUserAttributePairs =
        dataCollectionObject.userAttributePair.filter(
          (userAttribute, index) =>
            index !== collectionGroupIndex &&
            userAttribute.attributeKey !== 'extension:CollectionEventGroup'
        );
      flattenedUserAttributePairs.push(
        ...filteredUserAttributePairs.map((userAttribute) => ({
          attributeKey: userAttribute.attributeKey,
          attributeValue: JSON.stringify(userAttribute.attributeValue).replace(
            /"/g,
            ''
          ),
        }))
      );
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
  let attributeKey = '';
  let attributeValue = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const userAttribute of collectionEventObject.userAttributePair || []) {
    if (Array.isArray(userAttribute.attributeValue)) {
      attributeKey = userAttribute.attributeKey;
      for (let i = 0; i < userAttribute.attributeValue.length; i++) {
        attributeValue += JSON.stringify(userAttribute.attributeValue[i]);
        if (i < userAttribute.attributeValue.length - 1) {
          attributeValue += ',';
        }
      }
    }
    attributeValue = `[${attributeValue}]`;
    flattenedUserAttributePairs.push({
      attributeKey,
      attributeValue,
    });
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
  const dataCollectionFlattenCommunication: CollectionEvent[] =
    dataCollectionFlattenGroup.collectionEvents?.map((collectionEvent) => {
      const flattenCollectionEvent: CollectionEvent =
        flattenCollectionCommunication(collectionEvent);
      return flattenCollectionEvent;
    }) || [];
  const flattenedDataCollectionObject: DataCollection = {
    ...dataCollectionFlattenGroup,
    collectionEvents: dataCollectionFlattenCommunication,
  };
  const response: DataCollectionApi = {
    ...dataCollectionApi,
    json: flattenedDataCollectionObject,
  };
  return response;
};

export const parseCollectionGroups = (dataCollectionObject: DataCollection) => {
  const collectionGroups: (CollectionGroup | UserAttributePair)[] = [];
  const collectionGroupIndex =
    dataCollectionObject.userAttributePair?.findIndex(
      (userAttribute) =>
        userAttribute.attributeKey === 'extension:CollectionEventGroup'
    );
  if (collectionGroupIndex !== undefined && collectionGroupIndex !== -1) {
    const collectionGroup =
      dataCollectionObject.userAttributePair[collectionGroupIndex];
    if (isUserAttributePair(collectionGroup)) {
      const collectionGroupValue: CollectionGroupValue[] = JSON.parse(
        collectionGroup.attributeValue
      );
      collectionGroups.push({
        attributeKey: 'extension:CollectionEventGroup',
        attributeValue: collectionGroupValue,
      } as CollectionGroup);
    }
  }
  const parsedCollectionGroup: (CollectionGroup | UserAttributePair)[] =
    dataCollectionObject.userAttributePair?.filter(
      (userAttribute) =>
        userAttribute.attributeKey !== 'extension:CollectionEventGroup'
    ) || [];
  collectionGroups.push(...parsedCollectionGroup);

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

const duplicateCollectionEvent = (
  dataCollection: DataCollection
): DataCollection => {
  dataCollection.collectionEvents = dataCollection.collectionEvents?.map(
    (event: CollectionEvent) => {
      const oldId = event.id;
      const duplicatedCollectionEvent: CollectionEvent = {} as CollectionEvent;
      Object.assign(duplicatedCollectionEvent, event);
      duplicatedCollectionEvent.id = uuidv4();
      const newId = duplicatedCollectionEvent.id;

      dataCollection.userAttributePair?.map((userAttribute) => {
        if (userAttribute.attributeKey === 'extension:CollectionEventGroup') {
          const collectionEventGroup: CollectionGroupValue[] =
            typeof userAttribute.attributeValue === 'string'
              ? []
              : userAttribute.attributeValue;

          collectionEventGroup.map((group) => {
            group.collectionEventReference?.map((collectionEvent) => {
              if (collectionEvent.id === oldId) {
                collectionEvent.id = newId;
              }
              return collectionEvent;
            });

            return group;
          });
        }
        return userAttribute;
      });

      return duplicatedCollectionEvent;
    }
  );

  console.log(
    'Duplicate collection event & Assign collection reference groupID: ',
    dataCollection
  );
  return dataCollection;
};

const duplicateCollectionEventGroup = (
  group: CollectionGroupValue | UserAttributePair
): CollectionGroupValue => {
  const duplicatedGroup: CollectionGroupValue = {} as CollectionGroupValue;
  Object.assign(duplicatedGroup, group);
  duplicatedGroup.id = uuidv4();
  return duplicatedGroup;
};

export const duplicateDataCollection = (
  dataCollection: DataCollection
): DataCollection => {
  const duplicatedDataCollection: DataCollection = {
    ...dataCollection,
    id: uuidv4(),
    label: {
      'fr-FR': `${dataCollection.label['fr-FR']} (copie)`,
      'en-IE': `${dataCollection.label['en-IE']} (copy)`,
    },
  };
  duplicateCollectionEvent(duplicatedDataCollection);

  duplicatedDataCollection.userAttributePair?.map((userAttribute) => {
    if (userAttribute.attributeKey === 'extension:CollectionEventGroup') {
      const collectionEventGroup: CollectionGroupValue[] =
        typeof userAttribute.attributeValue === 'string'
          ? []
          : userAttribute.attributeValue;

      collectionEventGroup.map((group) => {
        duplicateCollectionEventGroup(group);
        return group;
      });
    }
    return userAttribute;
  });
  console.log('Duplicated dataCollection: ', duplicatedDataCollection);
  return duplicatedDataCollection;
};
