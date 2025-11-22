import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AppLoader, AllBatchLoader } from "./components/layouts/Loaders";
import { withMinimumLoadTime } from "./utils/loadingUtils";

// Lazy load components with minimum loading time to ensure loaders are visible
const Home = lazy(() =>
  withMinimumLoadTime(() => import("./pages/Home"), 1500)()
);
const AllBatch = lazy(() =>
  withMinimumLoadTime(() => import("./pages/AllBatch"), 2000)()
);
const Login = lazy(() =>
  withMinimumLoadTime(() => import("./pages/Login"), 1500)()
);
const NotFound = lazy(() =>
  withMinimumLoadTime(() => import("./pages/NotFound"), 1000)()
);
const Batch = lazy(() =>
  withMinimumLoadTime(() => import("./pages/Batch"), 1500)()
);
const Profile = lazy(() =>
  withMinimumLoadTime(() => import("./pages/Profile"), 1500)()
);
const InProgress = lazy(() =>
  withMinimumLoadTime(() => import("./pages/InProgress"), 1500)()
);

// Wrapper component to ensure Suspense works properly
const SuspenseWrapper = ({ children, fallback }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
);

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuspenseWrapper fallback={<AppLoader />}>
            <Home />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/profile"
        element={
          <SuspenseWrapper fallback={<AppLoader />}>
            <Profile />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/batch"
        element={
          <SuspenseWrapper fallback={<AllBatchLoader />}>
            <AllBatch />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/batch/:batchId"
        element={
          <SuspenseWrapper fallback={<AppLoader />}>
            <Batch />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/in-progress"
        element={
          <SuspenseWrapper fallback={<AppLoader />}>
            <InProgress />
          </SuspenseWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <SuspenseWrapper fallback={<AppLoader />}>
            <Login />
          </SuspenseWrapper>
        }
      />
      <Route
        path="*"
        element={
          <SuspenseWrapper fallback={<AppLoader />}>
            <NotFound />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
};

export default App;
