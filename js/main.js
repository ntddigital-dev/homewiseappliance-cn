// Main JavaScript for Homewise Appliance Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSlider();
    initProductCarousel();
    initSmoothScroll();
    initMobileMenu();
    updateCopyrightYear();
});

// ==================== Hero Slider ====================
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Function to start auto-advance
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Function to stop auto-advance
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-advance
    if (totalSlides > 1) {
        startAutoSlide();
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        }
    }
}

// ==================== Product Carousel ====================
function initProductCarousel() {
    const prevBtn = document.querySelector('.pagination .prev');
    const nextBtn = document.querySelector('.pagination .next');
    const progressBar = document.querySelector('.progress');
    const pageNumber = document.querySelector('.page-number');

    let currentPage = 1;
    const totalPages = 4;

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });
    }

    function updatePagination() {
        const progress = (currentPage / totalPages) * 100;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        if (pageNumber) {
            pageNumber.textContent = `${currentPage}/${totalPages}`;
        }
    }
}

// ==================== Smooth Scroll ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ==================== Mobile Menu ====================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuCloseBtn = document.querySelector('.menu-close-btn');

    if (mobileMenuBtn && navMenu) {
        // Open/close menu with hamburger button
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu with close button
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        }

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ==================== Product Card Interactions ====================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== Category Card Interactions ====================
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        // Get category name from the h3 text
        const categoryName = this.querySelector('h3').textContent.replace('→', '').trim();
        console.log('Navigating to category:', categoryName);
        // In a real implementation, this would navigate to the category page
    });
});

// ==================== Scroll Animations ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations
initScrollAnimations();

// ==================== Search Functionality ====================
const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

if (searchBox && searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchBox.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // In a real implementation, this would perform a search
        }
    });

    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchBtn.click();
        }
    });
}

// ==================== Navigation Arrows for Category Section ====================
const categoryNavArrows = document.querySelectorAll('.shop-by-category .category-nav .nav-arrow');
const categoriesGrid = document.querySelector('.categories-grid');

categoryNavArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => {
        if (categoriesGrid) {
            const scrollAmount = index === 0 ? -400 : 400;
            categoriesGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Perfect Refrigerator Section Navigation ====================
const refrigeratorNavArrows = document.querySelectorAll('.perfect-refrigerator .nav-arrow');

refrigeratorNavArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        console.log('Navigating refrigerator carousel');
        // In a real implementation, this would change the displayed refrigerator
    });
});

// ==================== Add to Cart Functionality (Future Enhancement) ====================
function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    // In a real implementation, this would add the product to cart
    // and update the cart counter
}

// ==================== Newsletter Signup (Future Enhancement) ====================
function subscribeNewsletter(email) {
    console.log('Subscribing email:', email);
    // In a real implementation, this would submit the email to backend
}

// ==================== Utility Functions ====================

// Update copyright year automatically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add fade-in animation on scroll
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Log page load
console.log('Homewise Appliance website loaded successfully!');
