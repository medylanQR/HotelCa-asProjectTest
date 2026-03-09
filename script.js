/**
 * PROYECTO: Hotel Cañas - QR Innovations
 * INTERACTIVIDAD PREMIUM - VERSIÓN FINAL UNIFICADA (3 PASOS + LOYALTY + METRICS)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENTOS DEL DOM ---
    const scrollArrow = document.getElementById('scrollArrow');
    const roomsSection = document.getElementById('rooms');
    const modal = document.getElementById("bookingModal");
    const closeModal = document.querySelector(".close-modal");
    const modalContent = document.querySelector(".modal-content");
    
    // Elementos de Lealtad y Métricas
    const loyaltyModal = document.getElementById('loyaltyModal');
    const metricsModal = document.getElementById('metricsModal');
    const loyaltyTrigger = document.getElementById('loyaltyTrigger');

    // --- 2. SCROLL SUAVE (Hero -> Rooms) ---
    if (scrollArrow && roomsSection) {
        scrollArrow.addEventListener('click', () => {
            roomsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 3. EFECTO DE APARICIÓN (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const roomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                roomObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const roomCards = document.querySelectorAll('.room-card-premium');
    roomCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(60px)";
        card.style.transition = "all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)";
        roomObserver.observe(card);
    });

    // --- 4. CONTROL DEL MODAL DE RESERVAS (Abrir/Cerrar) ---
    const allBookingButtons = document.querySelectorAll('.room-card-premium button');

    allBookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.style.display = "flex";
                
                // RESET TOTAL: Volver al Paso 1 cada vez que se abre
                const step1 = document.getElementById('step1-calendar');
                const step2 = document.getElementById('confirmationStep');
                const step3 = document.getElementById('successStep');
                
                if (step1) step1.style.display = 'block';
                if (step2) step2.style.display = 'none';
                if (step3) step3.style.display = 'none';
                
                if (modalContent) modalContent.style.maxWidth = '800px'; 
                if (closeModal) closeModal.style.display = 'block';
            }
        });
    });

    // --- 5. CONTROL DE LEALTAD Y MÉTRICAS ---
    if (loyaltyTrigger) {
        loyaltyTrigger.addEventListener('click', () => {
            loyaltyModal.style.display = 'flex';
        });
    }

    // TRUCO PRO: Presionar 'M' para abrir el Dashboard de Dueño
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm') {
            metricsModal.style.display = 'flex';
        }
    });

    // Cierre general de todos los modales
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.onclick = function() {
            this.closest('.modal').style.display = 'none';
        }
    });

    window.onclick = (event) => {
        if (event.classList && event.classList.contains('modal')) {
            event.style.display = "none";
        }
    };

    // --- 6. FADE OUT DE LA FLECHA AL SCROLLEAR ---
    window.addEventListener('scroll', () => {
        if (scrollArrow) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 150) {
                scrollArrow.style.opacity = "0";
                scrollArrow.style.pointerEvents = "none";
                scrollArrow.style.transition = "opacity 0.5s ease";
            } else {
                scrollArrow.style.opacity = "1";
                scrollArrow.style.pointerEvents = "auto";
            }
        }
    });
});

// --- 7. FUNCIONES GLOBALES (Paso a paso) ---

function goToStep2() {
    const step1 = document.getElementById('step1-calendar');
    const step2 = document.getElementById('confirmationStep');
    const modalContent = document.querySelector("#bookingModal .modal-content");

    if (step1 && step2) {
        step1.style.display = 'none';
        step2.style.display = 'block';
        if (modalContent) modalContent.style.maxWidth = '1100px';
    }
}

function showSuccess() {
    const step2 = document.getElementById('confirmationStep');
    const step3 = document.getElementById('successStep');
    const modalContent = document.querySelector("#bookingModal .modal-content");
    const closeModal = document.querySelector("#bookingModal .close-modal");

    if (step2 && step3) {
        step2.style.display = 'none';
        step3.style.display = 'block';
        if (modalContent) modalContent.style.maxWidth = '600px';
        if (closeModal) closeModal.style.display = 'none';
    }
}