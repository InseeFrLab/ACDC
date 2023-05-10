/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import { Node, Edge, Position } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import DataCollectionApi from '../model/dataCollectionApi';
import { DataCollection } from '../model/dataCollection';
import {
  UserAttributePair,
  isUserAttributePair,
} from '../model/userAttributePair';
import {
  CollectionGroup,
  CollectionGroupValue,
} from '../model/collectionGroups';
import CollectionEvent from '../model/collectionEvents';
import { CollectionCommunication } from '../model/communicationCollectionEvent';
import LanguageRecord from '../model/languageRecord';

export const flattenCollectionGroups = (
  dataCollectionObject: DataCollection
) => {
  const flattenedUserAttributePairs: UserAttributePair[] = [];
  let attributeKey = '';
  let attributeValue = '';
  for (const userAttribute of dataCollectionObject.userAttributePair || []) {
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

export const createTreeFromDataCollection = (
  dataCollection: DataCollection
) => {
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
  let initialY = 100;
  initialNodes.push(
    {
      id: 'dataCollectionSeries',
      data: {
        label: dataCollection.studyUnitReference.groupReference.label['fr-FR'],
      },
      position: { x: 250, y: 200 },
      type: 'input',
      style: { background: '#739ED0' },
      ...nodeDefaults,
    },
    {
      id: 'dataCollectionOperation',
      data: {
        label: dataCollection.studyUnitReference.label['fr-FR'],
      },
      position: { x: 450, y: 200 },
      style: {
        background: '#B5C7DD',
      },
      ...nodeDefaults,
    },
    {
      id: 'dataCollectionOperationCollection',
      data: {
        label: `Collecte ${dataCollection.studyUnitReference.label['fr-FR']}`,
      },
      position: { x: 650, y: 200 },
      style: { background: '#E5EAF0' },
      ...nodeDefaults,
    }
  );

  initialEdges.push(
    {
      id: 'dataCollectionSeries-dataCollectionOperation',
      source: 'dataCollectionSeries',
      target: 'dataCollectionOperation',
    },
    {
      id: 'dataCollectionOperation-dataCollectionOperationCollection',
      source: 'dataCollectionOperation',
      target: 'dataCollectionOperationCollection',
    },
    {
      id: 'dataCollectionOperationCollection-dataCollection',
      source: 'dataCollectionOperationCollection',
      target: 'dataCollection',
    }
  );

  for (const collectionEvent of dataCollection.collectionEvents || []) {
    initialNodes.push({
      id: collectionEvent.id,
      data: {
        label: collectionEvent.collectionEventName['fr-FR'],
      },
      position: { x: 850, y: initialY },
      style: { background: '#FFFF80' },
      ...nodeDefaults,
    });
    initialEdges.push({
      id: `${collectionEvent.id}-dataCollectionOperationCollection`,
      source: 'dataCollectionOperationCollection',
      target: collectionEvent.id,
    });

    initialNodes.push({
      id: collectionEvent.instrumentReference.id,
      data: {
        label: collectionEvent.instrumentReference.label,
      },
      position: { x: 1050, y: initialY },
      type: 'output',
      style: { background: '#F6D595' },
      ...nodeDefaults,
    });
    initialEdges.push({
      id: `${collectionEvent.id}-${collectionEvent.instrumentReference.id}`,
      source: collectionEvent.id,
      target: collectionEvent.instrumentReference.id,
    });
    initialY += 100;
  }
  return {
    nodes: initialNodes,
    edges: initialEdges,
  };
};

const duplicateCollectionEvent = (event: CollectionEvent): CollectionEvent => {
  const duplicatedEvent: CollectionEvent = {} as CollectionEvent;
  Object.assign(duplicatedEvent, event);
  duplicatedEvent.id = uuidv4();
  return duplicatedEvent;
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
  const duplicatedDataCollection: DataCollection = {} as DataCollection;
  Object.assign(duplicatedDataCollection, dataCollection);
  duplicatedDataCollection.id = uuidv4();
  duplicatedDataCollection.label = {
    'fr-FR': `${dataCollection.label['fr-FR']} (copie)`,
    'en-IE': `${dataCollection.label['en-IE']} (copy)`,
  };
  duplicatedDataCollection.collectionEvents =
    duplicatedDataCollection.collectionEvents?.map((event: CollectionEvent) =>
      duplicateCollectionEvent(event)
    );

  // TODO : Fix this
  duplicatedDataCollection.userAttributePair = [
    {
      attributeKey: 'extension:CollectionEventGroup',
      attributeValue: [],
    },
  ];
  console.log('Duplicated dataCollection: ', duplicatedDataCollection);
  return duplicatedDataCollection;
};
