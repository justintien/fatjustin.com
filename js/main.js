import config from './config.js';
import { createElement, mapRange, clamp } from './utils.js';

class App {
    constructor() {
        this.currentThemeKey = 'neon';
        this.init();
    }

    init() {
        this.render();
        this.applyTheme(this.currentThemeKey);
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.setupCursor();
        this.printConsoleArt();
    }

    render() {
        const { siteInfo, slogans, socials } = config;

        // 1. Render Header (Massive Typography Layout)
        const header = document.querySelector('header');
        header.innerHTML = '';

        const h1 = createElement('h1', 'fat-text');
        // Split "FAT JUSTIN" into two lines for impact
        const line1 = createElement('span', 'line line-1', 'FAT');
        const line2 = createElement('span', 'line line-2', 'JUSTIN');
        h1.appendChild(line1);
        h1.appendChild(document.createElement('br'));
        h1.appendChild(line2);

        const subtitle = createElement('div', 'subtitle');
        subtitle.innerHTML = `<span class="heavy">IS</span> <span class="thin strike">THIN</span> <span class="heavy">NOT THIN</span>`;

        header.appendChild(h1);
        header.appendChild(subtitle);

        // 2. Render Slogans (Ticker or Overlay style)
        const sloganContainer = document.querySelector('.slogans');
        sloganContainer.innerHTML = '';

        slogans.forEach((slogan, index) => {
            const item = createElement('div', 'slogan-item');
            if (index % 2 === 0) item.classList.add('align-left');
            else item.classList.add('align-right');

            const text = createElement('span', slogan.type === 'heavy' ? 'heavy-text' : 'light-text', slogan.text);
            item.appendChild(text);
            sloganContainer.appendChild(item);
        });

        // 3. Render Socials (Bottom Bar)
        const socialContainer = document.querySelector('.socials');
        socialContainer.innerHTML = '';

        socials.forEach(link => {
            const a = createElement('a', 'social-link');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.textContent = link.label; // Simple text for clean brutalist look
            socialContainer.appendChild(a);
        });

        // 4. Render Footer
        const footerText = document.querySelector('.footer-text');
        if (footerText) footerText.textContent = siteInfo.footerText;
    }

    applyTheme(themeKey) {
        const theme = config.themes[themeKey] || config.themes.neon;
        const root = document.documentElement;

        root.style.setProperty('--bg-color', theme.colors.bg);
        root.style.setProperty('--text-color', theme.colors.text);
        root.style.setProperty('--accent-color', theme.colors.accent);
        root.style.setProperty('--secondary-color', theme.colors.secondary);

        this.currentThemeKey = themeKey;

        // Update meta theme color
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = "theme-color";
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = theme.colors.bg;
    }

    toggleTheme() {
        const keys = Object.keys(config.themes);
        let nextIndex = keys.indexOf(this.currentThemeKey) + 1;
        if (nextIndex >= keys.length) nextIndex = 0;
        const nextTheme = keys[nextIndex];

        this.applyTheme(nextTheme);
        this.showToast(`Theme: ${config.themes[nextTheme].name}`);
    }

    setupEventListeners() {
        // Theme Toggle Click
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Parallax / Interaction
        const lines = document.querySelectorAll('.line');

        const handleParallax = (clientX, clientY) => {
            const x = mapRange(clientX, 0, window.innerWidth, -30, 30);
            const y = mapRange(clientY, 0, window.innerHeight, -30, 30);

            lines.forEach((line, i) => {
                const factor = (i + 1) * 0.5; // Stagger effect
                line.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        };

        document.addEventListener('mousemove', (e) => handleParallax(e.clientX, e.clientY));

        // Touch support for gravity/parallax
        document.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length > 0) {
                handleParallax(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Check for Cmd/Ctrl
            const isCmd = e.metaKey || e.ctrlKey;

            if (isCmd && e.key === 'k') {
                e.preventDefault();
                this.toggleTheme();
            }

            if (isCmd && e.key === '/') {
                e.preventDefault();
                this.showHelp();
            }
        });
    }

    setupCursor() {
        const cursor = document.getElementById('custom-cursor');
        if (!cursor) return;

        const moveCursor = (e) => {
            let clientX, clientY;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('touchmove', moveCursor, { passive: true });
        // Touch: Make cursor solid (active) when touching
        document.addEventListener('touchstart', (e) => {
            cursor.classList.add('hover');
            moveCursor(e);
        }, { passive: true });

        document.addEventListener('touchend', () => {
            cursor.classList.remove('hover');
        });

        // Add hover states for desktop mouse
        const interactives = document.querySelectorAll('a, button, .line');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    printConsoleArt() {
        console.clear();
        console.log(
            '%c FAT JUSTIN ',
            'background: #000; color: #fff; font-size: 40px; font-weight: 900; padding: 10px 20px; border: 4px solid #fff;'
        );
        console.log(
            '%c NOT THIN ',
            'background: #fff; color: #000; font-size: 20px; font-weight: 100; padding: 5px 230px 5px 10px; border: 1px solid #000;'
        );
        console.log(
            '%c System Status: OVERLOADED ',
            'color: #00ff41; font-size: 14px; font-family: monospace; margin-top: 10px;'
        );
        console.log(
            '%c Hardware is heavy, Talent is heavier. ',
            'color: #888; font-size: 12px; font-style: italic;'
        );
        console.log(
            '%c\n💡 Tip: Press Cmd+K to switch themes. Press Cmd+/ for help.\n',
            'color: #aaa; font-size: 11px;'
        );
    }

    showToast(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = createElement('div', 'toast');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');

        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    showHelp() {
        console.log(
            '%c HELP ME ',
            'background: #ff00ff; color: #fff; font-size: 16px; padding: 5px;'
        );
        console.log('Shortcuts:\nCmd+K: Toggle Theme\nCmd+/: Show this help');
        this.showToast('Check the Console for help!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
