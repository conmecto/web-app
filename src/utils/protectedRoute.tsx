import { Outlet, Navigate } from 'react-router-dom';
import Welcome from '../pages/welcome';
import { useAuth } from './authContext';

type RouteType = {
  type?: string
}

const ProtectedRoute = () => {
  const authContext: any = useAuth();
  if (authContext?.loading) {
    return (
      <Welcome />
    );
  }
  if (!authContext.user || !authContext.accessToken) {
    // if (type && type === "creator") {
    //   return (<Navigate to='/creator/login' replace/>);
    // }
    return (<Navigate to='/login' replace/>);
  }
  return <Outlet />
};

export default ProtectedRoute;