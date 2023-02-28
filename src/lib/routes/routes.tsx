import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/shared/layout/ErrorBoundary';
import Home from '../../components/pages/home/Home';
import Header from '../../components/shared/header/Header';
import CreateDataCollection from '../../components/pages/dataCollectionForm/CreateDataCollection';
import CreateCollectionEvent from '../../components/pages/collectionEventForm/CreateCollectionEvent';
import DataCollectionDetails from '../../components/pages/dataCollectionDetails/DataCollectionDetailsPage';
import CreateUserAttribute from '../../components/pages/collectionEventGroupForm/CreateUserAttribute';

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
          <Route path="collection/:id" element={<DataCollectionDetails />} />
          <Route
            path="collection/:id/attribute/new"
            element={<CreateUserAttribute />}
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default RoutesWebs;
