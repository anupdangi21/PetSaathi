import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Main/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Route from'../src/Routers/Router.jsx'
import Vendor from './VendorRegistration/Vregister.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Route />

  </StrictMode>,
)




