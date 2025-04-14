import { BrowserRouter } from 'react-router-dom';
import AppLayout from './components/Layout';
import NewRouterConfig from './NewRouterConfig';

function NewApp() {
  return (
    <BrowserRouter>
      <AppLayout>
        <NewRouterConfig />
      </AppLayout>
    </BrowserRouter>
  );
}

export default NewApp;
