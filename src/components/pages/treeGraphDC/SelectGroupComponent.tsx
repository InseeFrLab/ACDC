import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Edge, Node } from 'reactflow';
import { createNodeFromCollectionGroup } from '@/lib/utils/visualizationUtils';
import LanguageRecord from '@/lib/model/languageRecord';
import CollectionGroupValue from '@/lib/model/collectionGroups';

interface SelectGroupProps {
  collectionGroupValue: CollectionGroupValue[];
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;

  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
}

const SelectGroup = (props: SelectGroupProps) => {
  const { collectionGroupValue } = props;
  const { t, i18n } = useTranslation(['common']);

  const handleSelectionChange = (id: string) => {
    if (props.selectedIds.includes(id)) {
      props.setSelectedIds(
        props.selectedIds.filter((selectedId) => selectedId !== id)
      );
    } else if (props.selectedIds.length < 2) {
      props.setSelectedIds([...props.selectedIds, id]);
      const newTree = createNodeFromCollectionGroup(
        collectionGroupValue[
          props.selectedIds.indexOf(props.selectedIds.at(-1))
        ],
        props.nodes,
        props.edges
      );
      console.log('New Group selected', newTree);
      props.setNodes(newTree.nodes);
      props.setEdges(newTree.edges);
    }
  };

  const isItemSelected = (id: string) => props.selectedIds.includes(id);

  return (
    <FormGroup>
      {collectionGroupValue.map((group) => (
        <FormControlLabel
          key={group.id}
          control={
            <Checkbox
              checked={isItemSelected(group.id)}
              onChange={() => handleSelectionChange(group.id)}
            />
          }
          label={`${group.label[i18n.language as keyof LanguageRecord]} `}
        />
      ))}
    </FormGroup>
  );
};

export default SelectGroup;
