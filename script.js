// ===========================
// MOBILE MENU FUNCTIONALITY
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLL ENHANCEMENT
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// NAVBAR STICKY EFFECT
// ===========================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.products, .gallery, .contact').forEach(element => {
    observer.observe(element);
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles dynamically
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1.2rem 2rem',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        zIndex: '2000',
        animation: 'slideIn 0.4s ease forwards',
        fontSize: '1rem',
        letterSpacing: '0.3px',
        maxWidth: '400px'
    });

    // Set colors based on type
    if (type === 'success') {
        Object.assign(notification.style, {
            backgroundColor: '#f0f9ff',
            color: '#059669',
            border: '1px solid #d1fae5'
        });
    } else if (type === 'error') {
        Object.assign(notification.style, {
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fee2e2'
        });
    }

    document.body.appendChild(notification);

    // Add animation keyframes if not already present
    if (!document.querySelector('style[data-notifications]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notifications', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(400px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(400px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Auto remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// ===========================
// DOWNLOAD BUTTON FUNCTIONALITY
// ===========================

document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        
        // Create a temporary link for download
        const link = document.createElement('a');
        
        if (buttonText.includes('Full Catalogue')) {
            link.href = '#';
            showNotification('Full Catalogue is being prepared for download...', 'success');
        } else if (buttonText.includes('Furniture Guide')) {
            link.href = '#';
            showNotification('Furniture Guide is being prepared for download...', 'success');
        }
        
        // Add visual feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// ===========================
// CTA BUTTON FUNCTIONALITY
// ===========================

document.querySelector('.cta-button').addEventListener('click', () => {
    const productsSection = document.getElementById('products');
    const headerOffset = 70;
    const elementPosition = productsSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

// ===========================
// PRODUCT CARD INTERACTIVITY
// ===========================

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });

    card.addEventListener('click', function() {
        showNotification('Product details coming soon!', 'success');
    });
});

// ===========================
// GALLERY ITEM INTERACTIVITY
// ===========================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imageSrc = this.querySelector('img').src;
        openLightbox(imageSrc);
    });
});

// ===========================
// LIGHTBOX FUNCTIONALITY
// ===========================

function openLightbox(src) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img id="lightbox-img" src="" alt="Gallery Image">
            </div>
        `;
        document.body.appendChild(lightbox);

        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            #lightbox {
                display: none;
                position: fixed;
                z-index: 3000;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                animation: fadeIn 0.3s ease;
            }

            #lightbox.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
            }

            #lightbox-img {
                width: 100%;
                height: auto;
                object-fit: contain;
            }

            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 2.5rem;
                color: white;
                cursor: pointer;
                transition: color 0.3s ease;
            }

            .lightbox-close:hover {
                color: #ccc;
            }

            @media (max-width: 768px) {
                .lightbox-close {
                    top: 10px;
                    right: 20px;
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);

        // Close lightbox on close button click
        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

        // Close lightbox on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close lightbox on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    document.getElementById('lightbox-img').src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// ===========================
// LAZY LOADING IMAGES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image is already loaded from unsplash, just track visibility
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// DYNAMIC NAVBAR ACTIVE STATE
// ===========================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// FORM INPUT FOCUS EFFECTS
// ===========================

const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = '';
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial opacity set
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===========================
// UTILITY FUNCTION FOR SCROLL TO TOP
// ===========================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button functionality (optional)
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        // You can add a scroll-to-top button here if needed
    }
});

// ===========================
// PREVENT FORM SPAM
// ===========================

let lastFormSubmit = 0;

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const now = Date.now();
        
        if (now - lastFormSubmit < 1000) {
            e.preventDefault();
            showNotification('Please wait before submitting again', 'error');
            return;
        }
        
        lastFormSubmit = now;
    });
}

// ===========================
// MOBILE RESPONSIVE ENHANCEMENTS
// ===========================

// Handle touch events for better mobile experience
if (window.matchMedia('(max-width: 768px)').matches) {
    document.addEventListener('touchstart', function() {}, true);
    
    // Remove hover states on touch devices
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .product-card:hover,
            .feature:hover,
            .gallery-item:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===========================
// CONSOLE WELCOME MESSAGE
// ===========================

console.log('%c🪵 Welcome to Wood Interiors 🪵', 'color: #8B7355; font-size: 18px; font-weight: bold;');
console.log('%cDesign Direction: Premium, Minimal, Modern', 'color: #555555; font-size: 14px;');
console.log('%cResponsive on all devices • Smooth animations • Luxury spacing', 'color: #999999; font-size: 12px;');
