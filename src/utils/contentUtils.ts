
/**
 * Replaces the {year} placeholder with the current year
 * @param text The text containing the placeholder
 * @returns The text with the placeholder replaced with the current year
 */
export const replaceYearPlaceholder = (text: string): string => {
  if (!text) return '';
  const year = new Date().getFullYear().toString();
  return text.replace(/\{year\}/g, year);
};
