import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { routes } from '../utils/constant';
import Dashboard from '../components/dashboard/Dashboard';

const AppRouter = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const privatePaths = [routes.DASHBOARD]
    if(privatePaths?.includes(location?.pathname) ) {
      navigate(routes.DASHBOARD)
    }
  },[])

  const privateRoute = (
    <Routes>
      <Route exact path={routes.DASHBOARD} element={<Dashboard />} />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routes.DASHBOARD}
          />
        }
      />
    </Routes>
  )
  return <div>{ privateRoute }</div>
}

export default AppRouter;
