
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate(backTo)}
        >
          <ChevronRight className="h-4 w-4" />
          <span>חזרה</span>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default AdminBackNavigation;
