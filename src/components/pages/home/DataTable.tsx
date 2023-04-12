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
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronRight } from 'react-icons/fi';
import moment from 'moment';
import { DataCollectionRow } from '../../../lib/model/dataCollection';

interface DataGridHomePageProps {
  rows: DataCollectionRow[];
  heightTable: number;
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
  const columns: GridColDef[] = [
    {
      field: 'label',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Barlow" fontWeight={600}>
          {t('statisticalProgram').toString()}
        </Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.3,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.value}</Typography>
      ),
      description: t('label', { ns: 'form' }).toString(),
    },
    {
      field: 'groupReference',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Barlow" fontWeight={600}>
          {t('statisticalOperation', {
            ns: 'dataCollectionForm',
          }).toString()}
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.value}</Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.25,
      description: t('statisticalProgram').toString(),
    },
    {
      field: 'studyUnitReference',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Barlow" fontWeight={600}>
          {t('statisticalOperationSeries', {
            ns: 'dataCollectionForm',
          }).toString()}
        </Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.35,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.value}</Typography>
      ),
      description: t('statisticalOperation', {
        ns: 'dataCollectionForm',
      }).toString(),
    },
    {
      field: 'versionDate',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Barlow" fontWeight={600}>
          {t('lastUpdate').toString()}
        </Typography>
      ),
      type: 'date',

      headerClassName: 'columns--header',
      flex: 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>
          {moment(params.value).format('DD/MM/YYYY HH:mm')}
        </Typography>
      ),
      description: t('lastUpdate').toString(),
    },
    {
      field: 'version',
      renderHeader: () => (
        <Typography variant="h6" fontFamily="Barlow" fontWeight={600}>
          {t('version').toString()}
        </Typography>
      ),
      headerClassName: 'columns--header',
      flex: 0.1,
      description: t('version').toString(),
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.value}</Typography>
      ),
    },
    {
      field: 'action',
      headerName: ' ',
      headerClassName: 'columns--header',
      flex: 0.1,
      align: 'center',
      description: t('goToCollection').toString(),
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/collection/${params.value.id}`}
          style={{ textDecoration: 'none' }}
          state={{ dataCollection: params.value }}
        >
          <FiChevronRight />
        </Link>
      ),
    },
  ];
  return (
    <Box
      sx={{
        width: '100%',
        '& .columns--header': {
          fontWeight: '700',
        },
        p: 2,
        height: props.heightTable,
      }}
    >
      <DataGrid
        components={{
          Toolbar: CustomToolbar,
        }}
        localeText={{
          toolbarFilters: t('filter'),
          toolbarExport: 'Export',
        }}
        rows={props.rows}
        columns={columns}
        // getRowHeight={() => 'auto'}
        autoPageSize
        pagination
        getRowClassName={() => 'row--style'}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DataGridHomePage;
