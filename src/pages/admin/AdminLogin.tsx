
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login, isLoggedIn } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    if (!username || !password) {
      setError("נא למלא את כל השדות");
      setIsSubmitting(false);
      return;
    }
    
    // Try to login
    if (login(username, password)) {
      navigate("/admin/dashboard");
    } else {
      setError("שם משתמש או סיסמה שגויים");
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">כניסה לממשק ניהול</CardTitle>
            <CardDescription>הזן את פרטי הכניסה שלך</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">שם משתמש</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="הזן שם משתמש"
                    autoComplete="username"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">סיסמה</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="הזן סיסמה"
                    autoComplete="current-password"
                    dir="rtl"
                  />
                </div>
              </div>
              <Button
                className="w-full mt-6"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "מתחבר..." : "התחבר"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            שם משתמש וסיסמה ברירת מחדל: admin / admin123
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
