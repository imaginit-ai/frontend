import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
// import PageNotFound from "./screens/PageNotFound";
import { SiteMap } from "./types";
import GenerateScreen from "./screens/GenerateScreen/GenerateScreen";
import ScheduleDemoScreen from "./screens/ScheduleDemoScreen/ScheduleDemoScreen";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Navbar />
      <Routes>
        <Route path={SiteMap.LandingScreen.slug} element={<LandingScreen />} />
        <Route
          path={SiteMap.ScheduleDemoScreen.slug}
          element={<ScheduleDemoScreen />}
        />
        <Route
          path={SiteMap.GenerateScreen.slug}
          element={<GenerateScreen />}
        />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
