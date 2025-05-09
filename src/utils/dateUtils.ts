
// Simple utility function to get the current year
export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

// Format a date safely, returns a fallback string if date is invalid
export const formatDateSafe = (date: Date | null | undefined, formatString: string): string => {
  if (!date || isNaN(date.getTime())) {
    return "תאריך לא זמין";
  }
  
  try {
    const { format } = require('date-fns');
    return format(date, formatString);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "תאריך לא זמין";
  }
};

// Compare two dates to check if they're the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Get today's date with time set to midnight
export const getTodayDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
