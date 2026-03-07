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
// --- Dynamic Research Engine --- 

const researchData = [
    {
        id: 0,
        title: "Experimental and Numerical Study on Fly Ash-Reinforced Core of 3D Printed PETG/Wood-PLA Honeycomb Sandwich Composites",
        status: "Published",
        statusClass: "Published",
        // --- NEW DATA FIELDS ---
        publisher: "AJSE", 
        doi: "doi.org/10.1007/s13369-026-11182-5",
        abstract: "This study presents an experimental and numerical investigation of 3D-printed PETG and wood-PLA honeycomb sandwich composites reinforced with fly ash geopolymer composite (FAGC). The research demonstrates that integrating a sustainable geopolymer filler into additively manufactured honeycomb cores can significantly improve compressive performance and thermal insulation, while also revealing an important trade-off in flexural behavior due to weak interfacial bonding and brittle filler response. The findings contribute to the development of lightweight, multifunctional composite materials for structural and thermally insulated applications.",
        // -----------------------
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
            "assets/flyash5.png"
        ]
    },
    {
        id: 1,
        title: "Miura-Ori Inspired Origami Structure",
        status: "Ready to Submit",
        statusClass: "ready",
        // --- NEW DATA FIELDS ---
        publisher: "", // Leave blank if not published yet
        doi: "", 
        abstract: "An in-depth look at curved-crease Miura-Ori panels. This research explores how varying the crease radius affects structural behavior during quasi-static and cyclic compression.",
        // -----------------------
        desc: "Experimental and numerical investigation on effect of radius of curvature.",
        details: [
            "Modeled curved-crease Miura-Ori panels with varied crease radius.",
            "Analyzed Quasi-static and cyclic compression behavior focusing on SEA and hysteresis area."
        ],
        images: ["assets/origami1.png", "assets/origami2.png"]
    },
    {
        id: 2,
        title: "Bending Behavior of Honeycomb Sandwich Structures",
        status: "Ready to Submit",
        statusClass: "ready",
        // --- NEW DATA FIELDS ---
        publisher: "", 
        doi: "", 
        abstract: "This project focuses on optimizing the Energy Absorption of honeycomb sandwich structures by investigating the interplay between material orientation and core geometry, utilizing both PLA+ and ABS.",
        // -----------------------
        desc: "Effect of Material Orientation and Core Geometry (PLA+ and ABS-based).",
        details: [
            "Optimized Energy Absorption (EA) of honeycomb sandwich structure for various cell thickness.",
            "Numerically studied various cell thickness in flexural test of honeycomb structures."
        ],
        images: [
            "assets/acps3.png",
            "assets/acps1.png",
            "assets/acps2.png",
            "assets/acps4.png"
        ]
    },
    {
        id: 3,
        title: "Octopus Suction-Cup-Inspired Sandwich Cores",
        status: "In Progress",
        statusClass: "progress",
        // --- NEW DATA FIELDS ---
        publisher: "", 
        doi: "", 
        abstract: "Drawing inspiration from nature, this research explores bio-inspired cores mimicking octopus suction cups. The inner-cavity effects on flexural and compressive behavior are measured and validated using Ansys.",
        // -----------------------
        desc: "Inner-cavity effects on flexural and compressive behavior.",
        details: [
            "Generated bio-inspired cores with tunable cavity diameter and shell thickness.",
            "Measured SEA, plateau stress, and failure modes; validated with Ansys."
        ],
        images: [
            "assets/oct5.png",
            "assets/oct1.jpg",
            "assets/oct2.jpg",
            "assets/oct3.png",
            "assets/oct4.png"
        ]
    },
    {
        id: 4,
        title: "Compressive Response of Honeycomb Structures",
        status: "In Progress",
        statusClass: "progress",
        // --- NEW DATA FIELDS ---
        publisher: "", 
        doi: "", 
        abstract: "An ongoing study analyzing the rate-independent finite element correlations needed to accurately predict the onset of densification and post-yield behavior in variable honeycomb structures.",
        // -----------------------
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

// Initialize with the first project as the featured one
let activeProjectId = 0;

// Function to render the projects list and active project
function renderProjects() {
    const featuredContainer = document.getElementById('featured-research');
    const listContainer = document.getElementById('research-list');

    // Check if the elements exist
    if (!featuredContainer || !listContainer) return;

    // Clear content
    featuredContainer.innerHTML = '';
    listContainer.innerHTML = '';

    // Render the active (expanded) project
    const activeProject = researchData.find(p => p.id === activeProjectId);

    featuredContainer.innerHTML = `
        <div class="card featured-card">
            <span class="badge ${activeProject.statusClass}">${activeProject.status}</span>
            <h2 style="margin-top: 1rem; margin-bottom: 0.5rem;">${activeProject.title}</h2>
            
${activeProject.publisher || activeProject.doi ? `
            <div class="paper-meta" style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: block; line-height: 1.6;">
                
                ${activeProject.publisher ? `
                <span style="margin-right: 15px;">
                    <i class="fas fa-book" style="color: var(--accent-color); margin-right: 4px;"></i><strong>Publisher:</strong> ${activeProject.publisher}
                </span>` : ''}
                
                ${activeProject.doi ? `
                <span style="white-space: nowrap;">
                    <i class="fas fa-link" style="color: var(--accent-color); margin-right: 4px;"></i><strong>DOI:</strong> <a href="${activeProject.doi.startsWith('http') ? activeProject.doi : 'https://' + activeProject.doi}" target="_blank" rel="noopener" style="color: var(--accent-color); text-decoration: none;">${activeProject.doi}</a>
                </span>` : ''}

            </div>` : ''}

            <div class="carousel-container">
                <div class="carousel-slide" id="featured-slide">
                    ${activeProject.images.map(img => `<img src="${img}" alt="Research Image" onerror="this.src='https://via.placeholder.com/800x400?text=Image+Not+Found'">`).join('')}
                </div>
                <button class="carousel-btn prev" onclick="moveSlide(-1)">&#10094;</button>
                <button class="carousel-btn next" onclick="moveSlide(1)">&#10095;</button>
            </div>
            
            <div class="paper-content" style="margin-top: 2rem; text-align: left;">
                
                ${activeProject.abstract ? `
                <div class="paper-abstract" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-file-alt" style="color: var(--accent-color);"></i> Overview / Abstract
                    </h3>
                    <p style="line-height: 1.6; color: var(--text-secondary);">${activeProject.abstract}</p>
                </div>
                ` : ''}

                <div class="paper-keypoints">
                    <h3 style="font-size: 1.2rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-check-circle" style="color: var(--accent-color);"></i> Key Points
                    </h3>
                    <ul style="list-style: none; padding-left: 0;">
                        ${activeProject.details.map(detail => `
                            <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
                                <i class="fas fa-angle-right" style="position: absolute; left: 0; top: 4px; color: var(--accent-color);"></i>
                                ${detail}
                            </li>
                        `).join('')}
                    </ul>
                </div>

            </div>
        </div>
    `;

    // Render the list of other projects (Bento-style cards - UNCHANGED)
    researchData.forEach(project => {
        if (project.id !== activeProjectId) {
            const card = document.createElement('div');
            card.className = 'card clickable-card';
            card.onclick = () => {
                activeProjectId = project.id;
                renderProjects(); // Re-render the projects list with the new active card
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top to see the change
            };

            card.innerHTML = `
                <img src="${project.images[0]}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
            `;
            listContainer.appendChild(card);
        }
    });
}

// --- Carousel Logic --- 
let slideIndex = 0;

function moveSlide(n) {
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
    renderProjects(); // Render the projects list and the first project by default
});

// Certificate Modal
const certModal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-cert-image');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', () => {
        modalImg.src = card.getAttribute('data-src');
        certModal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => certModal.style.display = 'none');
certModal.addEventListener('click', e => {
    if (e.target === certModal) certModal.style.display = 'none';
});