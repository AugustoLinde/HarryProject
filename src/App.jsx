import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseGrid from "./components/HouseGrid";
import HouseDetail from "./pages/HouseDetail";
import Loading from "./components/Loading";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HouseGrid />} />
        <Route path="/house/:id" element={<HouseDetail />} />
        <Route path="*" element={<div className="text-center mt-10">Página não encontrada</div>} />
      </Routes>
    </Router>
  );
}
export default App;