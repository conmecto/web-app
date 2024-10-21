import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/authContext';
import ProtectedRoute from './utils/protectedRoute';
import { Dashboard, Login, Signup, CreatorSignup, Home, CreatorHome } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login creator={false} />} />
          <Route path="/join" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/creator/login" element={<Login creator={true} />} />
          <Route path="/creator/join" element={<CreatorSignup />} />
          <Route element={<ProtectedRoute type="creator"/>}>
            <Route path="/creator/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;