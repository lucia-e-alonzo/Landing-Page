/* ==================== SMOOTH SCROLLING ==================== */

// Agregar smooth scroll a todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== ANIMACIÓN DEL FOOTER AL CARGAR ==================== */

// Animar elementos del footer cuando aparecen en pantalla
function observarElementos() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observar todas las secciones del footer
    document.querySelectorAll('.footer-section').forEach(section => {
        observer.observe(section);
    });
}

// Agregar la animación en CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* ==================== EVENTO AL CARGAR LA PÁGINA ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Llamar función de observación
    observarElementos();
    
    // Agregar año dinámico al footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Nombre del equipo. Todos los derechos reservados.`;
    }
    
    // Log de inicialización (opcional, para debug)
    console.log('✓ Footer inicializado correctamente');
});

/* ==================== MANEJO DE ENLACES DE CONTACTO ==================== */

// Validar y manejar mailto
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Permitir que se abra el cliente de correo predeterminado
        console.log('Abriendo cliente de correo...');
    });
});

// Validar y manejar tel
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // En dispositivos móviles, abrirá la app de llamadas
        console.log('Iniciando llamada...');
    });
});

/* ==================== EFECTO DE HOVER EN REDES SOCIALES ==================== */

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.08)';
        this.style.boxShadow = '0 6px 15px rgba(255, 215, 0, 0.3)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

/* ==================== DETECCIÓN DE ENLACE ACTIVO ==================== */

// Marcar enlace del footer como activo según la sección visible
function marcarEnlaceActivo() {
    const sections = document.querySelectorAll('section, header');
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        footerLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
                link.style.color = '#ffd700';
            } else {
                link.style.color = '#c0c0c0';
            }
        });
    });
}

marcarEnlaceActivo();

/* ==================== FUNCIÓN PARA COPIAR AL PORTAPAPELES (OPCIONAL) ==================== */

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        console.log('✓ Texto copiado: ' + texto);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Si en el futuro quieres que el email o teléfono sean copiables:
// copiarAlPortapapeles('equipo@ejemplo.com');