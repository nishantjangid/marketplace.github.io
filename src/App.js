import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Item from "./pages/Item";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";
import "./style/Main.css";
import Details from "./pages/Details";
import EditProfile from "./pages/EditProfile";
import CreateCollection from "./pages/CreateCollection";
import HeaderMain from "./components/Header/HeaderMain";
import Explore from "./pages/Explore";



function App() {
  return (
    <BrowserRouter>
      {/* <Header />        */}
      <HeaderMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/createCollection" element={<CreateCollection />} />
        <Route path="/item" element={<Item />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/details/:id" element={<Details />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
