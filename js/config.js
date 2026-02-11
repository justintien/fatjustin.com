const config = {
    // Basic Site Info
    siteInfo: {
        title: "FAT JUSTIN",
        subtitle: "IS NOT THIN",
        description: "Heavy on Code, Heavy on Life.",
        footerText: "Occupying more space in the DOM since 2026."
    },

    // Audio files (optional, for future use)
    audio: {
        click: "assets/click.mp3",
        hover: "assets/hover.mp3"
    },

    // Slogans to display
    slogans: [
        { text: "Heavy on Code.", type: "heavy" },
        { text: "Heavy on Life.", type: "light" },
        { text: "700", type: "heavy" },
        { text: "font-weight lifestyle.", type: "light" },
        { text: "程式碼很有份量", type: "heavy", lang: "zh" },
        { text: "生活也是", type: "light", lang: "zh" }
    ],

    // Social Links
    socials: [
        { label: "X", url: "https://x.com/notthinjustin" },
        { label: "Threads", url: "https://threads.com/@notthinjustin" },
        { label: "IG", url: "https://instagram.com/notthinjustin" },
        { label: "GitHub", url: "https://github.com/justintien" },
        { label: "@", url: "mailto:notthinjustin@email.com" }
    ],

    // Theme Definitions
    themes: {
        neon: {
            name: "Neon Fat",
            colors: {
                bg: "#0d0d0d",
                text: "#ffffff",
                accent: "#ccff00",
                secondary: "rgba(255, 255, 255, 0.6)"
            }
        },
        terminal: {
            name: "Terminal",
            colors: {
                bg: "#000000",
                text: "#00ff00",
                accent: "#ffffff",
                secondary: "rgba(0, 255, 0, 0.6)"
            }
        },
        cotton: {
            name: "Cotton Candy",
            colors: {
                bg: "#ffe6f2", // Light Pink
                text: "#ff0066", // Hot Pink
                accent: "#00ccff", // Cyan
                secondary: "rgba(255, 0, 102, 0.6)"
            }
        },
        contrast: {
            name: "High Contrast",
            colors: {
                bg: "#ffffff",
                text: "#000000",
                accent: "#ff0000",
                secondary: "#000000"
            }
        }
    }
};

export default config;
