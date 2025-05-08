
import React from "react";
import { getContacts, getPageViews, getGalleryItems } from "@/services/database";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Contact } from "./AdminContacts";

const AdminDashboard = () => {
  const contacts = getContacts() as Contact[];
  const pageViews = getPageViews();
  const galleryItems = getGalleryItems();
  
  // Calculate stats
  const totalContacts = contacts.length;
  const totalPageViews = pageViews.length;
  const totalGalleryItems = galleryItems.length;
  
  // Get recent contacts
  const recentContacts = contacts.slice(0, 5);
  
  // Calculate device stats
  const deviceStats = pageViews.reduce((acc, view) => {
    const deviceType = view.device || 'Unknown';
    acc[deviceType] = (acc[deviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate page stats
  const pageStats = pageViews.reduce((acc, view) => {
    const path = view.path || '/';
    acc[path] = (acc[path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">דשבורד</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">פניות חדשות</CardTitle>
              <CardDescription>סך כל הפניות מטופס יצירת קשר</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalContacts}</div>
              <Link to="/admin/contacts" className="text-sm text-bstudio-primary hover:underline">
                צפה בכל הפניות
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">צפיות בדף</CardTitle>
              <CardDescription>סך כל הצפיות באתר</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPageViews}</div>
              <Link to="/admin/analytics" className="text-sm text-bstudio-primary hover:underline">
                צפה באנליטיקס מלא
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">פריטי גלריה</CardTitle>
              <CardDescription>סך כל העבודות בגלריה</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalGalleryItems}</div>
              <Link to="/admin/gallery" className="text-sm text-bstudio-primary hover:underline">
                נהל גלריה
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">פניות אחרונות</CardTitle>
          </CardHeader>
          <CardContent>
            {recentContacts.length === 0 ? (
              <p className="text-muted-foreground">אין פניות חדשות</p>
            ) : (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <span className="font-medium">{contact.name}</span>
                      <span className="text-muted-foreground">
                        {contact.date ? new Date(contact.date).toLocaleDateString() : "לא זמין"}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-muted-foreground">{contact.email}</span>
                      <span>{contact.subject || "לא צוין"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">צפיות לפי מכשיר</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(deviceStats).length === 0 ? (
                <p className="text-muted-foreground">אין נתונים זמינים</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(deviceStats).map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <span>{device}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Page stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">דפים פופולריים</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(pageStats).length === 0 ? (
                <p className="text-muted-foreground">אין נתונים זמינים</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(pageStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([path, count]) => (
                      <div key={path} className="flex items-center justify-between">
                        <span>{path === "/" ? "דף הבית" : path}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
