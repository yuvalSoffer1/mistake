import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/auth/Register";
import Header from "./components/ui/header/Header";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeNavigator from "./components/HomeNavigator";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Grades from "./pages/Grades";
import Settings from "./pages/Settings";
import { useDisplayContext } from "./context/DisplayContext";
import LoadingOverlay from "./components/ui/LoadingOverlay";

const protectedRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/classes", element: <Classes /> },
  { path: "/students", element: <Students /> },
  { path: "/grades", element: <Grades /> },
  { path: "/settings", element: <Settings /> },
];

function App() {
  const { displayState } = useDisplayContext();
  return (
    <>
      <LoadingOverlay visible={displayState.isLoading} />
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomeNavigator>
              <Login />
            </HomeNavigator>
          }
        />
        <Route
          path="/register"
          element={
            <HomeNavigator>
              <Register />
            </HomeNavigator>
          }
        />

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
