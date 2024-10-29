import { Outlet, Navigate } from 'react-router-dom';
import Welcome from '../pages/welcome';
import { useAuth } from './authContext';


const BrandProtectedRoute = () => {
  const authContext: any = useAuth();
  if (authContext?.loading) {
    return (
      <Welcome />
    );
  }
  if (!authContext.accessToken || !authContext.user || authContext.user.type !== 'brand') {
    return (<Navigate to='/login' replace/>);
  }
  return <Outlet />
};

export default BrandProtectedRoute;