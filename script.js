document.addEventListener('DOMContentLoaded', () => {
    const fatText = document.getElementById('fatText');
    const container = document.querySelector('.container');

    // 1. "Heavy" Mouse Movement Effect (Parallax)
    // The text moves slightly opposite to the mouse, giving it "weight".
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 50;
        const y = (window.innerHeight - e.pageY * 2) / 50;

        // Apply distinct parallax to the main title
        fatText.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });

    // 2. Click effect: Shake functionality
    // Clicking the "FAT" text makes the screen shake slightly, emphasizing "impact"
    fatText.addEventListener('click', () => {
        // Add a temporary animation class
        document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        
        // Reset animation after it plays
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    });

    // 3. Dynamic "Weight" on Scroll (if content overflows)
    // Not strictly needed for one-page if it fits, but good for mobile
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        // Example: simple fade or scale effect could be added here
    });
});

// Add the shake keyframes dynamically to style
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
`;
document.head.appendChild(styleSheet);
