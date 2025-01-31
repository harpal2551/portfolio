// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Web Developer', 'Video Editor'];
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < texts[textIndex].length) {
        typedTextSpan.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    }
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Skills counter
const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            let count = 0;
            
            const updateCount = () => {
                const increment = target / 50; // Smoother animation
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCount();
            observerSkills.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe all counters
document.querySelectorAll('.counter').forEach(counter => {
    observerSkills.observe(counter);
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Add this to your existing JavaScript
const observerProgress = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start progress bar animation
            const progressFill = entry.target;
            const value = progressFill.dataset.value;
            progressFill.style.width = `${value}%`;

            // Start counter animation
            const counterElement = progressFill.parentElement.nextElementSibling.querySelector('.counter');
            const targetValue = parseInt(counterElement.dataset.value);
            let currentValue = 0;
            
            const updateCounter = () => {
                if (currentValue < targetValue) {
                    currentValue++;
                    counterElement.textContent = currentValue;
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
            observerProgress.unobserve(progressFill);
        }
    });
}, { threshold: 0.5 });

// Observe all progress fills
document.querySelectorAll('.progress-fill').forEach(fill => {
    observerProgress.observe(fill);
}); 