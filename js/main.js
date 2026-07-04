document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuBtn.innerHTML = '&#x2715;'; // Close symbol
            } else {
                menuBtn.innerHTML = '&#9776;'; // Hamburger symbol
            }
        });
    }

    // GDPR-Compliant Anonymous visit counter
    async function updateVisitCount() {
        const countElement = document.getElementById('visit-count');
        if (!countElement) return;

        try {
            // counterapi.dev is a free, open, and anonymous counter service
            // It does not store user IPs, log visitors, or set cookies, ensuring full GDPR compliance.
            const response = await fetch('https://api.counterapi.dev/v1/musteva-portfolio/visits/up');
            if (response.ok) {
                const data = await response.json();
                countElement.textContent = `Page visits: ${data.count}`;
            } else {
                throw new Error('API offline or rate-limited');
            }
        } catch (e) {
            // Local fallback count using localStorage (private to the device)
            let localVisits = localStorage.getItem('portfolio_visits') || 0;
            localVisits = parseInt(localVisits) + 1;
            localStorage.setItem('portfolio_visits', localVisits);
            countElement.textContent = `Page visits (this device): ${localVisits}`;
        }
    }

    updateVisitCount();
});
