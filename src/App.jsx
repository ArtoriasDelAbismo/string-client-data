import "./App.css";
import Strings from "./components/Strings.jsx";
import Home from "./components/Home.jsx";
import Workshop from "./components/Workshop.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Footer from "./components/Footer.jsx";
import Reclamations from "./components/Reclamations.jsx";
import Demos from "./components/Demos.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
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
            path="/Reclamations"
            element={
              <ProtectedRoute>
                <Reclamations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Demos"
            element={
              <ProtectedRoute>
                <Demos />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
