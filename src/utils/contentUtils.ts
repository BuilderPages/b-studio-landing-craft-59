
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

/**
 * Ensures all image elements have proper alt text for accessibility
 * @param element The DOM element to check
 */
export const ensureImagesHaveAlt = (element: HTMLElement): void => {
  if (!element) return;
  
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      // If no alt attribute is present, add an empty one for decorative images
      img.alt = '';
    }
    
    // Add lazy loading to images
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
};

/**
 * Ensures all interactive elements have proper ARIA labels
 * @param element The DOM element to check
 */
export const ensureAccessibleInteractiveElements = (element: HTMLElement): void => {
  if (!element) return;
  
  // Check buttons
  const buttons = element.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.hasAttribute('aria-label') && !button.title) {
      const buttonText = button.textContent?.trim();
      if (buttonText) {
        button.setAttribute('title', buttonText);
      }
    }
  });
  
  // Check links
  const links = element.querySelectorAll('a');
  links.forEach(link => {
    if (!link.hasAttribute('aria-label') && !link.title) {
      const linkText = link.textContent?.trim();
      if (linkText) {
        link.setAttribute('title', linkText);
      }
    }
  });
};

/**
 * Ensures all form inputs have accessible labels
 * @param element The DOM element to check
 */
export const ensureFormAccessibility = (element: HTMLElement): void => {
  if (!element) return;
  
  const inputs = element.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const inputElement = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    
    // Check if input has accessible name through label, aria-label, or aria-labelledby
    const hasLabel = document.querySelector(`label[for="${inputElement.id}"]`);
    const hasAriaLabel = inputElement.hasAttribute('aria-label');
    const hasAriaLabelledBy = inputElement.hasAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy && !inputElement.title) {
      // If no accessible name is present, add title as fallback
      const placeholder = inputElement.getAttribute('placeholder');
      if (placeholder) {
        inputElement.setAttribute('title', placeholder);
      }
    }
  });
};
