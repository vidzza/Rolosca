/**
 * INBURSA PREMIUM - JavaScript
 * Efectos, animaciones e interactividad premium
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════
    // LOADER
    // ═══════════════════════════════════════════════════════════════
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            initAnimations();
        }, 1500);
    });

    // ═══════════════════════════════════════════════════════════════
    // CURSOR PERSONALIZADO
    // ═══════════════════════════════════════════════════════════════
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Cursor principal - movimiento rápido
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Follower - movimiento suave
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Efecto hover en enlaces y botones
        const interactiveElements = document.querySelectorAll('a, button, .solution-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'transparent';
                cursor.style.border = '1px solid #C9A962';
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
                cursorFollower.style.borderColor = '#C9A962';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = '#C9A962';
                cursor.style.border = 'none';
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // NAVEGACIÓN
    // ═══════════════════════════════════════════════════════════════
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect para header
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
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

    // ═══════════════════════════════════════════════════════════════
    // ANIMACIONES DE SCROLL (AOS-like)
    // ═══════════════════════════════════════════════════════════════
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Aplicar delay si existe
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // CONTADOR ANIMADO
    // ═══════════════════════════════════════════════════════════════
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Observar contadores
    const counterElements = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => counterObserver.observe(el));

    // ═══════════════════════════════════════════════════════════════
    // PARTÍCULAS EN HERO
    // ═══════════════════════════════════════════════════════════════
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(201, 169, 98, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Agregar keyframes para partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle-float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                50% {
                    transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════════════════════════
    // EFECTO PARALLAX SUAVE EN HERO
    // ═══════════════════════════════════════════════════════════════
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / 700);
            }
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // TIMELINE ANIMATION
    // ═══════════════════════════════════════════════════════════════
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        timelineObserver.observe(item);
    });

    // ═══════════════════════════════════════════════════════════════
    // SOLUTION CARDS HOVER EFFECT
    // ═══════════════════════════════════════════════════════════════
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // WHATSAPP TRACKING
    // ═══════════════════════════════════════════════════════════════
    const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp click:', this.href);
            
            // Analytics tracking (si está disponible)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': this.href
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // EFECTO DE TYPING EN BADGE
    // ═══════════════════════════════════════════════════════════════
    const heroBadge = document.querySelector('.hero-badge');
    
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroBadge.style.transition = 'all 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 1600);
    }

    // ═══════════════════════════════════════════════════════════════
    // SCROLL REVEAL PARA STATS
    // ═══════════════════════════════════════════════════════════════
    const backingStats = document.querySelectorAll('.backing-stat');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    backingStats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px) scale(0.95)';
        stat.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        statsObserver.observe(stat);
    });

    // ═══════════════════════════════════════════════════════════════
    // MAGNETIC BUTTONS
    // ═══════════════════════════════════════════════════════════════
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-whatsapp');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE: Lazy load de imágenes
    // ═══════════════════════════════════════════════════════════════
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // PREVENIR ZOOM EN INPUTS EN MÓVILES
    // ═══════════════════════════════════════════════════════════════
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content', viewport.content + ', maximum-scale=1.0, user-scalable=0');
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // REDUCIR MOTION SI EL USUARIO LO PREFIERE
    // ═══════════════════════════════════════════════════════════════
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
        
        // Desactivar animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.001ms !important;
                transition-duration: 0.001ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════════════════════════
    // CONSOLE BRANDING
    // ═══════════════════════════════════════════════════════════════
    console.log(
        '%c ROLOSCA %c Agente de Seguros ',
        'background: linear-gradient(135deg, #C9A962, #8B7355); color: #0A1628; padding: 10px 15px; font-size: 14px; font-weight: bold; border-radius: 4px 0 0 4px;',
        'background: #0A1628; color: #C9A962; padding: 10px 15px; font-size: 14px; border-radius: 0 4px 4px 0;'
    );

});

// ═══════════════════════════════════════════════════════════════
// PERFORMANCE MARK
// ═══════════════════════════════════════════════════════════════
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
