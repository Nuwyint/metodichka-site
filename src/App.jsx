import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ReadPage from "./pages/ReadPage";
import GlossaryPage from "./pages/GlossaryPage";
import SearchPage from "./pages/SearchPage";
import TestsPage from "./pages/TestsPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="/read/:chapterId" element={<ReadPage />} />
          <Route path="/read/:chapterId/:sectionId" element={<ReadPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tests" element={<TestsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
