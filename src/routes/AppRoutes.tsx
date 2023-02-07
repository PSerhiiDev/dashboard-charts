import React, { FC, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
// import { useSelector } from "../store/hooks";
// import { globalSelectors } from "../store/global";
// import Loader from "../components/Loader";
// import SignIn from "../components/SignIn";
// import Profile from "../components/Profile";
// import EmployeeDetails from "../components/EmployeeDetails";

// const Sectors = React.lazy(() => import("../components/Sectors"));
const HumanPower = React.lazy(() => import("../components/HumanPower/HumanPower"));
const HumanCapabilities = React.lazy(
  () => import("../components/HumanCapabilities/HumanCapabilities")
);
// const List = React.lazy(() => import("../components/List"));

export const AppRoutes: FC = () => {
  // const isLoading = useSelector(globalSelectors.getIsLoading);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Routes>
        {/* <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Sectors />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="/Sectors"
          element={
            <Suspense fallback={<Loader />}>
              <Sectors />{" "}
            </Suspense>
          }
        /> */}
         <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HumanPower />
            </Suspense>
          }
        />
        {/* <Route
          path="/HumanPower"
          element={
            <Suspense fallback={<Loader />}>
              <HumanPower />
            </Suspense>
          }
        /> */}
        <Route
          path="/human-capabilities"
          element={
            <Suspense fallback={<Loader />}>
              <HumanCapabilities />
            </Suspense>
          }
        />
        
        {/* <Route
          path="/List"
          element={
            <Suspense fallback={<Loader />}>
              <List />
            </Suspense>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/employee-details"
          element={
            <Suspense fallback={<Loader />}>
              <EmployeeDetails />
            </Suspense>
          }
        /> */}
      </Routes>
    </>
  );
};
