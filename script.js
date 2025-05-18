document.addEventListener('DOMContentLoaded', function() {
    // Add a class to the body after DOM is loaded for fade-in effect
    document.body.classList.add('loaded');

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Show all sections by default when the page loads
    const sectionContents = document.querySelectorAll('.section-content');
    sectionContents.forEach(section => {
        section.classList.add('active');
    });

    // Update chevron icons to show expanded state
    const chevrons = document.querySelectorAll('.section-header i');
    chevrons.forEach(icon => {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    });
    
    // Accordion functionality for experience and portfolio items
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items in the same section
            const parentAccordion = this.closest('.accordion');
            parentAccordion.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current accordion item
            if (!isActive) {
                accordionItem.classList.add('active');
            } else {
                accordionItem.classList.remove('active');
            }
            
            // Update icon
            const icon = this.querySelector('.accordion-icon i');
            if (isActive) {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                parentAccordion.querySelectorAll('.accordion-icon i').forEach(i => {
                    if (i !== icon) {
                        i.classList.remove('fa-minus');
                        i.classList.add('fa-plus');
                    }
                });
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('#navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Normally, you would send this data to a server
            // For this example, just show a success message
            alert('Thank you for your message. I will get back to you soon!');
            contactForm.reset();
        });
    }
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', highlightNavLink);
    
    function highlightNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 200; // Adding offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Call once to initialize
    highlightNavLink();

    // Add hover effects to portfolio buttons
    const portfolioButtons = document.querySelectorAll('.portfolio-buttons .btn');
    portfolioButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('fa-beat-fade');
        });
        
        button.addEventListener('mouseleave', function() {
            this.querySelector('i').classList.remove('fa-beat-fade');
        });
    });

    // Animate section headers on scroll
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Function to toggle sections visibility
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = section.parentElement.querySelector('.section-header');
    const icon = header.querySelector('i');
    
    section.classList.toggle('active');
    
    // Toggle icon
    if (section.classList.contains('active')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
} 