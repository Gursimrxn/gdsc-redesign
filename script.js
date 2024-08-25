// Custom Cursor
const cursor = document.getElementById('custom-cursor');
const nav = document.querySelector(".navigation");
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
const teamCards = document.querySelectorAll('.team-card');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - cursor.offsetWidth / 2}px, ${e.clientY - cursor.offsetHeight / 2}px)`;
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation Background Change on Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 800) {
        nav.style.setProperty("background", "linear-gradient(45deg, rgba(255, 0, 102, 0.1), rgba(0, 204, 153, 0.1), rgba(0, 102, 255, 0.1), rgba(255, 204, 0, 0.1))");
        nav.style.setProperty("backdrop-filter", "blur(6.9px)");
        nav.style.setProperty("box-shadow", "0 0 25px rgba(0, 0, 0, 0.2)");
        nav.style.setProperty("transform", "scale(1.005)");
        nav.classList.add("scrolled");
    } else {
        nav.style.setProperty("background", "inherit");
        nav.style.setProperty("backdrop-filter", "blur(0px)");
        nav.style.setProperty("box-shadow", "none");
        nav.style.setProperty("transform", "scale(1)");
        nav.classList.remove("scrolled");
    }
});

// Dark Mode Toggle
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Load Dark Mode from Local Storage
document.addEventListener('DOMContentLoaded', () => {
    const darkModeFromLocalStorage = localStorage.getItem('darkMode');
    if (darkModeFromLocalStorage === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    } else {
        darkModeToggle.textContent = '🌙';
    }
});

darkModeToggle.addEventListener('click', toggleDarkMode);

// Mobile Menu Toggle
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function updateLogoText() {
    const logoSpan = document.querySelector('.logo span');
    if (window.innerWidth <= 600) {
        logoSpan.innerHTML = "GDSC";
    } else {
        logoSpan.innerHTML = "GOOGLE DEVELOPERS STUDENT CLUB";
    }
}

// Initial call
updateLogoText();

// Update on resize
window.addEventListener('resize', updateLogoText);

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Function to handle intersection for animations
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing after animation
        } else {
            entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
        }
    });
}


// Intersection Observer Options
const observerOptions = {
    threshold: 0.1
};

// Observe team cards with specific observer
teamCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
    card.style.filter = 'blur(5px)';
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.filter = 'blur(0px)';
                }, index * 100);
            } else {
                entry.target.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out';
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(30px)';
                entry.target.style.filter = 'blur(5px)';
            }
        });
    }, observerOptions);

    cardObserver.observe(card);
});

// Observe general sections and titles
document.addEventListener('DOMContentLoaded', () => {
    // Hero Section Animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Section Animations
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => handleIntersection(entries, sectionObserver), observerOptions);
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        sectionObserver.observe(section);
    });

    // Parallax Effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `50% ${100 + scrollPosition * 0.169}%`;
        });
    }

    // Text Reveal Animation
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => handleIntersection(entries, titleObserver), observerOptions);
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        titleObserver.observe(title);
    });

    // Responsive animations for mobile
    if (window.innerWidth <= 768) {
        if (heroContent) {
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.opacity = '0';
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);

            const mobileObserverOptions = {
                threshold: 0.1
            };
            const mobileObserver = new IntersectionObserver((entries) => handleIntersection(entries, mobileObserver), mobileObserverOptions);

            sections.forEach(section => {
                section.style.transform = 'translateY(20px)';
                section.style.opacity = '0';
                mobileObserver.observe(section);
            });
        }
    }
});
