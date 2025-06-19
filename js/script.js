/**
 * Tri-Chandra Research Group Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initStickyHeader();
    initScrollToTop();
    initScrollSpy();
    initResearchExpand();
    initAnimatedCounters();
    initEventSlider();
    initFormValidation();
    initScrollAnimations();
    initAccordion();
    initDepartmentsPage(); // Add departments page initialization
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking on a link (for mobile)
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Update active state
            navLinksItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scroll Spy (Highlight active navigation based on scroll position)
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Research Area Expand/Collapse
 */
function initResearchExpand() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = document.getElementById(button.getAttribute('aria-controls'));
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                details.style.maxHeight = '0px';
                button.querySelector('.expand-text').textContent = 'Learn More';
            } else {
                details.style.maxHeight = details.scrollHeight + 'px';
                button.querySelector('.expand-text').textContent = 'Show Less';
            }
        });
    });
}

/**
 * Animated Counters
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = Math.ceil(target / (duration / 30)); // Update every 30ms
                
                const updateCounter = () => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target;
                        return;
                    }
                    counter.textContent = count;
                    setTimeout(updateCounter, 30);
                };
                
                updateCounter();
                observer.unobserve(counter); // Only run once
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Events Image Slider
 */
function initEventSlider() {
    const slider = document.querySelector('.events-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.event-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
        slider.scrollTo({
            left: currentSlide * slider.clientWidth,
            behavior: 'smooth'
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
    });
    
    // Touch events for swiping on mobile
    let startX, endX;
    const minSwipeDistance = 50;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        
        const distance = startX - endX;
        
        if (Math.abs(distance) >= minSwipeDistance) {
            if (distance > 0) {
                // Swipe left, go to next slide
                currentSlide = (currentSlide + 1) % slideCount;
            } else {
                // Swipe right, go to previous slide
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            }
            updateSlider();
        }
    });
}

/**
 * Contact Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (validateForm(name, email, subject, message)) {
                // Simulate form submission
                setTimeout(() => {
                    formSuccess.style.display = 'block';
                    formError.style.display = 'none';
                    contactForm.reset();
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 3000);
                }, 1000);
            } else {
                formError.style.display = 'block';
                formSuccess.style.display = 'none';
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value.trim();
            
            if (validateEmail(email)) {
                // Successfully subscribed
                newsletterForm.reset();
            }
        });
    }
    
    function validateForm(name, email, subject, message) {
        if (name === '' || email === '' || subject === '' || message === '') {
            return false;
        }
        
        return validateEmail(email);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    // Add animation classes to elements
    document.querySelectorAll('.about-text p').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i * 100}`);
    });
    
    document.querySelectorAll('.stat-item').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i * 100}`);
    });
    
    document.querySelectorAll('.research-area').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i * 100}`);
    });
    
    document.querySelectorAll('.team-member').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i * 100}`);
    });
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Constitution Accordion
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all accordions
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current accordion
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Departments Page Functionality
 * Handles filtering, sorting, and interactions in the departments page
 */
function initDepartmentsPage() {
    // Only run if we're on the departments page
    if (!document.querySelector('.departments-section')) return;
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('department-sort');
    const departmentCards = document.querySelectorAll('.department-card');
    const departmentGrid = document.querySelector('.department-grid');
    
    // Function to apply both filter and sort
    function applyFilterAndSort() {
        const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
        const sortValue = sortSelect?.value || 'name-asc';
        
        // First filter cards
        departmentCards.forEach(card => {
            if (activeFilter === 'all') {
                card.style.display = 'block';
            } else {
                const categories = card.getAttribute('data-category');
                if (categories && categories.includes(activeFilter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // Then sort visible cards
        if (sortSelect && departmentGrid) {
            const visibleCards = [...departmentCards].filter(card => card.style.display !== 'none');
            
            visibleCards.sort((a, b) => {
                if (sortValue === 'name-asc') {
                    const nameA = a.querySelector('.department-title').innerText.toUpperCase();
                    const nameB = b.querySelector('.department-title').innerText.toUpperCase();
                    return nameA.localeCompare(nameB);
                } else if (sortValue === 'name-desc') {
                    const nameA = a.querySelector('.department-title').innerText.toUpperCase();
                    const nameB = b.querySelector('.department-title').innerText.toUpperCase();
                    return nameB.localeCompare(nameA);
                } else if (sortValue === 'members') {
                    const membersA = parseInt(a.querySelector('.stat-value[data-type="members"]')?.innerText) || 0;
                    const membersB = parseInt(b.querySelector('.stat-value[data-type="members"]')?.innerText) || 0;
                    return membersB - membersA;
                } else if (sortValue === 'projects') {
                    const projectsA = parseInt(a.querySelector('.stat-value[data-type="projects"]')?.innerText) || 0;
                    const projectsB = parseInt(b.querySelector('.stat-value[data-type="projects"]')?.innerText) || 0;
                    return projectsB - projectsA;
                }
                return 0;
            });
            
            // Reorder the cards in the DOM
            visibleCards.forEach(card => {
                departmentGrid.appendChild(card);
            });
        }
    }
    
    // Add event listeners for filtering
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                applyFilterAndSort();
            });
        });
    }
    
    // Add event listener for sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilterAndSort);
    }
    
    // Show/hide department details
    const departmentLinks = document.querySelectorAll('.show-department-detail');
    const departmentDetails = document.querySelectorAll('.department-detail-section');
    const departmentsContainer = document.querySelector('.department-grid');
    
    if (departmentLinks.length && departmentDetails.length && departmentsContainer) {
        departmentLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const departmentName = this.getAttribute('data-department');
                
                // Hide all department details
                departmentDetails.forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Hide departments grid and filters
                departmentsContainer.style.display = 'none';
                const controls = document.querySelector('.departments-controls');
                if (controls) controls.style.display = 'none';
                
                // Show specific department detail
                const targetDetail = document.querySelector(`.department-detail-section[data-department="${departmentName}"]`);
                if (targetDetail) {
                    targetDetail.style.display = 'block';
                    
                    // Smooth scroll to detail section
                    window.scrollTo({
                        top: targetDetail.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Back to all departments
    const backButtons = document.querySelectorAll('.back-to-departments');
    
    if (backButtons.length && departmentsContainer) {
        backButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hide all department details
                departmentDetails.forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Show departments grid and filters
                departmentsContainer.style.display = 'grid';
                const controls = document.querySelector('.departments-controls');
                if (controls) controls.style.display = 'flex';
                
                // Smooth scroll to departments section
                window.scrollTo({
                    top: document.querySelector('.departments-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Apply initial sort when page loads
    if (departmentCards.length) {
        setTimeout(() => {
            applyFilterAndSort();
        }, 100);
    }
}
