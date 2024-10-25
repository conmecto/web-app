import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/authContext';
import ProtectedRoute from './utils/protectedRoute';
import { Dashboard, Login, Signup, CreatorSignup, Home } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Signup />} />
          <Route path="/login" element={<Login creator={false} />} />
          <Route path="/ai-videos/:orientation" element={<Home />} />
          <Route path="/ai-videos/:orientation/:brandName" element={<Home />} />
          <Route path="/ai-videos/:orientation/:brandName/:category" element={<Home />} />
          <Route path="/ai-videos/:orientation/:brandName/:category/:productName" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/brands/my/profile" element={<Dashboard />} />
            <Route path="/brands/saved" element={<Dashboard />} />
            <Route path="/brands/checkout" element={<Dashboard />} />
          </Route>
          {/* <Route path="/creator/login" element={<Login creator={true} />} /> */}
          <Route path="/creator/join" element={<CreatorSignup />} />
          <Route element={<ProtectedRoute type="creator"/>}>
            {/* <Route path="/creator/:creatorId/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;