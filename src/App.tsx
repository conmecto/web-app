import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/authContext';
import AppRoutes from './pages/appRoutes'

const App: React.FC = () => {  
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;