import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  requireAuth?: boolean;
}

const RouteGuard = ({ requireAuth }: Props) => {
  const { user } = useAuth(); // get current user info from auth hook

  // If the route requires authentication but the user is NOT logged in,
  // redirect to "/" (login or home page)
  if (requireAuth && !user) return <Navigate to="/" replace />;

  // If the route is public (no auth required) but the user IS logged in,
  // redirect to "/chat" (or dashboard)
  if (!requireAuth && user) return <Navigate to="/chat" replace />;

  return <Outlet />;
};

export default RouteGuard;
