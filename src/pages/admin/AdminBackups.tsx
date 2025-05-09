
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBackNavigation from "@/components/admin/AdminBackNavigation";
import { Download, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getBackups, 
  createBackup, 
  downloadBackup, 
  restoreBackup, 
  getBackupStatus,
  BackupMetadata
} from "@/utils/backupUtils";
import { formatDateSafe } from "@/utils/dateUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AdminBackups = () => {
  const [backups, setBackups] = useState<BackupMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState<boolean>(false);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [backupStatus, setBackupStatus] = useState<{ lastBackup: Date | null; nextBackup: Date }>({
    lastBackup: null,
    nextBackup: new Date()
  });
  
  const { toast } = useToast();

  useEffect(() => {
    loadBackups();
    loadBackupStatus();
    
    // Simulated automatic refresh every minute
    const interval = setInterval(loadBackupStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadBackups = () => {
    setBackups(getBackups());
  };

  const loadBackupStatus = () => {
    setBackupStatus(getBackupStatus());
  };

  const handleCreateBackup = async () => {
    setIsLoading(true);
    
    try {
      await createBackup();
      loadBackups();
      toast({
        title: "גיבוי נוצר בהצלחה",
        description: "הגיבוי החדש נוצר ונשמר במערכת",
      });
    } catch (error) {
      toast({
        title: "שגיאה ביצירת גיבוי",
        description: "אירעה שגיאה בעת יצירת הגיבוי, אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadBackup = (backupId: string) => {
    try {
      downloadBackup(backupId);
      toast({
        title: "הורדת גיבוי",
        description: "הגיבוי מורד למחשבך",
      });
    } catch (error) {
      toast({
        title: "שגיאה בהורדת הגיבוי",
        description: "אירעה שגיאה בעת הורדת הגיבוי, אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    }
  };

  const handleRestoreConfirm = (backupId: string) => {
    setSelectedBackup(backupId);
    setIsRestoreDialogOpen(true);
  };

  const handleRestore = async () => {
    if (!selectedBackup) return;
    
    setIsRestoring(true);
    
    try {
      const success = await restoreBackup(selectedBackup);
      
      if (success) {
        toast({
          title: "שחזור הושלם בהצלחה",
          description: "המערכת שוחזרה בהצלחה מהגיבוי שנבחר",
        });
      } else {
        toast({
          title: "שחזור נכשל",
          description: "אירעה שגיאה בעת שחזור המערכת, אנא נסה שוב מאוחר יותר",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "שגיאה בשחזור",
        description: "אירעה שגיאה בעת שחזור המערכת, אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsRestoring(false);
      setIsRestoreDialogOpen(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminBackNavigation title="מערכת גיבויים" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>סטטוס גיבויים</CardTitle>
              <CardDescription>מידע על הגיבויים האוטומטיים</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">גיבוי אחרון:</p>
                  <p>
                    {backupStatus.lastBackup 
                      ? formatDateSafe(backupStatus.lastBackup, "dd/MM/yyyy HH:mm:ss") 
                      : "לא בוצע גיבוי עדיין"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">גיבוי הבא מתוכנן:</p>
                  <p>{formatDateSafe(backupStatus.nextBackup, "dd/MM/yyyy HH:mm:ss")}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                המערכת מבצעת גיבוי אוטומטי מדי יום בשעה 00:00.
              </p>

              <Button 
                onClick={handleCreateBackup} 
                disabled={isLoading} 
                className="w-full mt-4"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    יוצר גיבוי...
                  </>
                ) : (
                  <>צור גיבוי ידני</>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>מידע על המערכת</CardTitle>
              <CardDescription>פרטים טכניים על מערכת הגיבויים</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">סוג הגיבוי:</p>
                <p>גיבוי מלא (נתונים + תצורה)</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">תדירות גיבוי אוטומטי:</p>
                <p>מדי יום בחצות (00:00)</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">תקופת שמירה:</p>
                <p>30 ימים</p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium text-amber-600">הערה חשובה:</p>
                <p className="text-sm text-gray-600">
                  בפיתוח זה, מערכת הגיבויים היא הדגמה בלבד. בסביבת אמת, הגיבויים יישמרו בשרת מאובטח.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>רשימת גיבויים</CardTitle>
            <CardDescription>גיבויים זמינים להורדה או שחזור</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">פעולות</TableHead>
                  <TableHead className="text-right">סוג</TableHead>
                  <TableHead className="text-right">סטטוס</TableHead>
                  <TableHead className="text-right">גודל</TableHead>
                  <TableHead className="text-right">תאריך</TableHead>
                  <TableHead className="text-right">מזהה</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.length > 0 ? backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadBackup(backup.id)}
                          disabled={backup.status !== "completed"}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={backup.status !== "completed"}
                          onClick={() => handleRestoreConfirm(backup.id)}
                        >
                          שחזר
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {backup.type === "auto" ? "אוטומטי" : "ידני"}
                    </TableCell>
                    <TableCell>
                      {backup.status === "completed" ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          הושלם
                        </span>
                      ) : backup.status === "in-progress" ? (
                        <span className="flex items-center text-blue-600">
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          בתהליך
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          נכשל
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      {formatDateSafe(backup.date, "dd/MM/yyyy HH:mm:ss")}
                    </TableCell>
                    <TableCell>{backup.id}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      לא נמצאו גיבויים
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">שחזור מגיבוי</DialogTitle>
              <DialogDescription className="text-right">
                האם אתה בטוח שברצונך לשחזר את המערכת מגיבוי זה? פעולה זו תחליף את כל הנתונים הקיימים.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsRestoreDialogOpen(false)}
                disabled={isRestoring}
              >
                ביטול
              </Button>
              <Button
                variant="destructive"
                onClick={handleRestore}
                disabled={isRestoring}
              >
                {isRestoring ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    משחזר...
                  </>
                ) : (
                  <>אישור שחזור</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBackups;
