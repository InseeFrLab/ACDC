import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiFilter } from 'react-icons/fi';
import { DataCollection } from '@/lib/model/dataCollection';
import { CollectionGroupValue } from '@/lib/model/collectionGroups';
import { Edge, Node } from 'reactflow';
import BottomBar from '../../shared/layout/BottomBar';
import SelectGroup from './SelectGroupComponent';

interface BottomVisualizationBarProps {
  handleReset: () => void;
  dataCollection: DataCollection;
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;

  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
}
const BottomVisualizationBar = (props: BottomVisualizationBarProps) => {
  const { t } = useTranslation(['common']);
  const { handleReset, dataCollection } = props;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const collectionGroupValue: CollectionGroupValue[] = useMemo(() => {
    return Array.isArray(dataCollection.userAttributePair[0].attributeValue)
      ? dataCollection.userAttributePair[0].attributeValue
      : [];
  }, [dataCollection]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <BottomBar>
        <Box>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              mx: 1,
            }}
            startIcon={<FiFilter />}
          >
            <Typography variant="subtitle1">{t('filter')}</Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              console.log('User Attribute Button');
            }}
            sx={{
              mx: 1,
            }}
          >
            <Typography variant="subtitle1">{t('reset')}</Typography>
          </Button>
        </Box>
      </BottomBar>
      <Menu
        anchorEl={anchorEl}
        id="group-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mb: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              bgcolor: 'background.paper',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem disabled>{t('selectGroups')}</MenuItem>
        <Divider />
        <MenuItem
          disabled={selectedIds.length === 2}
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <SelectGroup
            collectionGroupValue={collectionGroupValue}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            nodes={props.nodes}
            setNodes={props.setNodes}
            edges={props.edges}
            setEdges={props.setEdges}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default BottomVisualizationBar;
