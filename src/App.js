import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Item from "./pages/Item";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";
import "./style/Main.css";
import Details from "./pages/Details";
import EditProfile from "./pages/EditProfile";


function App() {
  return (
    <BrowserRouter>
      <Header />       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/item" element={<Item />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/details/:id" element={<Details />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
