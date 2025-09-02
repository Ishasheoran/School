import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import ShowSchools from "./components/showSchool";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/add" element={<Form />} />
        <Route path="/show" element={<ShowSchools />} />
        <Route path="*" element={<Form />} /> {/* default route */}
      </Routes>
    </Router>
  );
}

export default App;
