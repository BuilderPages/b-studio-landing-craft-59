
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/services/authService";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  return <>{children}</>;
};

export default AdminAuthGuard;
