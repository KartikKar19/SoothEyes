function applyWarmColors(warmthLevel) {
    const allElements = document.querySelectorAll('*');
  
    allElements.forEach(element => {
      if (element.tagName === 'IFRAME') return;
      const originalBackgroundColor = window.getComputedStyle(element).backgroundColor;
      const originalTextColor = window.getComputedStyle(element).color;
      let bgColorHSL = rgbToHsl(originalBackgroundColor);
      let textColorHSL = rgbToHsl(originalTextColor);
      bgColorHSL = adjustWarmth(bgColorHSL, warmthLevel);
      textColorHSL = adjustWarmth(textColorHSL, warmthLevel);
      const newBackgroundColor = hslToRgb(bgColorHSL.h, bgColorHSL.s, bgColorHSL.l);
      const newTextColor = hslToRgb(textColorHSL.h, textColorHSL.s, textColorHSL.l);
      element.style.backgroundColor = newBackgroundColor;
      element.style.color = newTextColor;
  
    });
  }
  
  function rgbToHsl(rgb) {
  }
  
  function hslToRgb(h, s, l) {
  }
  
  function adjustWarmth(hsl, warmthLevel) {
    let h = hsl.h;
    let s = hsl.s;
  
    
    h = (h + 20) % 360; 
    s = Math.min(1, s * (1 + warmthLevel/100)); 
  
    return { h: h, s: s, l: hsl.l };
  }
  
  
  function rgbToHsl(rgb) {
    let r = parseInt(rgb.slice(4, -1).split(',')[0]) / 255;
    let g = parseInt(rgb.slice(4, -1).split(',')[1]) / 255;
    let b = parseInt(rgb.slice(4, -1).split(',')[2]) / 255;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return { h: h * 360, s: s * 100, l: l * 100 };
  }
  
  window.addEventListener('load', () => {
    const warmthLevel = 20; 
    applyWarmColors(warmthLevel);
  });

  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      applyWarmColors(warmthLevel);
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  });



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updateSettings') {
        if (request.intensity !== undefined) {
          localStorage.setItem('warmthLevel', request.intensity);
        }
        if (request.isEnabled !== undefined) {
          localStorage.setItem('isEnabled', request.isEnabled);
        }
        adjustColors(); 
    }
});

