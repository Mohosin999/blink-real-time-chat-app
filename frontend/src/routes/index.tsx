import BaseLayout from "@/layouts/base-layout";
import { Route, Routes } from "react-router-dom";
import { authRoutesPaths, protectedRoutesPaths } from "./routes";
import AppLayout from "@/layouts/app-layout";
import RouteGuard from "./route-guard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ----------------------------------------------------------------
          Public / Auth routes
          These routes are accessible only if the user is NOT logged in.
          Examples: Login, Register, Forgot Password
      ---------------------------------------------------------------- */}
      <Route path="/" element={<RouteGuard requireAuth={false} />}>
        <Route element={<BaseLayout />}>
          {authRoutesPaths?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      {/* ----------------------------------------------------------------
          Protected / Private routes
          These routes are accessible only if the user IS logged in.
          Examples: Dashboard, Chat, Profile
      ---------------------------------------------------------------- */}
      <Route path="/" element={<RouteGuard requireAuth={true} />}>
        <Route element={<AppLayout />}>
          {protectedRoutesPaths?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
