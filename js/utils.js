/**
 * Utility functions for DOM manipulation and animations
 */

// Helper to create an element with classes and content
export function createElement(tag, className, textContent = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
}

// Random number generator in range
export function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Clamp function
export function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

// Map range function (for parallax)
export function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
