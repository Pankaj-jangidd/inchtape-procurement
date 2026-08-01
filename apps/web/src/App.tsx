import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import ProcurementDashboard from "./pages/ProcurementDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/supervisor"
        element={
          <ProtectedRoute role="SUPERVISOR">
            <SupervisorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/procurement"
        element={
          <ProtectedRoute role="PROCUREMENT">
            <ProcurementDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
