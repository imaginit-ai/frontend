import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
// import PageNotFound from "./screens/PageNotFound";
// import TransferScreen from "./screens/TransferScreen/TransferScreen";
import { SiteMap } from "./types";
import GenerateScreen from "./screens/GenerateScreen/GenerateScreen";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Navbar />
      <Routes>
        <Route path={SiteMap.LandingScreen.slug} element={<LandingScreen />} />
        <Route
          path={SiteMap.GenerateScreen.slug}
          element={<GenerateScreen />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
