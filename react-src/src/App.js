import React from "react";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./admin/components/Dashboard/Dashboard";
import AllRequests from "./admin/components/AllRequests/AllRequests";
import Settings from "./admin/components/Settings/Settings";

function App() {
  return (
    <div className="urm-admin wrap">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-requests" element={<AllRequests />} />
          <Route path="/settings" element={<Settings />} />
          {/* Default redirect to /dashboard */}
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
