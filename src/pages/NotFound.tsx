
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import PageMeta from "@/components/PageMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PageMeta 
        title="דף לא נמצא - 404" 
        description="הדף המבוקש לא נמצא באתר"
        keywords="404, שגיאה, דף לא נמצא"
        noIndex={true}
      />
      <div className="text-center max-w-md p-8">
        <h1 className="text-7xl font-bold text-bstudio-primary mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">הדף שחיפשת לא נמצא</p>
        <p className="text-gray-500 mb-8">
          ייתכן שהעמוד הוסר, שונה שמו או שהוא אינו זמין באופן זמני.
        </p>
        <div className="space-x-4 flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button size="lg" title="חזרה לדף הבית">
              חזרה לדף הבית
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" title="צור קשר">
              צור קשר
            </Button>
          </Link>
        </div>
      </div>
      <AccessibilityWidget />
    </div>
  );
};

export default NotFound;
