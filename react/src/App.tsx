import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Rehab from "./Rehab/Rehab";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/rehab" element={<Rehab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
