// script.js - Tri-Chandra Research Group (TCRG)

document.addEventListener('DOMContentLoaded', function () {
  // Improved Hamburger menu toggle with animation and accessibility
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  function toggleMenu() {
    const isExpanded = hamburger.classList.contains('active');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', !isExpanded);
    
    // Prevent body scroll when menu is open on mobile
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Smooth scroll for nav links with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add shadow to header on scroll
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove shadow based on scroll position
    if (currentScroll > 50) {
      header.classList.add('shadow');
    } else {
      header.classList.remove('shadow');
    }
    
    // Show/hide header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // Lightbox modal for gallery
  const galleryImages = document.querySelectorAll('.gallery img');
  if (galleryImages.length) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<span class="modal-close">&times;</span><img class="modal-img" src="" alt="Gallery Image">';
    document.body.appendChild(modal);
    const modalImg = modal.querySelector('.modal-img');
    const modalClose = modal.querySelector('.modal-close');
    galleryImages.forEach(img => {
      img.addEventListener('click', function () {
        modal.style.display = 'flex';
        modalImg.src = this.src;
        modalImg.alt = this.alt;
      });
    });
    modalClose.addEventListener('click', function () {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
});
