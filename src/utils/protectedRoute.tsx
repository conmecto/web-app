import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

type RouteType = {
  type?: string
}

const ProtectedRoute = ({ type }: RouteType) => {
  const authContext = useAuth();
  if (!authContext || !authContext.user || !authContext.accessToken) {
    if (type && type === "creator") {
      return (<Navigate to='/creator/login' replace/>);
    }
    return (<Navigate to='/login' replace/>);
  }
  return <Outlet />
};

export default ProtectedRoute;