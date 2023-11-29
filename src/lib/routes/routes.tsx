import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from 'react-router-dom';
import ErrorBoundary from '@/components/shared/layout/ErrorBoundary';
import Visualizer from '@/components/pages/treeGraphDC/Visualizer';
import PdfDisplay from '@/components/pages/pdfDisplay/PdfRenderer';
import Home from '@/components/pages/home/Home';
import Header from '@/components/shared/header/Header';
import CreateDataCollection from '@/components/pages/dataCollectionForm/CreateDataCollection';
import CreateCollectionEvent from '@/components/pages/collectionEventForm/CreateCollectionEvent';
import DataCollectionDetails from '@/components/pages/dataCollectionDetails/DataCollectionDetailsPage';
import CreateUserAttribute from '@/components/pages/collectionEventGroupForm/CreateUserAttribute';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     children: [
//       {
//         path: 'new',
//         element: <CreateDataCollection />,
//       },
//       {
//         path: 'collection/new/:id',
//         element: <CreateCollectionEvent />,
//       },
//       {
//         path: 'collection/new/:id',
//         element: <CreateCollectionEvent />,
//       },
//       {
//         path: 'collection/:id',
//         element: <DataCollectionDetails />,
//         children: [
//           {
//             path: 'attribute/new',
//             element: <CreateUserAttribute />,
//           },
//           {
//             path: 'visualize',
//             element: <Visualizer />,
//           },
//         ],
//       },
//       {
//         path: 'mail/:id',
//         element: <PdfDisplay />,
//       },
//     ],
//   },
// ]);

// export default router;

const RoutesWebs = () => {
  return (
    <Router>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
          <Route path="/new" element={<CreateDataCollection />} />
          <Route
            path="collection/new/:id"
            element={<CreateCollectionEvent />}
          />
          <Route
            path="collection/:idDataCollection"
            element={<DataCollectionDetails />}
          />
          <Route
            path="collection/:id/attribute/new"
            element={<CreateUserAttribute />}
          />
          <Route path="collection/:id/visualize" element={<Visualizer />} />
          <Route path="mail/:id" element={<PdfDisplay />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default RoutesWebs;
