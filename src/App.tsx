import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
// import PageNotFound from "./screens/PageNotFound";
// import TransferScreen from "./screens/TransferScreen/TransferScreen";
import { SiteMap } from "./types";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Navbar />
      <Routes>
        <Route path={SiteMap.LandingScreen.slug} element={<LandingScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
