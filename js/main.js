/* ==========================================================================
   Shamshad Ansari Portfolio - Interactive Scripting & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. 3D FLOATING TECH ICONS BACKGROUND
       ========================================== */
    const techScene = document.getElementById('tech-3d-scene');
    if (techScene) {
        // All tech icons used in the portfolio
        const techIcons = [
            // Java - orange
            { icon: 'fa-brands fa-java',        color: '#f89820', glow: 'rgba(248,152,32,0.6)',  count: 4 },
            // Spring Boot - green
            { icon: 'fa-solid fa-leaf',          color: '#6db33f', glow: 'rgba(109,179,63,0.6)', count: 4 },
            // Docker - blue
            { icon: 'fa-brands fa-docker',       color: '#2496ed', glow: 'rgba(36,150,237,0.6)', count: 3 },
            // GitHub - white/silver
            { icon: 'fa-brands fa-github',       color: '#e2e8f0', glow: 'rgba(226,232,240,0.4)', count: 3 },
            // Linux - yellow
            { icon: 'fa-brands fa-linux',        color: '#f5c518', glow: 'rgba(245,197,24,0.5)', count: 2 },
            // AWS - orange-red
            { icon: 'fa-brands fa-aws',          color: '#ff9900', glow: 'rgba(255,153,0,0.5)',  count: 2 },
            // Git - red
            { icon: 'fa-brands fa-git-alt',      color: '#f05032', glow: 'rgba(240,80,50,0.5)',  count: 2 },
            // Database / MySQL - cyan
            { icon: 'fa-solid fa-database',      color: '#00aeff', glow: 'rgba(0,174,255,0.5)',  count: 3 },
            // API / Link - purple
            { icon: 'fa-solid fa-link',          color: '#9d4edd', glow: 'rgba(157,78,221,0.5)', count: 2 },
            // Cloud
            { icon: 'fa-solid fa-cloud',         color: '#60a5fa', glow: 'rgba(96,165,250,0.4)', count: 2 },
            // Shield / Security (JWT)
            { icon: 'fa-solid fa-shield-halved', color: '#34d399', glow: 'rgba(52,211,153,0.5)', count: 2 },
            // Code
            { icon: 'fa-solid fa-code',          color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', count: 2 },
        ];

        const rand = (min, max) => Math.random() * (max - min) + min;

        techIcons.forEach(tech => {
            for (let j = 0; j < tech.count; j++) {
                const wrapper = document.createElement('div');
                wrapper.className = 'tech-icon-float';

                // Random position across full viewport
                const topPct  = rand(3, 92);
                const leftPct = rand(2, 96);
                const sizePx  = rand(2.2, 4.8).toFixed(1);
                const dur     = rand(7, 16).toFixed(1);
                const spin    = rand(8, 22).toFixed(1);
                const selfSpin = rand(5, 14).toFixed(1);
                const delay   = `-${rand(0, 15).toFixed(1)}s`;
                const opacity = rand(0.10, 0.22).toFixed(2);

                wrapper.style.top  = `${topPct}%`;
                wrapper.style.left = `${leftPct}%`;
                wrapper.style.setProperty('--dur',      `${dur}s`);
                wrapper.style.setProperty('--spin',     `${spin}s`);
                wrapper.style.setProperty('--selfspin', `${selfSpin}s`);
                wrapper.style.setProperty('--delay',    delay);
                wrapper.style.setProperty('--size',     `${sizePx}rem`);
                wrapper.style.setProperty('--color',    tech.color);
                wrapper.style.setProperty('--glow',     tech.glow);
                wrapper.style.setProperty('--opacity',  opacity);

                const icon = document.createElement('i');
                icon.className = tech.icon;
                wrapper.appendChild(icon);
                techScene.appendChild(wrapper);
            }
        });
    }

    /* ==========================================
       1. CUSTOM CURSOR
       ========================================== */
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse coordinates
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Instant cursor dot position
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    // Animate outer cursor ring with smooth linear interpolation (Lerp)
    function animateCursor() {
        const easing = 0.15; // Speed factor of the outer ring following the dot

        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    /* ==========================================
       9. MESSAGES ADMIN VIEW (localStorage)
       ========================================== */
    const viewMessagesBtn = document.getElementById('view-messages-btn');
    const messagesModal = document.getElementById('messages-modal');
    const messagesList = document.getElementById('messages-list');
    const closeMessagesBtn = document.getElementById('close-messages');
    const clearMessagesBtn = document.getElementById('clear-messages');

    function renderMessages() {
        if (!messagesList) return;
        let items = [];
        try { items = JSON.parse(localStorage.getItem('portfolioMessages') || '[]'); } catch (e) { items = []; }
        messagesList.innerHTML = '';
        if (!items.length) {
            messagesList.innerHTML = '<p>No saved messages.</p>';
            return;
        }

        items.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'message-item';
            const title = document.createElement('h4');
            title.textContent = `${msg.subject} — ${msg.name} (${msg.email || 'no email'})`;
            const time = document.createElement('small');
            time.style.display = 'block';
            time.style.opacity = '0.7';
            time.textContent = new Date(msg.timestamp).toLocaleString();
            const body = document.createElement('p');
            body.textContent = msg.message || '';
            div.appendChild(title);
            div.appendChild(time);
            div.appendChild(body);
            messagesList.appendChild(div);
        });
    }

    if (viewMessagesBtn && messagesModal) {
        viewMessagesBtn.addEventListener('click', () => {
            messagesModal.setAttribute('aria-hidden', 'false');
            messagesModal.classList.add('active');
            renderMessages();
        });
    }

    if (closeMessagesBtn && messagesModal) {
        closeMessagesBtn.addEventListener('click', () => {
            messagesModal.setAttribute('aria-hidden', 'true');
            messagesModal.classList.remove('active');
        });
    }

    if (clearMessagesBtn) {
        clearMessagesBtn.addEventListener('click', () => {
            if (confirm('Clear all saved messages? This cannot be undone.')) {
                localStorage.removeItem('portfolioMessages');
                renderMessages();
            }
        });
    }
    animateCursor();

    // Hover effect expansions for links/buttons
    const hoverElements = document.querySelectorAll('a, button, .tab-btn, .project-card, .contact-social-pill');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'var(--accent-cyan)';
                cursor.style.backgroundColor = 'rgba(0, 240, 255, 0.05)';
            }
        });
        elem.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
                cursor.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                cursor.style.backgroundColor = 'transparent';
            }
        });
    });

    // Glassmorphic Build Card Mouse Gradient Follow Effect
    const buildCards = document.querySelectorAll('.build-card');
    buildCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    /* ==========================================
       2. CANVAS PARTICLE NETWORK
       ========================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let connectionDistance = 110;
        let maxParticles = 65;

        // Auto adjust density for smaller screens
        if (window.innerWidth < 768) {
            maxParticles = 30;
            connectionDistance = 80;
        }

        // Set Canvas dimensions
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle Constructor
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.35)' : 'rgba(157, 78, 221, 0.35)';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wall boundary checking
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Subtle attraction to mouse
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    this.x += dx * 0.003;
                    this.y += dy * 0.003;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Initialize particle array
        function initParticles() {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        // Connect particles close to each other
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const alpha = 1 - (distance / connectionDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.12})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation Loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            drawConnections();
            requestAnimationFrame(animate);
        }
        animate();
    }


    /* ==========================================
       3. DYNAMIC TYPING EFFECT
       ========================================== */
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const phrases = ["Full-Stack Developer", "Java Developer", "UI/UX Builder", "Creative Problem Solver"];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIdx];

            if (isDeleting) {
                typingSpan.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 50; // Deletion speed
            } else {
                typingSpan.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 120; // Normal typing speed
            }

            // State changes
            if (!isDeleting && charIdx === currentPhrase.length) {
                // Pause at completion
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 300; // Delay before next text
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }


    /* ==========================================
       4. DYNAMIC NAVIGATION HIGHLIGHT ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-container a.mobile-link');
    const header = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Sticky Navbar effect
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Active link highlight
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================
       5. MOBILE MENU OVERLAY TOGGLING
       ========================================== */
    const mobileToggleBtn = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

    if (mobileToggleBtn && mobileMenu) {
        // Toggle Open/Close state
        mobileToggleBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');

            // Hamburger to X state
            const bars = mobileToggleBtn.querySelectorAll('.bar');
            if (mobileMenu.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close when clicking mobile links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const bars = mobileToggleBtn.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }


    /* ==========================================
       6. INTERACTIVE ABOUT SECTIONS TABS
       ========================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Set active states
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });


    /* ==========================================
       7. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ========================================== */
    const revealSections = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% of section is visible
            rootMargin: '0px 0px -50px 0px'
        });

        revealSections.forEach(sec => {
            revealObserver.observe(sec);
        });
    } else {
        // Fallback for older browsers
        revealSections.forEach(sec => sec.classList.add('active'));
    }


    /* ==========================================
       8. CONTACT FORM: deliver, store & admin view
       - Opens user's mail client with message (mailto)
       - Saves submission locally in `localStorage` so owner can view
       - Shows existing visual feedback UI
       ========================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const feedbackBox = document.getElementById('form-feedback');

    function saveMessageLocally(msgObj) {
        try {
            const existing = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
            existing.unshift(msgObj);
            // keep last 200 messages max
            localStorage.setItem('portfolioMessages', JSON.stringify(existing.slice(0, 200)));
        } catch (err) {
            console.error('Could not save message locally', err);
        }
    }

    // Removed openMailClient function and replaced submit handling with fetch to backend endpoint
    if (contactForm && feedbackBox) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload

            const name = (contactForm.querySelector('#name') || {}).value || '';
            const email = (contactForm.querySelector('#email') || {}).value || '';
            const subject = (contactForm.querySelector('#subject') || {}).value || 'Portfolio Contact';
            const message = (contactForm.querySelector('#message') || {}).value || '';

            // Visual Submission Action
            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnSpan = submitBtn ? submitBtn.querySelector('span') : null;
            const btnIcon = submitBtn ? submitBtn.querySelector('i') : null;

            if (btnSpan && btnIcon) {
                btnSpan.textContent = 'Preparing...';
                btnIcon.className = 'fa-solid fa-circle-notch fa-spin';
                submitBtn.style.pointerEvents = 'none';
                submitBtn.style.opacity = '0.7';
            }

            const timestamp = new Date().toISOString();
            const msgObj = { name, email, subject, message, timestamp };

            // Save locally for owner to review
            saveMessageLocally(msgObj);

            // Send message to backend endpoint
            try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(msgObj)
                });
                if (!response.ok) throw new Error('Network response was not ok');
            } catch (err) {
                console.error('Failed to send message to server:', err);
            }

            // Show Success Screen and reset
            setTimeout(() => {
                feedbackBox.classList.add('show');
                contactForm.reset();

                // Revert submit button after a short period
                setTimeout(() => {
                    feedbackBox.classList.remove('show');
                    if (btnSpan && btnIcon) {
                        btnSpan.textContent = 'Send Message';
                        btnIcon.className = 'fa-regular fa-paper-plane';
                        submitBtn.style.pointerEvents = 'auto';
                        submitBtn.style.opacity = '1';
                    }
                }, 3000);
            }, 900);
        });
    }
});
