
import { getContacts } from "@/services/database";

/**
 * This is a simulation of a backup functionality.
 * In a real application, this would connect to a server-side API
 * to create and manage backups.
 */

export interface BackupMetadata {
  id: string;
  date: Date; // Changed from string to Date type
  size: string;
  type: "auto" | "manual";
  status: "completed" | "failed" | "in-progress";
}

// Helper function to create Date objects safely
const createSafeDate = (dateStr: string): Date => {
  // Make sure we have a valid date
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? new Date() : date;
};

// Simulated backup data with proper Date objects
const mockBackups: BackupMetadata[] = [
  {
    id: "backup-20250501",
    date: createSafeDate("2025-05-01 00:00:00"),
    size: "1.2 MB",
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250502",
    date: createSafeDate("2025-05-02 00:00:00"),
    size: "1.3 MB",
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250503",
    date: createSafeDate("2025-05-03 00:00:00"),
    size: "1.2 MB",
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250504-manual",
    date: createSafeDate("2025-05-04 15:30:00"),
    size: "1.3 MB",
    type: "manual",
    status: "completed"
  },
  {
    id: "backup-20250505",
    date: createSafeDate("2025-05-05 00:00:00"),
    size: "1.3 MB", 
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250506",
    date: createSafeDate("2025-05-06 00:00:00"),
    size: "1.4 MB",
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250507",
    date: createSafeDate("2025-05-07 00:00:00"),
    size: "1.4 MB",
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250508",
    date: createSafeDate("2025-05-08 00:00:00"), 
    size: "1.4 MB",
    type: "auto",
    status: "completed"
  },
  {
    id: "backup-20250509",
    date: createSafeDate("2025-05-09 00:00:00"),
    size: "1.4 MB",
    type: "auto",
    status: "in-progress"
  }
];

// Get all available backups
export const getBackups = (): BackupMetadata[] => {
  return [...mockBackups];
};

// Simulate creating a new backup
export const createBackup = (): Promise<BackupMetadata> => {
  return new Promise((resolve) => {
    // In a real application, this would trigger a server-side backup process
    setTimeout(() => {
      const newBackup: BackupMetadata = {
        id: `backup-manual-${Date.now()}`,
        date: new Date(),
        size: "1.4 MB",
        type: "manual",
        status: "completed"
      };
      mockBackups.push(newBackup);
      resolve(newBackup);
    }, 2000); // Simulate 2 second delay for backup creation
  });
};

// Simulate downloading a backup
export const downloadBackup = (backupId: string): void => {
  // In a real application, this would trigger a download from the server
  
  // For demo purposes, we'll just create a JSON file with the contacts
  const contacts = getContacts();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ 
    backup: { id: backupId, date: new Date().toISOString() },
    data: { contacts }
  }));
  
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `backup-${backupId}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

// Simulate restoring from a backup
export const restoreBackup = (backupId: string): Promise<boolean> => {
  // In a real application, this would trigger a server-side restore process
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulating restore from backup: ${backupId}`);
      // Success
      resolve(true);
    }, 3000); // Simulate 3 second delay for restore
  });
};

// Simulate checking backup status (for automated backups)
export const getBackupStatus = (): { lastBackup: Date | null; nextBackup: Date } => {
  // In a real application, this would query the server for actual backup status
  const completedBackups = mockBackups.filter(b => b.status === "completed");
  const lastBackup = completedBackups.length > 0 ? 
    completedBackups[completedBackups.length - 1].date : 
    null;
  
  // Simulate next backup at midnight
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  return {
    lastBackup,
    nextBackup: tomorrow
  };
};
