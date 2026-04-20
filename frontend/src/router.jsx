import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreatorTools from "./pages/CreatorTools.jsx";
import System from "./pages/System.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/creator-tools" element={<CreatorTools />} />
          <Route path="/system" element={<System />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
