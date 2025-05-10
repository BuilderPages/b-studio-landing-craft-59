
// Simple utility function to get the current year
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

// Format a date safely, returns a fallback string if date is invalid
export const formatDateSafe = (date: Date | null | undefined | string, formatString: string): string => {
  if (!date) {
    return "תאריך לא זמין";
  }
  
  try {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    
    if (!dateObject || isNaN(dateObject.getTime())) {
      return "תאריך לא זמין";
    }
    
    const { format } = require('date-fns');
    return format(dateObject, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "תאריך לא זמין";
  }
};

// Compare two dates to check if they're the same day
export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  try {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return false;
    }
    
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  } catch (error) {
    console.error("Error comparing dates:", error);
    return false;
  }
};

// Get today's date with time set to midnight
export const getTodayDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Check if a date string is valid
export const isValidDateString = (dateString: string): boolean => {
  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};

// Parse date safely, returns null if invalid
export const parseDateSafe = (dateString: string): Date | null => {
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
};

// Format date in Hebrew format
export const formatHebrewDate = (date: Date | string | null): string => {
  if (!date) return "תאריך לא זמין";
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "תאריך לא זמין";
    
    return dateObj.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return "תאריך לא זמין";
  }
};
