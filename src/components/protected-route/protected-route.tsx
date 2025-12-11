import React from 'react';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  forAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  forAuth = true
}) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (forAuth && !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (!forAuth && user) {
    return <Navigate to='/' replace />;
  }

  console.log('d');
  return <>{children}</>;
};
