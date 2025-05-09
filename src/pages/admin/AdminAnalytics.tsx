
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getPageViews } from "@/services/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodayDate, isSameDay } from "@/utils/dateUtils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface BannedIP {
  ip: string;
  date: Date;
}

const AdminAnalytics = () => {
  const [pageViews, setPageViews] = useState(getPageViews());
  const [bannedIPs, setBannedIPs] = useState<BannedIP[]>(() => {
    const saved = localStorage.getItem("bannedIPs");
    return saved ? JSON.parse(saved) : [];
  });
  const [ipToBlock, setIpToBlock] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<{[key: string]: Date}>({});
  
  useEffect(() => {
    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      setPageViews(getPageViews());
    }, 60000);
    
    // Setup storage for banned IPs if it doesn't exist
    if (!localStorage.getItem("bannedIPs")) {
      localStorage.setItem("bannedIPs", JSON.stringify([]));
    }
    
    // Create simulated online users
    const simulateOnlineUsers = () => {
      // Current timestamp to check for active users (within last 5 minutes)
      const now = new Date();
      const activeTimeWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      // Clean up old users
      const stillOnline = { ...onlineUsers };
      for (const ip in stillOnline) {
        if (now.getTime() - new Date(stillOnline[ip]).getTime() > activeTimeWindow) {
          delete stillOnline[ip];
        }
      }
      
      // Add some random active users for demo purposes
      const recentVisitors = pageViews
        .filter(view => !bannedIPs.some(banned => banned.ip === view.ip))
        .slice(-20);
      
      // Randomly select some visitors as "online"
      recentVisitors.forEach(visitor => {
        if (Math.random() > 0.7) { // 30% chance to be "online"
          stillOnline[visitor.ip] = new Date();
        }
      });
      
      setOnlineUsers(stillOnline);
    };
    
    simulateOnlineUsers();
    const onlineInterval = setInterval(simulateOnlineUsers, 30000);
    
    return () => {
      clearInterval(interval);
      clearInterval(onlineInterval);
    };
  }, [bannedIPs]);

  // Save banned IPs to local storage
  useEffect(() => {
    localStorage.setItem("bannedIPs", JSON.stringify(bannedIPs));
  }, [bannedIPs]);

  // Ban an IP address
  const banIP = (ip: string) => {
    if (!ip) return;
    
    const alreadyBanned = bannedIPs.some(banned => banned.ip === ip);
    if (!alreadyBanned) {
      setBannedIPs([...bannedIPs, { ip, date: new Date() }]);
      alert(`כתובת IP ${ip} נחסמה בהצלחה`);
      setIpToBlock("");
    } else {
      alert(`כתובת IP ${ip} כבר חסומה`);
    }
  };
  
  // Unban an IP address
  const unbanIP = (ip: string) => {
    setBannedIPs(bannedIPs.filter(banned => banned.ip !== ip));
  };
  
  // Filter out banned IPs from view data
  const filteredPageViews = pageViews.filter(
    view => !bannedIPs.some(banned => banned.ip === view.ip)
  );

  // Process data for charts
  const deviceData = processDeviceData(filteredPageViews);
  const pageViewsData = processPageViewsData(filteredPageViews);
  const timeData = processTimeData(filteredPageViews);
  const uniqueVisitorData = processUniqueVisitors(filteredPageViews);

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">סך הכל צפיות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{filteredPageViews.length}</div>
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
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">משתמשים אונליין</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{Object.keys(onlineUsers).length}</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>צפיות לפי דף</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ChartContainer
                    config={{
                      pageViews: { color: "#1E40AF" }
                    }}
                  >
                    <BarChart
                      data={pageViewsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" />
                      <YAxis />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent 
                            labelFormatter={(label) => `דף: ${label}`}
                          />
                        }
                      />
                      <Bar dataKey="views" name="pageViews" />
                    </BarChart>
                  </ChartContainer>
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
                <ChartContainer
                  config={{
                    views: { color: "#0EA5E9" }
                  }}
                >
                  <BarChart
                    data={timeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          labelFormatter={(label) => `תאריך: ${label}`}
                        />
                      }
                    />
                    <Bar dataKey="views" name="views" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>מבקרים ייחודיים לפי יום (לפי IP)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    visitors: { color: "#8884d8" }
                  }}
                >
                  <LineChart
                    data={uniqueVisitorData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent 
                          labelFormatter={(label) => `תאריך: ${label}`}
                        />
                      }
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      name="visitors" 
                      strokeWidth={2} 
                      stroke="#8884d8" 
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ניהול חסימות IP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-4">
                    <Input
                      value={ipToBlock}
                      onChange={(e) => setIpToBlock(e.target.value)}
                      placeholder="הכנס כתובת IP"
                      className="ml-2"
                    />
                    <Button onClick={() => banIP(ipToBlock)}>חסום IP</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>כתובת IP</TableHead>
                        <TableHead>תאריך חסימה</TableHead>
                        <TableHead>פעולות</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bannedIPs.length > 0 ? (
                        bannedIPs.map((banned) => (
                          <TableRow key={banned.ip}>
                            <TableCell>{banned.ip}</TableCell>
                            <TableCell>{new Date(banned.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => unbanIP(banned.ip)}
                              >
                                בטל חסימה
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            אין כתובות IP חסומות
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>משתמשים אונליין כרגע</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>כתובת IP</TableHead>
                        <TableHead>פעילות אחרונה</TableHead>
                        <TableHead>פעולות</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(onlineUsers).length > 0 ? (
                        Object.keys(onlineUsers).map((ip) => (
                          <TableRow key={ip}>
                            <TableCell>{ip}</TableCell>
                            <TableCell>{new Date(onlineUsers[ip]).toLocaleTimeString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => banIP(ip)}
                              >
                                חסום IP
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            אין משתמשים מחוברים כרגע
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
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
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          כתובת IP
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPageViews.slice(0, 10).map((view) => (
                        <tr key={view.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {new Date(view.date).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">
                              {view.path === "/" ? "דף הבית" : view.path}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{view.device}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{view.ip}</div>
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
    const date = new Date(view.date).toLocaleDateString();
    dates[date] = (dates[date] || 0) + 1;
  });
  
  return Object.keys(dates).map((key) => ({
    date: key,
    views: dates[key],
  }));
}

function processUniqueVisitors(pageViews) {
  // Group by day and then count unique IPs for each day
  const visitorsByDay = {};
  
  pageViews.forEach((view) => {
    const date = new Date(view.date).toLocaleDateString();
    if (!visitorsByDay[date]) {
      visitorsByDay[date] = new Set();
    }
    if (view.ip) {
      visitorsByDay[date].add(view.ip);
    }
  });
  
  return Object.keys(visitorsByDay).map((date) => ({
    date: date,
    visitors: visitorsByDay[date].size
  }));
}

export default AdminAnalytics;
