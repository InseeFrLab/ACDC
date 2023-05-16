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
        label: `${dataCollection.label['fr-FR']}`,
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

export const createFullTreeFromDataCollection = (
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
        label: `${dataCollection.label['fr-FR']}`,
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
      position: { x: 870, y: initialY },
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
      position: {
        x: 1080,
        y: initialNodes[
          initialNodes.findIndex((node) => node.id === collectionEvent.id)
        ].position.y,
      },
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
  // eslint-disable-next-line no-restricted-syntax
  for (const collectionGroup of dataCollection.userAttributePair[0]
    .attributeValue || []) {
    console.log('collectionGroup', collectionGroup);
    if (
      collectionGroup &&
      typeof collectionGroup === 'object' &&
      'collectionEventReference' in collectionGroup &&
      Array.isArray(collectionGroup.collectionEventReference)
    ) {
      const { collectionEventReference } = collectionGroup;
      initialNodes.unshift({
        id: collectionGroup.id,
        type: 'input',
        data: {
          label: collectionGroup.label['fr-FR'],
        },

        // TODO: position should be calculated
        position: {
          x: 860,
          y: initialNodes[
            initialNodes.findIndex(
              (node) => node.id === collectionEventReference[0].id
            )
          ].position.y,
        },
        style: {
          width: 170,
          height: collectionEventReference.length * 70 + 30,
          background: 'rgba(0, 0, 255, 0.1)',
        },
      });
      let initialYGroup = 40;
      initialEdges.push({
        id: `${collectionGroup.id}-collectionGroup`,
        source: 'dataCollectionOperationCollection',
        target: collectionGroup.id,
      });
      collectionEventReference.forEach((collectionEvent) => {
        const indexNode = initialNodes.findIndex(
          (node) => node.id === collectionEvent.id
        );
        if (indexNode !== -1) {
          initialNodes[indexNode].parentNode = collectionGroup.id;
          initialNodes[indexNode].extent = 'parent';
          initialNodes[indexNode].position = { x: 10, y: initialYGroup };
          initialYGroup += 70;
        }
      });
    }
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
  const oldNodes = [...nodes];
  console.log('collectionGroup', collectionGroup);
  const { collectionEventReference } = collectionGroup;
  nodes.unshift({
    id: collectionGroup.id,
    type: 'input',
    data: {
      label: collectionGroup.label['fr-FR'],
    },

    // TODO: position should be calculated
    position: {
      x: 840,
      y: oldNodes[
        oldNodes.findIndex((node) => node.id === collectionEventReference[0].id)
      ].position.y,
    },
    style: {
      width: 170,
      height: collectionEventReference.length * 70 + 30,
      background: 'rgba(0, 0, 255, 0.1)',
    },
  });
  let initialY = 40;
  edges.push({
    id: `${collectionGroup.id}-collectionGroup`,
    source: 'dataCollectionOperationCollection',
    target: collectionGroup.id,
  });
  collectionEventReference.forEach((collectionEvent) => {
    const indexNode = nodes.findIndex((node) => node.id === collectionEvent.id);
    if (indexNode !== -1) {
      nodes[indexNode].parentNode = collectionGroup.id;
      nodes[indexNode].extent = 'parent';
      nodes[indexNode].position = { x: 10, y: initialY };
      initialY += 70;
    }
    // Remove edge from parents if it exists
    // const indexEdge = edges.findIndex(
    //   (edge) => edge.target === collectionEvent.id
    // );
    // if (indexEdge !== -1) {
    //   edges.splice(indexEdge, 1);
    // }
  });

  return {
    nodes,
    edges,
  };
};

export const deleteCollectionGroupNode = (
  collectionGroup: CollectionGroupValue,
  nodes: Node[],
  initialNodes: Node[],
  edges: Edge[]
) => {
  const { collectionEventReference } = collectionGroup;
  collectionEventReference.forEach((collectionEvent) => {
    const indexNode = nodes.findIndex((node) => node.id === collectionEvent.id);
    if (indexNode !== -1) {
      nodes[indexNode].parentNode = null;
      nodes[indexNode].position = initialNodes[indexNode].position;
    }
    // Remove edge from parents if it exists
    // const indexEdge = edges.findIndex(
    //   (edge) => edge.target === collectionEvent.id
    // );
    // if (indexEdge !== -1) {
    //   edges.splice(indexEdge, 1);
    // }
  });
  const newNodes = nodes.filter((node) => node.id !== collectionGroup.id);
  console.log('newNodes', newNodes);
  return {
    nodes: newNodes,
    edges: edges.filter(
      (edge) =>
        edge.target !== collectionGroup.id &&
        edge.source !== collectionGroup.id &&
        edge.id !== `${collectionGroup.id}-collectionGroup`
    ),
  };
};
