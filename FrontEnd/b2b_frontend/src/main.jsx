import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routing from './Routes/Routing.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing/>
  </StrictMode>,
)
