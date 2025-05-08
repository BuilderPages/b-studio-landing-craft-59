
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getPageViews } from "@/services/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminAnalytics = () => {
  const [pageViews, setPageViews] = useState(getPageViews());
  
  useEffect(() => {
    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      setPageViews(getPageViews());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Process data for charts
  const deviceData = processDeviceData(pageViews);
  const pageViewsData = processPageViewsData(pageViews);
  const timeData = processTimeData(pageViews);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">אנליטיקס</h1>

        {pageViews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">אין נתונים זמינים</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">סך הכל צפיות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pageViews.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">מכשירים ייחודיים</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{deviceData.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">דפים נצפים</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pageViewsData.length}</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>צפיות לפי דף</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pageViewsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#1E40AF" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>התפלגות מכשירים</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? "#1E40AF" : index === 1 ? "#0EA5E9" : "#F97316"} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>צפיות לאורך זמן</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#0EA5E9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>פרטי צפיות אחרונות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          תאריך ושעה
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          דף
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          מכשיר
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pageViews.slice(0, 10).map((view) => (
                        <tr key={view.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {new Date(view.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">
                              {view.path === "/" ? "דף הבית" : view.path}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{view.device}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

// Helper functions to process data for charts
function processDeviceData(pageViews) {
  const devices = {};
  pageViews.forEach((view) => {
    devices[view.device] = (devices[view.device] || 0) + 1;
  });
  
  return Object.keys(devices).map((key) => ({
    name: key,
    value: devices[key],
  }));
}

function processPageViewsData(pageViews) {
  const pages = {};
  pageViews.forEach((view) => {
    const pageName = view.path === "/" ? "דף הבית" : view.path;
    pages[pageName] = (pages[pageName] || 0) + 1;
  });
  
  return Object.keys(pages).map((key) => ({
    name: key,
    views: pages[key],
  }));
}

function processTimeData(pageViews) {
  const dates = {};
  
  pageViews.forEach((view) => {
    const date = new Date(view.timestamp).toLocaleDateString();
    dates[date] = (dates[date] || 0) + 1;
  });
  
  return Object.keys(dates).map((key) => ({
    date: key,
    views: dates[key],
  }));
}

export default AdminAnalytics;
