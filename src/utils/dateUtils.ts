
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
