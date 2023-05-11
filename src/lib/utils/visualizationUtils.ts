import { Node, Edge, Position } from 'reactflow';
import { DataCollection } from '../model/dataCollection';
import { CollectionGroupValue } from '../model/collectionGroups';

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

  // eslint-disable-next-line no-restricted-syntax
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

export const createNodeFromCollectionGroup = (
  collectionGroup: CollectionGroupValue,
  nodes: Node[],
  edges: Edge[]
) => {
  const { collectionEventReference } = collectionGroup;
  nodes.push({
    id: collectionGroup.id,
    type: 'group',
    data: {
      label: collectionGroup.label['fr-FR'],
    },
    // TODO: position should be calculated
    position: { x: 250, y: 200 },
  });
  collectionEventReference.forEach((collectionEvent) => {
    const indexNode = nodes.findIndex((node) => node.id === collectionEvent.id);
    if (indexNode !== -1) {
      nodes[indexNode].parentNode = collectionGroup.id;
      nodes[indexNode].extent = 'parent';
    }
    // Remove edge from parents if it exists
    const indexEdge = edges.findIndex(
      (edge) => edge.target === collectionEvent.id
    );
    if (indexEdge !== -1) {
      edges.splice(indexEdge, 1);
    }
  });
  edges.push({
    id: `${collectionGroup.id}-collectionGroup`,
    source: 'dataCollectionOperationCollection',
    target: collectionGroup.id,
  });
  return {};
};
