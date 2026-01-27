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

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// =========================================
//  DYNAMIC RESEARCH ENGINE
// =========================================

// Data from your CV with CORRECTED FILE EXTENSIONS
const researchData = [
    {
        id: 0,
        title: "Flyash-Reinforced Core of 3D-Printed PETG/WPLA Honeycomb Sandwich Structure",
        status: "Under Review",
        statusClass: "review",
        desc: "Experimental and Numerical Study on Flyash-Reinforced Core.",
        details: [
            "Simulated and validated force displacement and MOE of the sandwich structures.",
            "Analyzed energy absorption variation and failure modes with and without flyash-reinforcements."
        ],
        images: [
            "assets/flyash1.png",
            "assets/flyash2.png",
            "assets/flyash3.png",
            "assets/flyash4.png",
            "assets/flyash5.png",       
        ]
    },
    {
        id: 1,
        title: "Miura-Ori Inspired Origami Structure",
        status: "Ready to Submit",
        statusClass: "ready",
        desc: "Experimental and numerical investigation on effect of radius of curvature.",
        details: [
            "Modeled curved-crease Miura-Ori panels with varied crease radius.",
            "Analyzed Quasi-static and cyclic compression behavior focusing on SEA and hysteresis area."
        ],
        images: [
            "assets/origami1.png", 
            "assets/origami2.png",  // Placeholder for 2nd image
        ]
    },
    {
        id: 2,
        title: "Bending Behavior of Honeycomb Sandwich Structures",
        status: "Ready to Submit",
        statusClass: "ready",
        desc: "Effect of Material Orientation and Core Geometry (PLA+ and ABS-based).",
        details: [
            "Optimized Energy Absorption (EA) of honeycomb sandwich structure for various cell thickness.",
            "Numerically studied various cell thickness in flexural test of honeycomb structures."
        ],
        images: [
            "assets/acps3.png", // Note: This is a .jpg file
            "assets/acps1.png",
            "assets/acps2.png",
            "assets/acps4.png",
        ]
    },
    {
        id: 3,
        title: "Octopus Suction-Cup-Inspired Sandwich Cores",
        status: "In Progress",
        statusClass: "progress",
        desc: "Inner-cavity effects on flexural and compressive behavior.",
        details: [
            "Generated bio-inspired cores with tunable cavity diameter and shell thickness.",
            "Measured SEA, plateau stress, and failure modes; validated with Ansys."
        ],
        images: [
            "assets/oct1.jpg", // Note: .jpg
            "assets/oct2.jpg", // Note: .jpg
            "assets/oct3.png", // Note: .png
            "assets/oct4.png"  // Note: .png
        ]
    },
    {
        id: 4,
        title: "Compressive Response of Honeycomb Structures",
        status: "In Progress",
        statusClass: "progress",
        desc: "Compressive Response of Material Orientation and Core Geometry.",
        details: [
            "Establishing and analyzing rate-independent FE correlations to predict onset of densification and post-yield behavior."
        ],
        images: [
            "https://via.placeholder.com/800x400?text=Compressive+Response",
            "https://via.placeholder.com/800x400?text=Data+Plot"
        ]
    }
];

let activeProjectId = 0; // Default: Project 0 is featured

function renderProjects() {
    const featuredContainer = document.getElementById('featured-research');
    const listContainer = document.getElementById('research-list');

    // Only run if these elements exist (i.e., we are on the research page)
    if (!featuredContainer || !listContainer) return;

    // Clear content
    featuredContainer.innerHTML = '';
    listContainer.innerHTML = '';

    // 1. Render FEATURED Card (Active Project)
    const activeProject = researchData.find(p => p.id === activeProjectId);
    
    featuredContainer.innerHTML = `
        <div class="card featured-card">
            <span class="badge ${activeProject.statusClass}">${activeProject.status}</span>
            <h2 style="margin-top: 1rem;">${activeProject.title}</h2>
            
            <div class="carousel-container">
                <div class="carousel-slide" id="featured-slide">
                    ${activeProject.images.map(img => `<img src="${img}" alt="Research Image" onerror="this.src='https://via.placeholder.com/800x400?text=Image+Not+Found'">`).join('')}
                </div>
                <button class="carousel-btn prev" onclick="moveSlide(-1)">&#10094;</button>
                <button class="carousel-btn next" onclick="moveSlide(1)">&#10095;</button>
            </div>

            <ul>
                ${activeProject.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
    `;

    // 2. Render LIST Cards (Inactive Projects)
    researchData.forEach(project => {
        if (project.id !== activeProjectId) {
            const card = document.createElement('div');
            card.className = 'card clickable-card';
            // When clicked, make this project active and re-render
            card.onclick = () => {
                activeProjectId = project.id;
                renderProjects();
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to see the change
            };

            card.innerHTML = `
                <span class="badge ${project.statusClass}" style="font-size: 0.7rem;">${project.status}</span>
                <h3 style="font-size: 1.1rem; margin-top: 0.5rem;">${project.title}</h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">${project.desc}</p>
                <small style="color: var(--accent-color); font-weight:bold; margin-top:1rem; display:block;">Click to View Details &rarr;</small>
            `;
            listContainer.appendChild(card);
        }
    });

    // Reset carousel index for new project
    slideIndex = 0; 
}

// --- Carousel Helper Logic ---
let slideIndex = 0;

window.moveSlide = function(n) {
    const slide = document.getElementById('featured-slide');
    if (!slide) return;
    
    const images = slide.getElementsByTagName('img');
    
    if (!images || images.length === 0) return;

    const size = images[0].clientWidth;
    
    slideIndex += n;

    if (slideIndex >= images.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = images.length - 1;

    slide.style.transform = 'translateX(' + (-size * slideIndex) + 'px)';
}

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
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