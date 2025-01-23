/*
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const fadeInDuration = 1000; 

    // fadee enemman tahan 
    sections.forEach((section) => {
        section.classList.add('fade-in-up');
        setTimeout(() => {
            section.classList.add('visible');
        }, fadeInDuration);
    });

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20;
    const drops = Array.from({ length: columns }).map(() => 0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = "20px monospace";

        drops.forEach((y, x) => {
            const text = Math.random() > 0.9 ? String.fromCharCode(Math.random() * 255) : " ";
            ctx.fillText(text, x * 20, y * 20);

            if (y * 20 > canvas.height && Math.random() > 0.975) {
                drops[x] = 0; 
            }

            // Hidastetaa enemma tarvittaes
            drops[x] += Math.random() > 0.95 ? 1 : 0.5; 
        });
    }

    setInterval(draw, 60); 
});
*/



document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const fadeInDuration = 1000;
    let currentSectionIndex = 0;
    let isScrolling = false; // Flag to prevent multiple scroll actions at once

    // fadee enemman tahan
    sections.forEach((section) => {
        section.classList.add('fade-in-up');
        setTimeout(() => {
            section.classList.add('visible');
        }, fadeInDuration);
    });

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20;
    const drops = Array.from({ length: columns }).map(() => 0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = "20px monospace";

        drops.forEach((y, x) => {
            const text = Math.random() > 0.9 ? String.fromCharCode(Math.random() * 255) : " ";
            ctx.fillText(text, x * 20, y * 20);

            if (y * 20 > canvas.height && Math.random() > 0.975) {
                drops[x] = 0;
            }

            // Hidastetaa enemma tarvittaes
            drops[x] += Math.random() > 0.95 ? 1 : 0.5;
        });
    }

    setInterval(draw, 60);

    // Function to handle scroll events
    function handleScroll(event) {
        if (isScrolling) return; // Prevent scrolling if already in the middle of an action

        isScrolling = true;
        if (event.deltaY > 0) {
            // Scroll down: Move to the next section
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                updateVisibleSection();
            }
        } else {
            // Scroll up: Move to the previous section
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                updateVisibleSection();
            }
        }

        // After the scroll transition ends, allow another scroll action
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Duration must match the fade-in or transition time
    }

    // Function to update the visible section
    function updateVisibleSection() {
        // Hide all sections
        sections.forEach((section) => section.classList.remove('visible'));

        // Show the current section
        sections[currentSectionIndex].classList.add('visible');
        
        // Scroll smoothly to the current section (for better UX)
        sections[currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Initial visibility
    updateVisibleSection();

    // Add the scroll event listener
    document.addEventListener('wheel', handleScroll);
});
