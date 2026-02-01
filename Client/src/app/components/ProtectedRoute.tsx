import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  // ⏳ Wait until auth is checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking authentication…
      </div>
    );
  }

  // 🔐 Redirect only AFTER loading finishes
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
