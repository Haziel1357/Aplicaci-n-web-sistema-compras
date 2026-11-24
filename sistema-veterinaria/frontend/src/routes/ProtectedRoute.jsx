import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { autenticado } = useAuth();
  const location = useLocation();

  if (!autenticado) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

