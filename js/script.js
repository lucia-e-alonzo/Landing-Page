document.addEventListener("DOMContentLoaded", () => {
    
    // --- Lógica de Scroll Reveal ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15 
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Lógica de Acordeón (Timeline Cards) ---
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach(card => {
        card.addEventListener('click', () => {
            // Verifica si la tarjeta actual ya está expandida
            const isCurrentlyExpanded = card.classList.contains('is-expanded');
            
            // Cierra todas las tarjetas
            timelineCards.forEach(c => c.classList.remove('is-expanded'));
            
            // Si la tarjeta clickeada no estaba expandida, ábrela
            // (Si ya estaba expandida, se quedará cerrada gracias al remove anterior)
            if (!isCurrentlyExpanded) {
                card.classList.add('is-expanded');
            }
        });
    });
});