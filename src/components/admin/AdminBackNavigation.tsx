
import React from "react";
import { useNavigate } from "react-router-dom";

interface AdminBackNavigationProps {
  title: string;
  backTo?: string;
}

const AdminBackNavigation: React.FC<AdminBackNavigationProps> = ({
  title,
  backTo = "/admin/dashboard",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-6">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default AdminBackNavigation;
