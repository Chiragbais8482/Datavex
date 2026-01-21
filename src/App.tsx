import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import GradualBlur from "./components/GradualBlur";
import { FloatingLines } from "./components/FloatingLines";
import CreatedBy from "./components/CreatedBy";

import Home from "./pages/Home";
import Analyze from "./pages/Analyze";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <FloatingLines />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <GradualBlur position="bottom" />
        </div>

        {/* Navbar */}
        <div className="relative z-50">
          <Navigation />
        </div>

        {/* Pages */}
        <main className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <CreatedBy />
                </>
              }
            />
            <Route path="/analyze" element={<Analyze />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
