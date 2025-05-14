
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
  
  // Replace deprecated -ms-high-contrast styles with Forced Colors Mode
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
      
      // If button doesn't have aria-label, add it as well
      if (!button.hasAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
      }
    } else if (button.querySelector('svg')) {
      // If button has an SVG icon but no text
      const ariaLabel = button.getAttribute('aria-label');
      if (ariaLabel) {
        button.setAttribute('title', ariaLabel);
      } else {
        // If no text or aria-label, use a default based on context
        const defaultTitle = 'כפתור';
        button.setAttribute('title', defaultTitle);
        button.setAttribute('aria-label', defaultTitle);
      }
    }
  });
  
  // Add titles to links without one
  document.querySelectorAll('a:not([title])').forEach(link => {
    if (link.textContent?.trim()) {
      link.setAttribute('title', link.textContent.trim());
    }
  });
  
  // Add titles to interactive form elements
  document.querySelectorAll('input:not([title]), textarea:not([title]), select:not([title])').forEach(element => {
    const inputElement = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const placeholder = inputElement.getAttribute('placeholder');
    const label = document.querySelector(`label[for="${inputElement.id}"]`);
    
    if (label && label.textContent) {
      inputElement.setAttribute('title', label.textContent.trim());
    } else if (placeholder) {
      inputElement.setAttribute('title', placeholder);
    }
  });
};

/**
 * Replace deprecated -ms-high-contrast styles with modern Forced Colors Mode
 */
const replaceDeprecatedHighContrast = (): void => {
  // Create a style element to add our forced-colors replacement
  const style = document.createElement('style');
  
  // Add modern forced-colors mode alternatives
  style.textContent = `
    @media (forced-colors: active) {
      /* General elements */
      a:focus {
        outline: 2px solid CanvasText;
      }
      button:focus {
        outline: 2px solid CanvasText;
      }
      input:focus, textarea:focus, select:focus {
        outline: 2px solid CanvasText;
      }
      
      /* Interactive elements */
      button, .button, [role="button"] {
        forced-color-adjust: none;
        color: ButtonText;
        background-color: ButtonFace;
        border: 1px solid ButtonText;
      }
      
      /* Links */
      a {
        color: LinkText;
      }
      
      /* Enhanced focus styles */
      *:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 2px;
      }
    }
  `;
  
  // Append to head
  document.head.appendChild(style);
};

// Auto-initialize on import
applyAccessibilityFixes();
