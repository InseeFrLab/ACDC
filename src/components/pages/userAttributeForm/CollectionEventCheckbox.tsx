import React, { useState } from 'react';
import {
  Box,
  Card,
  Checkbox,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CollectionEvent from '../../../lib/model/collectionEvents';

interface CollectionEventCheckBoxProps {
  collectionEvents: CollectionEvent[];
  collectionEventCheck: any;
  setCollectionEventCheck: (collectionEventCheck: any) => void;
}

const CollectionEventCheckBox = (props: CollectionEventCheckBoxProps) => {
  const { t, i18n } = useTranslation(['userAttributeForm', 'form']);
  const { collectionEvents } = props;

  console.log('collectionEventCheck', props.collectionEventCheck);
  return (
    <>
      {collectionEvents.map((item, index) => (
        <Card
          key={item.id}
          sx={{
            p: 1,
            my: 1,
            width: '45%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Checkbox
                checked={props.collectionEventCheck[index][item.id]}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                onChange={(e) => {
                  const newCollectionEventCheck = props.collectionEventCheck;
                  newCollectionEventCheck[index][item.id] = e.target.checked;
                  props.setCollectionEventCheck(newCollectionEventCheck);
                  console.log(
                    'collectionEventCheck',
                    props.collectionEventCheck
                  );
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.secondary"
                sx={{ marginLeft: 1 }}
              >
                {`${item.collectionEventName[i18n.language]} `}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Typography variant="body1" fontWeight="xl">
                {`${item.label[i18n.language]} `}
              </Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default CollectionEventCheckBox;
