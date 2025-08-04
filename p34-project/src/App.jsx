// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router";
import Sidebar   from "./components/Sidebar";
import CountDown from "./components/CountDown";

import HomePage   from "./components/HomePage";
import CardList   from "./components/CardList";
import Credentials from "./components/Credentials";
import Tutorial   from "./components/Tutorial";
import WhereToBuy from "./components/WhereToBuy";
import FutureSupport from "./components/FutureSupport";
import FeaturedCards from "./components/FeaturedCards";
import PackSimulator from "./components/PackSimulator";

import "./App.css";
import "./index.css";

export default function App() {
  return (
    <HashRouter>
      {/* Always‐on sidebar and countdown+fireworks */}
      <Sidebar />
      <CountDown />

      {/* All your pages */}
      <Routes>
        <Route path="/"element={<HomePage   />} />
        <Route path="/cardlist" element={<CardList   />} />
        <Route path="/credentials" element={<Credentials/>} />
        <Route path="/packsimulator" element={<PackSimulator />} />
        <Route path="/tutorial" element={<Tutorial   />} />
        <Route path="/wheretobuy"  element={<WhereToBuy  />} />
        <Route path="/futuresupport" element={<FutureSupport />} />
        <Route path="/featured" element={<FeaturedCards />} />
        
      </Routes>
    </HashRouter>
  );
}







