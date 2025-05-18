
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
  
  // Also run fixes when DOM content changes
  const observer = new MutationObserver(() => {
    runFixes();
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
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

// Auto-initialize on import
applyAccessibilityFixes();
