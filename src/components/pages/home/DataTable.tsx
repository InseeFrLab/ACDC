// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
import {
  GridToolbarContainer,
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
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
        <strong>{t('label', { ns: 'form' }).toString()}</strong>
      ),
      headerClassName: 'columns--header',
      flex: 0.3,
      description: t('label', { ns: 'form' }).toString(),
    },
    {
      field: 'groupReference',
      renderHeader: () => <strong>{t('statisticalProgram').toString()}</strong>,
      headerClassName: 'columns--header',
      flex: 0.3,
      description: t('statisticalProgram').toString(),
    },
    {
      field: 'studyUnitReference',
      renderHeader: () => <strong>{t('programCycle').toString()}</strong>,
      headerClassName: 'columns--header',
      flex: 0.3,
      description: t('programCycle').toString(),
    },
    {
      field: 'versionDate',
      renderHeader: () => <strong>{t('lastUpdate').toString()}</strong>,
      type: 'date',
      valueFormatter: (params) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        moment(params?.value).format('DD/MM/YYYY HH:mm'),
      headerClassName: 'columns--header',
      flex: 0.2,

      description: t('lastUpdate').toString(),
    },
    {
      field: 'version',
      renderHeader: () => <strong>{t('version').toString()}</strong>,
      headerClassName: 'columns--header',
      flex: 0.1,

      description: t('version').toString(),
    },
    {
      field: 'action',
      headerName: ' ',
      headerClassName: 'columns--header',
      flex: 0.15,
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
