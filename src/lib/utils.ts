
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to check if browser is in high contrast mode
export function isHighContrastMode() {
  // Use modern forced-colors detection instead of deprecated -ms-high-contrast
  if (typeof window !== "undefined") {
    // Check if forced-colors media query is supported
    return window.matchMedia("(forced-colors: active)").matches;
  }
  return false;
}

// Function to apply high contrast accessible styles
export function applyHighContrastStyles(baseStyles: string, highContrastStyles: string): string {
  return `${baseStyles} ${isHighContrastMode() ? highContrastStyles : ''}`;
}
