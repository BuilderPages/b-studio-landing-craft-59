
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAdminCredentials, updateAdminCredentials, isLoggedIn } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin/login");
      return;
    }
    
    // Load current username
    const credentials = getAdminCredentials();
    setUsername(credentials.username);
  }, [navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    // Validate inputs
    if (!username) {
      setError("שם משתמש אינו יכול להיות ריק");
      setIsSubmitting(false);
      return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
      setError("הסיסמאות החדשות אינן תואמות");
      setIsSubmitting(false);
      return;
    }
    
    // Get current credentials
    const credentials = getAdminCredentials();
    
    // Verify current password if attempting to change password
    if (newPassword && credentials.password !== currentPassword) {
      setError("הסיסמה הנוכחית אינה נכונה");
      setIsSubmitting(false);
      return;
    }
    
    // Update credentials
    const updatedCredentials = {
      username,
      password: newPassword ? newPassword : credentials.password
    };
    
    updateAdminCredentials(updatedCredentials);
    
    // Show success message
    toast({
      title: "הפרטים עודכנו בהצלחה",
      description: "פרטי הכניסה לממשק הניהול עודכנו",
    });
    
    // Reset password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    setIsSubmitting(false);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">הגדרות מערכת</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">עדכון פרטי כניסה</CardTitle>
            <CardDescription>שנה את שם המשתמש והסיסמה לממשק הניהול</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">שם משתמש</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="הזן שם משתמש חדש"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current-password">סיסמה נוכחית</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="הזן את הסיסמה הנוכחית"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">סיסמה חדשה (השאר ריק אם אינך רוצה לשנות)</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="הזן סיסמה חדשה"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">אימות סיסמה חדשה</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="הזן שוב את הסיסמה החדשה"
                  dir="rtl"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2"
              >
                {isSubmitting ? "שומר שינויים..." : "שמור שינויים"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
