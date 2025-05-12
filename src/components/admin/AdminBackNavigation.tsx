
import React from "react";

interface AdminBackNavigationProps {
  title: string;
}

const AdminBackNavigation: React.FC<AdminBackNavigationProps> = ({
  title
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-6">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default AdminBackNavigation;
