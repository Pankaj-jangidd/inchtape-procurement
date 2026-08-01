import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Role = "SUPERVISOR" | "PROCUREMENT" | "ADMIN";

interface Props {
  children: React.ReactNode;
  role: Role;
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
