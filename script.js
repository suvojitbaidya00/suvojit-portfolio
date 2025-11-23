// --- Navigation & Mobile Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// --- Dark Mode Toggle ---
const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') toggleButton.classList.replace('fa-moon', 'fa-sun');
}

toggleButton.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleButton.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleButton.classList.replace('fa-moon', 'fa-sun');
    }
});

// --- Scroll Animations (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// --- Carousel Functionality ---
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
    const slide = carousel.querySelector('.carousel-slide');
    const images = slide.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let counter = 0;
    const size = images[0].clientWidth;

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            if (counter >= images.length - 1) return;
            counter++;
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) return;
            counter--;
            slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });
    }
});

// --- Contact Form Simulation ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form. Please email me directly at suvojitbaidya00@gmail.com');
        contactForm.reset();
    });
}