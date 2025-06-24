import "./App.css";
import Strings from "./components/Strings.jsx";
import Home from "./components/Home.jsx";
import Workshop from "./components/Workshop.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import { useState } from "react";
import OrderForm from "./components/OrderForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/strings"
          element={
            <ProtectedRoute>
              <Strings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workshop"
          element={
            <ProtectedRoute>
              <Workshop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/OrderForm"
          element={
            <ProtectedRoute>
              <OrderForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
