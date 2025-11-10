// Presentation App - Elementos del Teatro (Enhanced for 14-year-olds)

let currentSlide = 1;
const totalSlides = 22;
let quizData = {
    currentQuestion: 1,
    score: 0,
    answers: {},
    totalQuestions: 10
};

// Fun facts for interactive icons
const funFacts = {
    1: {
        title: "🎪 Teatro Antiguo",
        content: "¿Sabías que en el teatro griego antiguo solo actuaban hombres? ¡Incluso interpretaban a las mujeres usando máscaras! 🎭"
    },
    2: {
        title: "🎬 Teatro Moderno", 
        content: "¡Las obras de Shakespeare siguen siendo populares después de 400 años! Hamlet tiene más de 4,000 líneas de diálogo 📚"
    },
    3: {
        title: "🎨 Efectos Especiales",
        content: "Antes no había efectos digitales, ¡así que usaban trucos ingeniosos! Por ejemplo, agitaban metal para simular truenos ⚡"
    },
    4: {
        title: "🎯 Teatro Hoy",
        content: "¡El musical más largo del mundo duró 29 horas! Se llamaba 'The Cure' y se presentó en Nueva York 🕐"
    }
};

// Sound effects simulation
const sounds = {
    theater: "🎭 ¡Bienvenidos al teatro! 🎪",
    applause: "👏 ¡Muy bien! 👏",
    correct: "🎉 ¡Correcto! 🎉",
    wrong: "😅 ¡Inténtalo de nuevo! 💪"
};

// Get DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideElement = document.getElementById('currentSlide');
const totalSlidesElement = document.getElementById('totalSlides');
const progressDotsContainer = document.getElementById('progressDots');

// Initialize presentation
function init() {
    totalSlidesElement.textContent = totalSlides;
    createProgressDots();
    updateSlide();
    setupEventListeners();
    initializeQuiz();
}

// Create progress dots
function createProgressDots() {
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        dot.setAttribute('data-slide', i);
        if (i === 1) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(i);
            showNotification('¡Navegación rápida! 🚀');
        });
        
        progressDotsContainer.appendChild(dot);
    }
}

// Update slide display
function updateSlide() {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add active class to current slide
    const activeSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
    
    // Update counter
    currentSlideElement.textContent = currentSlide;
    
    // Update progress dots
    updateProgressDots();
    
    // Update button states
    updateButtons();
    
    // Special actions for certain slides
    if (currentSlide === 18) {
        resetQuiz();
    }
}

// Update progress dots
function updateProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach(dot => {
        const dotSlide = parseInt(dot.getAttribute('data-slide'));
        if (dotSlide === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Update button states
function updateButtons() {
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

// Go to specific slide
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        updateSlide();
    }
}

// Next slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

// Interactive Functions

// Play sound effect (visual feedback)
function playSound(type) {
    showNotification(sounds[type] || '🔊 ¡Sonido!');
    
    // Add bounce animation to theater icon
    const icon = document.querySelector('.theater-icon');
    if (icon) {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'bounce 0.5s ease';
        }, 10);
    }
}

// Show fun facts
function showFunFact(factId) {
    const fact = funFacts[factId];
    if (fact) {
        showModal(fact.title, fact.content);
    }
}

// Show modal
function showModal(title, content) {
    const modal = document.getElementById('funFactModal');
    const titleElement = modal.querySelector('.modal-header h3');
    const contentElement = document.getElementById('funFactContent');
    
    titleElement.textContent = title;
    contentElement.innerHTML = content;
    
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('funFactModal');
    modal.classList.add('hidden');
}

// Show notification
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    const textElement = notification.querySelector('.notification-text');
    
    textElement.textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, duration);
}

// Reveal quiz answer
function revealAnswer(answerId) {
    const answer = document.getElementById(`answer${answerId}`);
    if (answer) {
        answer.classList.remove('hidden');
        showNotification('¡Descubriste la respuesta! 🎯');
    }
}

// Show structure preview
function showPreview(type) {
    let message = '';
    if (type === 'externa') {
        message = '📐 La estructura externa incluye: Actos, Escenas, Acotaciones y Parlamentos';
    } else if (type === 'interna') {
        message = '💡 La estructura interna incluye: Tema, Acción, Tiempo, Argumento, Conflicto y Lenguaje';
    }
    showNotification(message, 4000);
}

// Animate example
function animateExample(type) {
    const example = document.querySelector('.clickable-example');
    if (example) {
        example.style.transform = 'scale(1.1)';
        example.style.background = 'rgba(255, 224, 178, 0.8)';
        
        setTimeout(() => {
            example.style.transform = 'scale(1)';
            example.style.background = '';
        }, 500);
        
        if (type === 'modern') {
            showNotification('📱 ¡Así se vería María en el escenario! 🎭');
        }
    }
}

// Quiz Functions

let quizAnswers = {};

function initializeQuiz() {
    quizAnswers = {};
    document.getElementById('quizScore').textContent = '0';
}

function selectAnswer(questionIndex, selectedOption) {
    // Respuestas correctas
    const correctAnswers = {
        1: 'B', 2: 'B', 3: 'A', 4: 'D', 5: 'C',
        6: 'B', 7: 'B', 8: 'B', 9: 'C', 10: 'B'
    };
    
    // Si ya respondió esta pregunta, no permitir cambiar
    if (quizAnswers[questionIndex]) {
        return;
    }
    
    // Guardar respuesta
    quizAnswers[questionIndex] = selectedOption;
    
    // Obtener todas las opciones de esta pregunta
    const questionDiv = document.getElementById(`q${questionIndex}`);
    const options = questionDiv.querySelectorAll('.quiz-option');
    
    // Deshabilitar todas las opciones
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        opt.style.opacity = '0.7';
    });
    
    // Marcar la opción seleccionada
    const isCorrect = selectedOption === correctAnswers[questionIndex];
    options.forEach(opt => {
        const optAnswer = opt.getAttribute('data-answer');
        
        if (optAnswer === selectedOption) {
            if (isCorrect) {
                opt.classList.add('correct-answer');
                const icon = document.createElement('span');
                icon.className = 'feedback-icon';
                icon.textContent = ' ✓';
                opt.appendChild(icon);
            } else {
                opt.classList.add('wrong-answer');
                const icon = document.createElement('span');
                icon.className = 'feedback-icon';
                icon.textContent = ' ✗';
                opt.appendChild(icon);
            }
        }
        
        // Mostrar la respuesta correcta si el usuario se equivocó
        if (!isCorrect && optAnswer === correctAnswers[questionIndex]) {
            opt.classList.add('correct-answer');
            const icon = document.createElement('span');
            icon.className = 'feedback-icon';
            icon.textContent = ' ✓ Correcta';
            opt.appendChild(icon);
        }
    });
    
    // Actualizar puntuación en tiempo real
    updateScore();
}

function updateScore() {
    const correctAnswers = {
        1: 'B', 2: 'B', 3: 'A', 4: 'D', 5: 'C',
        6: 'B', 7: 'B', 8: 'B', 9: 'C', 10: 'B'
    };
    
    let score = 0;
    Object.keys(quizAnswers).forEach(q => {
        if (quizAnswers[q] === correctAnswers[parseInt(q)]) {
            score++;
        }
    });
    
    document.getElementById('quizScore').textContent = score;
}

function submitQuiz() {
    const correctAnswers = {
        1: 'B', 2: 'B', 3: 'A', 4: 'D', 5: 'C',
        6: 'B', 7: 'B', 8: 'B', 9: 'C', 10: 'B'
    };
    
    // Verificar si todas las preguntas fueron respondidas
    if (Object.keys(quizAnswers).length < 10) {
        alert('⚠️ Por favor responde todas las preguntas antes de enviar.\n\n' + 
              'Has respondido ' + Object.keys(quizAnswers).length + ' de 10 preguntas.');
        
        // Scroll a la primera pregunta sin responder
        for (let i = 1; i <= 10; i++) {
            if (!quizAnswers[i]) {
                document.getElementById(`q${i}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
        return;
    }
    
    // Calcular puntuación
    let score = 0;
    Object.keys(quizAnswers).forEach(q => {
        if (quizAnswers[q] === correctAnswers[parseInt(q)]) {
            score++;
        }
    });
    
    // Mostrar resultados
    let title, emoji, message;
    
    if (score === 10) {
        title = '🏆 ¡PERFECTO! 10/10';
        emoji = '🎉🌟✨';
        message = '¡Eres un verdadero experto en teatro! Has dominado completamente todos los conceptos. ¡Excelente trabajo!';
    } else if (score >= 8) {
        title = '👏 ¡EXCELENTE! ' + score + '/10';
        emoji = '🎭😊';
        message = '¡Muy bien! Tienes un excelente conocimiento sobre el teatro. Dominas el tema. ¡Sigue así!';
    } else if (score >= 6) {
        title = '✅ ¡BIEN HECHO! ' + score + '/10';
        emoji = '👍📚';
        message = '¡Buen trabajo! Tienes una base sólida. Repasa los conceptos que te costaron más y serás un experto.';
    } else if (score >= 4) {
        title = '💪 ¡BUEN INTENTO! ' + score + '/10';
        emoji = '🤔📖';
        message = 'Vas por buen camino, pero necesitas repasar más. Lee de nuevo las diapositivas con atención.';
    } else {
        title = '📚 ¡A ESTUDIAR! ' + score + '/10';
        emoji = '😅💪';
        message = '¡No te desanimes! Revisa las diapositivas con calma, toma notas y vuelve a intentarlo. ¡Tú puedes!';
    }
    
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsEmoji').textContent = emoji;
    document.getElementById('resultsMessage').textContent = message;
    
    const resultsDiv = document.getElementById('quizResults');
    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    showNotification(`Quiz completado: ${score}/10 - ${Math.round(score * 10)}% 🎯`, 4000);
}

function restartQuiz() {
    // Resetear respuestas
    quizAnswers = {};
    document.getElementById('quizScore').textContent = '0';
    
    // Resetear todas las preguntas
    for (let i = 1; i <= 10; i++) {
        const questionDiv = document.getElementById(`q${i}`);
        const options = questionDiv.querySelectorAll('.quiz-option');
        
        options.forEach(opt => {
            opt.classList.remove('correct-answer', 'wrong-answer');
            opt.style.pointerEvents = 'auto';
            opt.style.opacity = '1';
            
            // Eliminar iconos de feedback
            const feedbackIcon = opt.querySelector('.feedback-icon');
            if (feedbackIcon) {
                feedbackIcon.remove();
            }
        });
    }
    
    // Ocultar resultados
    document.getElementById('quizResults').classList.add('hidden');
    
    // Scroll al inicio del quiz
    document.getElementById('q1').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    showNotification('¡Quiz reiniciado! ¡Buena suerte! 🍀', 2000);
}

function resetQuiz() {
    quizData = {
        currentQuestion: 1,
        score: 0,
        answers: {},
        totalQuestions: 3
    };
    
    updateQuizDisplay();
    showQuestion(1);
    
    const resultsDiv = document.getElementById('quizResults');
    if (resultsDiv) {
        resultsDiv.classList.add('hidden');
    }
}

// Summary enhancements
function animateTree() {
    const tree = document.querySelector('.tree-root');
    if (tree) {
        tree.style.animation = 'pulse 1s ease';
        showNotification('🎭 ¡El teatro tiene muchas partes! 🌳');
    }
}

function checkChallenge() {
    const input = document.querySelector('.challenge-input');
    const value = input.value.trim();
    
    if (value.length < 10) {
        showNotification('¡Intenta escribir un poco más! 📝', 2000);
        return;
    }
    
    if (value.includes('(') && value.includes(')')) {
        showNotification('¡Excelente! Usaste paréntesis como en las acotaciones reales 🎯', 4000);
    } else {
        showNotification('¡Muy bien! Recuerda que las acotaciones van entre paréntesis ( ) 💡', 4000);
    }
    
    // Add visual feedback
    input.style.borderColor = 'var(--soft-green-accent)';
    input.style.boxShadow = '0 0 15px rgba(165, 214, 167, 0.4)';
    
    setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }, 2000);
}

// Final slide functions
function celebrate() {
    const emojis = document.querySelectorAll('.floating-emoji');
    emojis.forEach((emoji, index) => {
        setTimeout(() => {
            emoji.style.animation = 'bounce 0.5s ease';
        }, index * 200);
    });
    showNotification('🎉 ¡Felicitaciones por completar el curso! 🎭');
}

function shareAchievement() {
    const text = "¡Acabo de completar el curso de Elementos del Teatro! 🎭🌟";
    if (navigator.share) {
        navigator.share({
            title: 'Elementos del Teatro',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback for browsers without Web Share API
        navigator.clipboard.writeText(text + ' ' + window.location.href)
            .then(() => showNotification('¡Texto copiado al portapapeles! 📋'))
            .catch(() => showNotification('¡Logro desbloqueado! 🏆'));
    }
}

// Setup event listeners
function setupEventListeners() {
    // Button clicks
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation (enhanced)
    document.addEventListener('keydown', (e) => {
        // Don't interfere with input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'Home') {
            e.preventDefault();
            goToSlide(1);
        } else if (e.key === 'End') {
            e.preventDefault();
            goToSlide(totalSlides);
        } else if (e.key === 'Escape') {
            closeModal();
        }
        
        // Number keys for quick navigation
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9 && e.ctrlKey) {
            e.preventDefault();
            const targetSlide = num <= totalSlides ? num : totalSlides;
            goToSlide(targetSlide);
            showNotification(`¡Navegación rápida a diapositiva ${targetSlide}! ⚡`);
        }
    });
    
    // Touch/swipe support for mobile (enhanced)
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes that are longer than vertical ones
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Click outside modal to close
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('funFactModal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Prevent context menu on long press for mobile
    document.addEventListener('contextmenu', (e) => {
        if (e.target.classList.contains('clickable') || 
            e.target.classList.contains('clickable-icon') ||
            e.target.classList.contains('quiz-option')) {
            e.preventDefault();
        }
    });
}

// Performance optimization: Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.content-card, .structure-box, .type-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        setupIntersectionObserver();
    });
} else {
    init();
    setupIntersectionObserver();
}

// Add some easter eggs for engaged students
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 50) {
        showNotification('🏆 ¡Usuario súper activo desbloqueado! 🌟', 4000);
    } else if (clickCount === 100) {
        showNotification('🎭 ¡Amante del teatro certificado! 💎', 4000);
    }
});

// Prevent accidental page refresh
window.addEventListener('beforeunload', (e) => {
    if (currentSlide > 1) {
        e.preventDefault();
        e.returnValue = '¿Estás seguro de que quieres salir? Perderás tu progreso.';
    }
});

// Add smooth scroll behavior for any internal navigation
document.documentElement.style.scrollBehavior = 'smooth';

// Image modal functionality
function openImageModal(imageSrc) {
    // Check if modal already exists
    let modal = document.getElementById('imageModal');
    
    if (!modal) {
        // Create modal
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-content">
                <button class="image-modal-close" onclick="closeImageModal()">✕</button>
                <img src="" alt="Fragmento de Romeo y Julieta">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeImageModal();
            }
        });
    }
    
    // Set image and show modal
    const img = modal.querySelector('img');
    img.src = imageSrc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Element Modal System
const elementosData = {
    actos: {
        icon: '🎬',
        title: 'Actos',
        content: `
            <p class="definition">Son las partes principales en que se divide la obra</p>
            <ul class="styled-list">
                <li>Cada acto representa un cambio importante en la historia</li>
                <li>Tradicionalmente coinciden con la caída del telón</li>
                <li>Las obras suelen tener <strong>3 o 5 actos</strong></li>
            </ul>
            <div class="visual-note" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <span style="font-size: 24px;">🎭</span>
                <p style="margin: 8px 0 0 0; color: var(--dark-text);">Es como los capítulos de una historia, pero en el escenario</p>
            </div>
        `
    },
    escenas: {
        icon: '🎞️',
        title: 'Escenas',
        content: `
            <p class="definition">Son las secuencias que forman cada acto</p>
            <ul class="styled-list">
                <li>Se produce un cambio de escena cuando entra o sale un personaje del escenario</li>
                <li>Cada acto consta de varias escenas</li>
            </ul>
            <div class="visual-note" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <span style="font-size: 24px;">💡</span>
                <p style="margin: 8px 0 0 0; color: var(--dark-text);">Las escenas son como los momentos clave dentro de cada acto</p>
            </div>
        `
    },
    cuadros: {
        icon: '🖼️',
        title: 'Cuadros',
        content: `
            <p class="definition">Divisiones dentro de los actos que indican cambios de escenografía</p>
            <ul class="styled-list">
                <li>Representan cambios de espacio físico o tiempo</li>
                <li>Permiten contar la historia en diferentes lugares</li>
                <li>No todas las obras los utilizan</li>
            </ul>
            <div class="visual-note" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <span style="font-size: 24px;">🎨</span>
                <p style="margin: 8px 0 0 0; color: var(--dark-text);">Como cambiar de "nivel" en un videojuego</p>
            </div>
        `
    },
    acotaciones: {
        icon: '📝',
        title: 'Acotaciones',
        content: `
            <div style="background: linear-gradient(135deg, rgba(255, 224, 178, 0.3), rgba(227, 242, 253, 0.3)); padding: 20px; border-radius: 16px; margin-bottom: 20px; border: 2px solid rgba(255, 138, 101, 0.3);">
                <p style="text-align: center; font-weight: 600; margin-bottom: 12px;">🎬 ¡Son como las instrucciones de un director!</p>
                <div style="background: white; padding: 12px; border-radius: 10px;">
                    <strong>Director:</strong> "Luces tenues, música de suspense"<br>
                    <strong>Teatro:</strong> <em>"(Se oscurece el escenario, suena música inquietante)"</em>
                </div>
            </div>
            <p class="definition">Son las <strong>instrucciones secretas</strong> que el autor le da a los actores y técnicos</p>
            <ul class="styled-list">
                <li>Dicen cómo debe verse el escenario (¿oscuro? ¿con música épica? 🎵)</li>
                <li>Explican cómo actuar: ¿enojado? ¿triste? ¿como un villano? 😈</li>
                <li>Siempre van <strong>entre paréntesis</strong> y en <em>cursiva</em></li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(255, 249, 196, 0.3), rgba(243, 229, 245, 0.3)); padding: 16px; border-radius: 12px; margin-top: 16px; border-left: 4px solid #ffd700;">
                <p style="font-weight: 600; margin-bottom: 8px;">📱 Ejemplo moderno:</p>
                <p style="font-style: italic; color: var(--dark-text);"><em>(María entra checando su teléfono, preocupada porque no tiene señal)</em></p>
            </div>
        `
    },
    parlamentos: {
        icon: '💬',
        title: 'Parlamentos',
        content: `
            <p class="definition">Son las palabras que los personajes deben decir</p>
            <p style="font-weight: 600; color: var(--dark-text); margin: 16px 0;">💬 Van siempre acompañados del nombre del personaje que los dice</p>
            <p style="font-weight: 600; color: var(--dark-text);">🎯 Se clasifican en tres tipos:</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-top: 20px;">
                <div onclick="showElementModal('monologos')" style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.4), rgba(255, 224, 178, 0.4)); padding: 20px; border-radius: 14px; text-align: center; border: 2px solid rgba(186, 104, 200, 0.3); cursor: pointer; transition: all 0.3s ease;">
                    <span style="font-size: 36px;">🗣️</span>
                    <h3 style="margin: 8px 0 0 0; color: var(--dark-text);">Monólogos</h3>
                </div>
                <div onclick="showElementModal('dialogos')" style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.4), rgba(255, 224, 178, 0.4)); padding: 20px; border-radius: 14px; text-align: center; border: 2px solid rgba(186, 104, 200, 0.3); cursor: pointer; transition: all 0.3s ease;">
                    <span style="font-size: 36px;">💭</span>
                    <h3 style="margin: 8px 0 0 0; color: var(--dark-text);">Diálogos</h3>
                </div>
                <div onclick="showElementModal('apartes')" style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.4), rgba(255, 224, 178, 0.4)); padding: 20px; border-radius: 14px; text-align: center; border: 2px solid rgba(186, 104, 200, 0.3); cursor: pointer; transition: all 0.3s ease;">
                    <span style="font-size: 36px;">🤫</span>
                    <h3 style="margin: 8px 0 0 0; color: var(--dark-text);">Apartes</h3>
                </div>
            </div>
        `
    },
    monologos: {
        icon: '🗣️',
        title: 'Monólogos',
        content: `
            <div style="background: linear-gradient(135deg, rgba(255, 224, 178, 0.3), rgba(227, 242, 253, 0.3)); padding: 20px; border-radius: 16px; margin-bottom: 20px; border: 2px solid rgba(255, 138, 101, 0.3);">
                <p style="text-align: center; font-weight: 600;">💡 ¿Te suena familiar?</p>
                <p style="background: white; padding: 12px; border-radius: 10px; text-align: center; margin-top: 10px;">Es como cuando un personaje de serie piensa en voz alta y escuchamos sus pensamientos internos 🧠</p>
            </div>
            <p class="definition">Un personaje habla solo... ¡pero el público lo escucha todo!</p>
            <ul class="styled-list">
                <li>Es como tener un diario hablado 📔</li>
                <li>El personaje expresa lo que piensa y siente</li>
                <li>¡Nadie más en el escenario puede oírlo!</li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.3), rgba(255, 249, 196, 0.3)); padding: 20px; border-radius: 16px; margin-top: 20px; border: 2px solid rgba(186, 104, 200, 0.3);">
                <p style="font-weight: 600; margin-bottom: 12px;">🎬 Ejemplos que conoces:</p>
                <div style="display: grid; gap: 10px;">
                    <div style="background: white; padding: 10px; border-radius: 8px;">📺 <strong>Stranger Things:</strong> Cuando Eleven reflexiona sola</div>
                    <div style="background: white; padding: 10px; border-radius: 8px;">🦸 <strong>Spider-Man:</strong> Cuando Peter Parker se cuestiona sus decisiones</div>
                </div>
            </div>
        `
    },
    dialogos: {
        icon: '💭',
        title: 'Diálogos',
        content: `
            <p class="definition">Conversación entre dos o más personajes</p>
            <ul class="styled-list">
                <li>Es la conversación fluida entre personajes</li>
                <li>Permite desarrollar la acción y las relaciones</li>
                <li>Es el elemento más común en el teatro</li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <span style="font-size: 24px;">⭐</span>
                <p style="margin: 8px 0 0 0; color: var(--dark-text);">La mayor parte de una obra teatral está formada por diálogos</p>
            </div>
            <div style="background: linear-gradient(135deg, rgba(255, 224, 178, 0.3), rgba(227, 242, 253, 0.3)); padding: 16px; border-radius: 12px; margin-top: 16px; border-left: 4px solid #ffd700;">
                <p style="font-weight: 600; margin-bottom: 8px;">Ejemplo:</p>
                <p style="font-style: italic;"><strong>JUAN:</strong> ¿Ya terminaste la tarea?<br><strong>MARÍA:</strong> Casi... ¿me ayudas con las matemáticas?</p>
            </div>
        `
    },
    apartes: {
        icon: '🤫',
        title: 'Apartes',
        content: `
            <div style="background: linear-gradient(135deg, rgba(255, 224, 178, 0.3), rgba(227, 242, 253, 0.3)); padding: 20px; border-radius: 16px; margin-bottom: 20px; border: 2px solid rgba(255, 138, 101, 0.3);">
                <p style="text-align: center; font-weight: 600;">🤳 Es como...</p>
                <p style="background: white; padding: 12px; border-radius: 10px; text-align: center; margin-top: 10px;">Cuando un personaje te mira directamente y te cuenta un secreto que los demás no escuchan 😏</p>
            </div>
            <p class="definition">¡Secretos compartidos solo con el público! 🎭</p>
            <ul class="styled-list">
                <li>El personaje habla directamente A TI (el espectador) 👉</li>
                <li>Los otros personajes en escena NO lo escuchan 🙉</li>
                <li>Es como tener información privilegiada 🔐</li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.3), rgba(255, 249, 196, 0.3)); padding: 20px; border-radius: 16px; margin-top: 20px; border: 2px solid rgba(186, 104, 200, 0.3);">
                <p style="font-weight: 600; margin-bottom: 12px;">🎬 Lo has visto en:</p>
                <div style="display: grid; gap: 10px;">
                    <div style="background: white; padding: 10px; border-radius: 8px;">🏠 <strong>House of Cards:</strong> Cuando Frank Underwood te mira y comenta</div>
                    <div style="background: white; padding: 10px; border-radius: 8px;">💔 <strong>Fleabag:</strong> Cuando la protagonista te habla directamente</div>
                    <div style="background: white; padding: 10px; border-radius: 8px;">🎪 <strong>The Office:</strong> Cuando miran a la cámara</div>
                </div>
            </div>
            <div style="background: white; padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <p style="font-weight: 600; margin-bottom: 8px;">💬 Ejemplo:</p>
                <p><strong>María:</strong> Sí, me encanta tu ensayo... <span style="color: #d84315; font-weight: 600; font-style: italic;">(Al público) ¡Qué aburrido! 😴</span></p>
            </div>
        `
    },
    tema: {
        icon: '🎯',
        title: 'Tema',
        content: `
            <p class="definition">Es la idea fundamental que el autor quiere transmitir</p>
            <p style="font-weight: 600; color: var(--dark-text); margin: 16px 0;">🎯 Puede haber varios ejes temáticos, pero suele haber un tema central</p>
            <div style="background: linear-gradient(135deg, rgba(255, 249, 196, 0.3), rgba(232, 245, 233, 0.3)); padding: 20px; border-radius: 16px; margin-top: 20px; border: 2px solid rgba(124, 179, 66, 0.3);">
                <p style="font-weight: 600; margin-bottom: 12px;">Ejemplos de temas:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">La muerte</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">El amor</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">La vejez</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">El coraje</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">La culpa</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">La justicia</span>
                </div>
            </div>
            <div style="background: rgba(102, 126, 234, 0.1); padding: 16px; border-radius: 12px; margin-top: 16px; text-align: center; border: 2px solid rgba(102, 126, 234, 0.3);">
                <p style="font-weight: 600; color: var(--dark-text);">❓ ¿De qué nos quiso hablar el autor?</p>
            </div>
        `
    },
    accion: {
        icon: '⚡',
        title: 'Acción',
        content: `
            <p class="definition">Es la forma en que se desenvuelve el argumento teatral</p>
            <ul class="styled-list">
                <li>La acción dramática utiliza una serie de elementos que provocan un cambio</li>
                <li>Es el motor que lleva la obra desde su inicio hasta su desenlace</li>
                <li>Surge del conflicto entre personajes o fuerzas opuestas</li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <span style="font-size: 24px;">🚀</span>
                <p style="margin: 8px 0 0 0; color: var(--dark-text);">La acción hace que la historia avance y mantenga el interés</p>
            </div>
            <div style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.3), rgba(255, 224, 178, 0.3)); padding: 16px; border-radius: 12px; margin-top: 16px; border-left: 4px solid #ffd700;">
                <p style="font-weight: 600; margin-bottom: 8px;">Ejemplo:</p>
                <p>En una obra, la acción ocurre cuando un personaje roba algo importante y todos deben encontrarlo antes de que sea tarde</p>
            </div>
        `
    },
    tiempo: {
        icon: '⏰',
        title: 'Tiempo',
        content: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.3), rgba(227, 242, 253, 0.3)); padding: 20px; border-radius: 14px; border: 2px solid rgba(186, 104, 200, 0.3);">
                    <h3 style="color: var(--dark-text); margin-bottom: 8px;">⏳ Tiempo de la acción</h3>
                    <p>Cuando transcurre la obra (tiempo de la historia)</p>
                </div>
                <div style="background: linear-gradient(135deg, rgba(243, 229, 245, 0.3), rgba(227, 242, 253, 0.3)); padding: 20px; border-radius: 14px; border: 2px solid rgba(186, 104, 200, 0.3);">
                    <h3 style="color: var(--dark-text); margin-bottom: 8px;">⏱️ Tiempo de la representación</h3>
                    <p>Lo que dura la obra (tiempo real)</p>
                </div>
            </div>
            <p style="font-weight: 600; color: var(--dark-text); margin: 16px 0;">⏰ El tiempo puede ser:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
                <span style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)); padding: 8px 16px; border-radius: 20px; font-weight: 600;">Histórico</span>
                <span style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)); padding: 8px 16px; border-radius: 20px; font-weight: 600;">Mítico</span>
                <span style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)); padding: 8px 16px; border-radius: 20px; font-weight: 600;">Actual</span>
                <span style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2)); padding: 8px 16px; border-radius: 20px; font-weight: 600;">Indefinido</span>
            </div>
            <p style="font-style: italic; color: var(--dark-text); margin-top: 16px;">Se indica a través de diálogos, escenografía y vestuario</p>
        `
    },
    argumento: {
        icon: '📚',
        title: 'Argumento',
        content: `
            <p class="definition">Es la relación de acontecimientos que se conocen a través de la acción</p>
            <ul class="styled-list">
                <li>Es la trama: los hechos que se van encadenando</li>
                <li>Es lo fáctico, lo que realmente sucede</li>
            </ul>
            <div style="background: rgba(102, 126, 234, 0.1); padding: 16px; border-radius: 12px; margin-top: 16px; text-align: center; border: 2px solid rgba(102, 126, 234, 0.3);">
                <p style="font-weight: 600; color: var(--dark-text);">❓ ¿Qué pasó en la obra?</p>
            </div>
            <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <span style="font-size: 24px;">📖</span>
                <p style="margin: 8px 0 0 0; color: var(--dark-text);">El argumento es la historia concreta que se cuenta</p>
            </div>
        `
    },
    conflicto: {
        icon: '⚔️',
        title: 'Conflicto',
        content: `
            <p class="definition">Es la base del género dramático</p>
            <p style="font-weight: 600; color: var(--dark-text); margin: 16px 0;">⚔️ Puede darse en diferentes formas:</p>
            <ul class="styled-list">
                <li>Entre dos personajes</li>
                <li>En la sociedad</li>
                <li>En sentimientos opuestos</li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(255, 224, 178, 0.3), rgba(243, 229, 245, 0.3)); padding: 20px; border-radius: 14px; margin-top: 20px; border: 2px solid rgba(255, 138, 101, 0.3); text-align: center;">
                <p style="font-weight: 600; margin: 0;">⚠️ <strong>Sin conflicto, no hay acción dramática</strong></p>
                <p style="margin: 8px 0 0 0;">Es el choque de intereses o fuerzas opuestas que genera tensión</p>
            </div>
            <div style="background: white; padding: 16px; border-radius: 12px; margin-top: 16px; border: 2px solid rgba(102, 126, 234, 0.3);">
                <p style="font-weight: 600; margin-bottom: 8px;">Ejemplo:</p>
                <p>Romeo y Julieta: El amor entre ellos vs. el odio entre sus familias</p>
            </div>
        `
    },
    lenguaje: {
        icon: '✍️',
        title: 'Lenguaje Literario',
        content: `
            <p class="definition">En los parlamentos se corresponde con el lenguaje hablado</p>
            <ul class="styled-list">
                <li>Usa el registro de lengua particular de cada personaje</li>
                <li>Puede ser más explicativo, literario o poético</li>
                <li>Varía según la elección del autor y puede cambiar en diferentes partes de la obra</li>
            </ul>
            <div style="background: linear-gradient(135deg, rgba(255, 249, 196, 0.3), rgba(232, 245, 233, 0.3)); padding: 20px; border-radius: 16px; margin-top: 20px; border: 2px solid rgba(124, 179, 66, 0.3);">
                <p style="font-weight: 600; margin-bottom: 12px;">Recursos estilísticos:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">Metáforas</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">Ironía</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">Hipérboles</span>
                    <span style="background: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">Símiles</span>
                </div>
            </div>
        `
    }
};

function showElementModal(elementKey) {
    const elemento = elementosData[elementKey];
    if (!elemento) return;
    
    const modal = document.getElementById('funFactModal');
    const titleElement = modal.querySelector('.modal-header h3');
    const contentElement = document.getElementById('funFactContent');
    
    titleElement.innerHTML = `${elemento.icon} ${elemento.title}`;
    contentElement.innerHTML = elemento.content;
    
    modal.classList.remove('hidden');
    showNotification(`Explorando: ${elemento.title} 🎯`);
}