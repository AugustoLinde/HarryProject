import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as amplitude from '@amplitude/analytics-browser'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
amplitude.init('78b8ebfad951ab42d14c91d5e62df886', {
  defaultTracking: true, // Opcional: Rastreia automaticamente pageviews padrão
});


