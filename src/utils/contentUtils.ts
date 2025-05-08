
/**
 * Replaces {year} placeholder with the current year
 * @param text Text containing {year} placeholder
 * @returns Text with {year} replaced with current year
 */
export const replaceYearPlaceholder = (text: string): string => {
  if (!text) return '';
  const currentYear = new Date().getFullYear();
  return text.replace(/{year}/g, currentYear.toString());
};
