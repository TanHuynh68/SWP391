import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from '@redux/store/Store.tsx'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Provider store={store}> {/* Wrap with Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);
