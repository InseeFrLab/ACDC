/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
import {
  GridToolbarContainer,
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronRight, FiCopy } from 'react-icons/fi';
import moment from 'moment';
import { duplicateDataCollection } from '@/lib/utils/dataCollectionUtils';
import { updateDataCollection } from '@/lib/api/remote/dataCollectionApiFetch';
import { useEffect } from 'react';
import {
	DataCollection,
	DataCollectionApi,
	DataCollectionRow,
} from '../../../lib/model/dataCollection';

interface DataGridHomePageProps {
  rows: DataCollectionRow[];
}

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
};

const DataGridHomePage = (props: DataGridHomePageProps) => {
  const { t } = useTranslation(['common']);
  const { isSuccess, mutate } = useMutation(updateDataCollection);

  const handleDuplicate = (dataCollection: DataCollection) => {
    const duplicatedDataCollection = duplicateDataCollection(dataCollection);
    const duplicatedDCApi: DataCollectionApi = {
      id: duplicatedDataCollection.id,
      json: duplicatedDataCollection,
    };
    mutate(duplicatedDCApi);
  };
  const columns: GridColDef[] = [
    {
      field: 'label',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Oswald" fontWeight={600}>
          {t('statisticalProgram').toString()}
        </Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.22,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontFamily="Lato">{params.value}</Typography>
      ),
      description: t('label', { ns: 'form' }).toString(),
    },
    {
      field: 'studyUnitReference',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Oswald" fontWeight={600}>
          {t('statisticalOperation', {
            ns: 'dataCollectionForm',
          }).toString()}
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontFamily="Lato">{params.value}</Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.33,
      description: t('statisticalProgram').toString(),
    },
    {
      field: 'groupReference',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Oswald" fontWeight={600}>
          {t('statisticalOperationSeries', {
            ns: 'dataCollectionForm',
          }).toString()}
        </Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.25,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontFamily="Lato">{params.value}</Typography>
      ),
      description: t('statisticalOperationSeries', {
        ns: 'dataCollectionForm',
      }).toString(),
    },
    {
      field: 'versionDate',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Oswald" fontWeight={600}>
          {t('lastUpdate').toString()}
        </Typography>
      ),
      // type: 'date',

      headerClassName: 'columns--header',
      flex: 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontFamily="Lato">
          {moment(params.value).format('DD/MM/YYYY HH:mm')}
        </Typography>
      ),
      description: t('lastUpdate').toString(),
    },
    {
      field: 'version',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Oswald" fontWeight={600}>
          {t('version').toString()}
        </Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.1,
      description: t('version').toString(),
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontFamily="Lato">{params.value}</Typography>
      ),
    },
    {
      field: 'action',
      headerName: ' ',
      headerClassName: 'columns--header',
      flex: 0.15,
      align: 'center',
      description: t('goToCollection').toString(),
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          <IconButton
            sx={{
              mr: 2,
            }}
            onClick={() => {
              handleDuplicate(params.value);
            }}
          >
            <FiCopy fontSize={19} />
          </IconButton>
          <Link
            to={`/collection/${params.value.id}`}
            style={{ textDecoration: 'none' }}
          >
            <FiChevronRight fontSize={21} />
          </Link>
        </Box>
      ),
    },
  ];
  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        width: '97%',
        '& .columns--header': {
          fontWeight: '700',
        },
        p: 2,
      }}
    >
      <DataGrid
        slots={{
          toolbar: CustomToolbar,
        }}
        localeText={{
          toolbarFilters: t('filter'),
          toolbarExport: 'Export',
        }}
        rows={props.rows}
        columns={columns}
        // pageSizeOptions={[10, 20, 50]}
        autoHeight
        pagination
        getRowClassName={() => 'row--style'}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridHomePage;
