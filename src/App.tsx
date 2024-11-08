import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
// import PageNotFound from "./screens/PageNotFound";
import { SiteScreens } from "./types";
import ScheduleDemoScreen from "./screens/ScheduleDemoScreen/ScheduleDemoScreen";
import AuthScreen from "./screens/AuthScreen/AuthScreen";
import GenerateScreen from "./screens/GenerateScreen/GenerateScreen";
import { ProtectedRoutes } from "./components/Routing/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Navbar />
      <Routes>
        <Route path={SiteScreens.LANDING} element={<LandingScreen />} />
        <Route
          path={SiteScreens.SCHEDULE_DEMO}
          element={<ScheduleDemoScreen />}
        />
        <Route path={SiteScreens.AUTH} element={<AuthScreen />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={SiteScreens.GENERATE} element={<GenerateScreen />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
