
function adjustColors() {
  const warmthLevel = parseFloat(localStorage.getItem('warmthLevel') || '20'); // Get warmth from storage or default and convert to number
  const warmthFilter = `
      brightness(1.0)
      sepia(${warmthLevel / 100 * 0.3})  // Adjust sepia based on warmth
      saturate(${1 - warmthLevel / 100 * 0.2}) // Adjust saturation
      hue-rotate(-${warmthLevel / 100 * 15}deg) // Adjust hue
  `;

  document.documentElement.style.filter = warmthFilter;
  const elements = document.querySelectorAll('*');
  elements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;

      if (bgColor === 'rgb(255, 255, 255)' || bgColor === 'rgba(255, 255, 255, 1)') { 
          (element as HTMLElement).style.backgroundColor = '#fff8f0'; 
      }

      const textColor = computedStyle.color;

      if (textColor === 'rgb(0, 0, 0)' || textColor === 'rgba(0, 0, 0, 1)') { 
        const newBgColor = window.getComputedStyle(element).backgroundColor;
        const contrast = getContrastRatio(newBgColor, textColor);

        if (contrast < 4.5) { 
          (element as HTMLElement).style.color = '#333'; 
        }
      }
  });
}


// Function to calculate relative luminance (for contrast calculation)
function relativeLuminance(color: string): number {
  const rgb = color.replace(/[^\d,]/g, '').split(',').map(Number);
  const [r, g, b] = rgb.map(c => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Function to calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}


// Run color adjustment when page loads and when storage changes
adjustColors();

// Observe changes in the DOM and reapply the filter
const observer = new MutationObserver(() => {
adjustColors();
});

observer.observe(document.body, {
childList: true,
subtree: true,
attributes: true, // Observe attribute changes as well (important for dynamic styling)
characterData: true // Observe text content changes
});

// Listen for storage changes (if the user changes settings in the popup)
window.addEventListener('storage', () => {
  adjustColors();
});