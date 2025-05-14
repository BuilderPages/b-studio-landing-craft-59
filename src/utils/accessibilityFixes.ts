
import { ensureImagesHaveAlt, ensureAccessibleInteractiveElements, ensureFormAccessibility } from './contentUtils';

/**
 * Apply accessibility fixes to the entire document
 */
export const applyAccessibilityFixes = (): void => {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFixes);
  } else {
    runFixes();
  }
};

/**
 * Run all accessibility fixes
 */
const runFixes = (): void => {
  // Fix images alt text
  ensureImagesHaveAlt(document.body);
  
  // Fix interactive elements
  ensureAccessibleInteractiveElements(document.body);
  
  // Fix form elements
  ensureFormAccessibility(document.body);
  
  // Add missing title attributes to buttons
  addMissingTitles();
  
  // Replace deprecated -ms-high-contrast styles
  replaceDeprecatedHighContrast();
};

/**
 * Add missing title attributes to elements that need them
 */
const addMissingTitles = (): void => {
  // Add titles to buttons without one
  document.querySelectorAll('button:not([title])').forEach(button => {
    if (button.textContent?.trim()) {
      button.setAttribute('title', button.textContent.trim());
    } else if (button.querySelector('svg')) {
      // If button has an SVG icon but no text
      const ariaLabel = button.getAttribute('aria-label');
      if (ariaLabel) {
        button.setAttribute('title', ariaLabel);
      }
    }
  });
};

/**
 * Replace deprecated -ms-high-contrast styles with modern alternatives
 */
const replaceDeprecatedHighContrast = (): void => {
  // Create a style element
  const style = document.createElement('style');
  
  // Add modern forced-colors mode alternatives
  style.textContent = `
    @media (forced-colors: active) {
      /* Add high contrast mode styles here */
      a:focus {
        outline: 2px solid CanvasText;
      }
      button:focus {
        outline: 2px solid CanvasText;
      }
    }
  `;
  
  // Append to head
  document.head.appendChild(style);
};

// Auto-initialize on import
applyAccessibilityFixes();
