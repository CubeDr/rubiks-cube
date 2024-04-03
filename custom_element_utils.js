/**
 * Create a HTMLDivElement with given class names.
 * @param {string[]} classNames 
 */
export function createElement(...classNames) {
    const element = document.createElement('div');
    element.classList.add(...classNames);
    return element;
}

/**
 * Add <style> tag with given style to the shadow.
 * @param {ShadowRoot} shadow 
 * @param {string} style 
 */
export function addStyle(shadow, style) {
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    shadow.appendChild(styleElement);
}