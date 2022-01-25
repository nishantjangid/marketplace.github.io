import Header from "./components/Header/Header";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import Home from "./pages/Home";
import Item from "./pages/Item";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";
import "./style/Main.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/item" element={<Item />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;