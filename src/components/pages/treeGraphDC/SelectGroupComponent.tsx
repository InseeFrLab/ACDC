import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { CollectionGroupValue } from '@/lib/model/collectionGroups';
import { useTranslation } from 'react-i18next';

interface SelectGroupProps {
  collectionGroupValue: CollectionGroupValue[];
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
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
          label={group.label[i18n.language]}
        />
      ))}
    </FormGroup>
  );
};

export default SelectGroup;
