document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with a slight offset for sticky header
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px for extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active link in navigation
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for Blog Post animations (fade-in on scroll)
    const blogPosts = document.querySelectorAll('.blog-post');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const blogPostObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    blogPosts.forEach(post => {
        blogPostObserver.observe(post);
    });

    // "Explore Blogs" button scroll to blog section
    const exploreButton = document.getElementById('exploreButton');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            const blogSection = document.getElementById('blog');
            if (blogSection) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = blogSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }

    // Basic form submission handling (for demonstration, no backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            alert('Thank you for your message! We will get back to you soon.');
            // In a real scenario, you'd send this data to a server using fetch() or XMLHttpRequest
            this.reset(); // Clear the form
        });
    }

    // Set initial active link if any section is in view on load
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.main-header').offsetHeight;

    const highlightNavLink = () => {
        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 30; // Adjusted for header and some padding
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActive}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call on load to set initial active link
});