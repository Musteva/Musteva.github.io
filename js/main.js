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

    // GDPR-Compliant Anonymous visit counter using Abacus
    async function updateVisitCount() {
        const countElement = document.getElementById('visit-count');
        if (!countElement) return;

        try {
            // Abacus (jasoncameron.dev) is a lightweight, anonymous key-value hit counter.
            // It is not blocked by ad-blockers, uses no cookies, and logs no personal details (100% GDPR compliant).
            const response = await fetch('https://abacus.jasoncameron.dev/hit/musteva-portfolio/visits');
            if (response.ok) {
                const data = await response.json();
                countElement.textContent = `Page visits: ${data.value}`;
            } else {
                throw new Error('API offline');
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
