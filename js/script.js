/**
 * Tri-Chandra Research Group Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize critical components immediately
    initNavigation();
    initStickyHeader();
    initScrollToTop();
    
    // Initialize non-critical components after a short delay
    // to improve initial page load performance
    setTimeout(() => {
        initScrollSpy();
        initResearchExpand();
        initFormValidation();
        
        // Use requestAnimationFrame for animation-related initializations
        requestAnimationFrame(() => {
            initAnimatedCounters();
            initEventSlider();
            initScrollAnimations();
            initAccordion();
            initDepartmentsPage();
        });
    }, 100);
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Only handle page links (not hash links) for active state
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    
    navLinksItems.forEach(link => {
        const href = link.getAttribute('href');
        // Set active based on current page
        if (href === currentPage || 
            (currentPage === 'index.html' && href === '#hero') ||
            (href.includes(currentPage))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Update ARIA attributes
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close menu when clicking on a link (for mobile)
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            
            // Only update active state for in-page links
            if (this.getAttribute('href').startsWith('#')) {
                navLinksItems.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 992 && 
            navLinks.classList.contains('active') && 
            !event.target.closest('#main-nav') && 
            !event.target.closest('#menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
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
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Set initial ARIA attributes for slides
    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('id', `slide-${index}`);
        slide.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
        
        if (index !== currentIndex) {
            slide.setAttribute('tabindex', '-1');
        }
    });
    
    // Update indicators for accessibility
    indicators.forEach((indicator, index) => {
        indicator.setAttribute('aria-controls', `slide-${index}`);
    });
    
    function goToSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            slide.setAttribute('tabindex', '-1');
        });
        indicators.forEach(ind => {
            ind.classList.remove('active');
            ind.setAttribute('aria-selected', 'false');
        });
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
        slides[index].removeAttribute('tabindex');
        indicators[index].classList.add('active');
        indicators[index].setAttribute('aria-selected', 'true');
        
        // Slide to position
        slider.style.transform = `translateX(-${index * 100}%)`;
        
        // Announce slide change to screen readers
        const liveRegion = document.getElementById('slider-live-region') || 
            (() => {
                const region = document.createElement('div');
                region.id = 'slider-live-region';
                region.setAttribute('aria-live', 'polite');
                region.className = 'visually-hidden';
                slider.parentNode.appendChild(region);
                return region;
            })();
        
        liveRegion.textContent = `Showing slide ${index + 1} of ${totalSlides}`;
        
        currentIndex = index;
    }
    
    // Previous slide button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
            goToSlide(newIndex);
        });
    }
    
    // Next slide button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
            goToSlide(newIndex);
        });
    }
    
    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        
        // Support keyboard navigation
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });
    
    // Initialize first slide
    goToSlide(0);
    
    // Auto rotate slides every 5 seconds
    let slideInterval = setInterval(() => {
        const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }, 5000);
    
    // Pause auto-rotation when user interacts with slider
    const sliderContainer = document.querySelector('.events-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
                goToSlide(newIndex);
            }, 5000);
        });
    }
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
        // Add accessible error handling
        const createErrorMessage = (input, message) => {
            // Remove any existing error message
            const existingError = document.getElementById(`${input.id}-error`);
            if (existingError) {
                existingError.remove();
            }
            
            // Add error class to input
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            
            // Create error message
            const errorMessage = document.createElement('div');
            errorMessage.id = `${input.id}-error`;
            errorMessage.className = 'input-error';
            errorMessage.textContent = message;
            errorMessage.setAttribute('aria-live', 'polite');
            
            // Insert after the input
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
            
            // Link error message to input
            input.setAttribute('aria-describedby', errorMessage.id);
            
            return false;
        };
        
        const clearErrors = (input) => {
            const errorMessage = document.getElementById(`${input.id}-error`);
            if (errorMessage) {
                errorMessage.remove();
            }
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
            input.removeAttribute('aria-describedby');
        };
        
        // Add input event listeners to clear errors on typing
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearErrors(input);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Get form fields directly
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
              // Clear all previous errors
            formError.hidden = true;
            formSuccess.hidden = true;
            inputs.forEach(input => clearErrors(input));
            
            // Validate name
            if (name.value.trim() === '') {
                isValid = createErrorMessage(name, 'Please enter your name') && isValid;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                isValid = createErrorMessage(email, 'Please enter your email address') && isValid;
            } else {
                // Simple email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    isValid = createErrorMessage(email, 'Please enter a valid email address') && isValid;
                }
            }
            
            // Validate subject
            if (subject.value.trim() === '') {
                isValid = createErrorMessage(subject, 'Please enter a subject') && isValid;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                isValid = createErrorMessage(message, 'Please enter your message') && isValid;
            }
            
            if (!isValid) {
                // Show general error message
                formError.hidden = false;
                formError.textContent = 'Please correct the errors in the form.';
                // Focus the first field with an error
                contactForm.querySelector('.error').focus();
                return;
            }
            
            // Simulate form submission success
            setTimeout(() => {
                formSuccess.hidden = false;
                formError.hidden = true;
                contactForm.reset();
                
                // Focus the success message for screen readers
                formSuccess.focus();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.hidden = true;
                }, 5000);            }, 1000);
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
}

// Email validation utility function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
    
    // Add staggered animation to about page founder cards
    document.querySelectorAll('.about-founder-card').forEach((el, i) => {
        el.classList.add('fade-in', `delay-${i * 200}`);
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
        // Create an accessible live region for filter announcements
        let liveRegion = document.getElementById('filter-announcement');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'filter-announcement';
            liveRegion.className = 'visually-hidden';
            liveRegion.setAttribute('aria-live', 'polite');
            document.body.appendChild(liveRegion);
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button and ARIA attributes
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                // Announce filter change for screen readers
                const filterType = this.textContent.trim();
                liveRegion.textContent = `Showing ${filterType} departments`;
                
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
