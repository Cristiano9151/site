// Global variables
const body = document.body;
const typingElement = document.querySelector('.typing');
const themeButton = document.querySelector('.toggle-theme');
const memeBubble = document.getElementById('memeBubble');

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeButton.innerHTML = isLight ? '🌙' : '☀️';
    
    // Update animation for appropriate mode
    typingElement.style.animation = isLight ? 
        'blink-caret-light 0.75s step-end infinite' : 
        'blink-caret-dark 0.75s step-end infinite';
    typingElement.style.borderRightColor = isLight ? '#121212' : 'white';
    
    // Show meme bubble when switching to light mode
    if (isLight) {
        showMemeBubble();
    } else {
        hideMemeBubble();
    }
}

/**
 * Show the meme bubble
 */
function showMemeBubble() {
    memeBubble.classList.add('active');
    // Log to verify function is called
    console.log('Showing meme bubble');
    
    // Hide after 3 seconds
    setTimeout(hideMemeBubble, 3000);
}

/**
 * Hide the meme bubble
 */
function hideMemeBubble() {
    memeBubble.classList.remove('active');
    // Log to verify function is called
    console.log('Hiding meme bubble');
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    document.querySelector('.mobile-menu').classList.toggle('active');
    document.querySelector('.mobile-menu-btn').classList.toggle('active');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    let loadingScreen = document.querySelector('.loading-screen');
    let container = document.querySelector('.container');
    
    // Initial theme setup
    const isLight = body.classList.contains('light-mode');
    themeButton.innerHTML = isLight ? '🌙' : '☀️';
    
    // Handle anchor links for smooth scrolling in the fixed container
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const mainWrapper = document.querySelector('.main-wrapper');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                mainWrapper.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            document.querySelector('.mobile-menu').classList.remove('active');
            document.querySelector('.mobile-menu-btn').classList.remove('active');
        });
    });
    
    // Reset and prepare typing animation
    typingElement.style.animation = 'none';
    typingElement.style.width = '0';
    typingElement.style.borderRightColor = isLight ? '#121212' : 'white';
    
    // Speed up loading and animations
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            
            // Start typing animation
            typingElement.style.animation = 'typing 1.5s steps(30, end) forwards';
            
            // After typing, start blinking cursor
            setTimeout(() => {
                typingElement.style.animation = isLight ? 
                    'blink-caret-light 0.75s step-end infinite' : 
                    'blink-caret-dark 0.75s step-end infinite';
                typingElement.style.width = '100%';
            }, 1600);
            
            // Check if we start in light mode
            if (isLight) {
                showMemeBubble();
            }
        }, 600);
    }, 1000);
    
    // Add debug click to force show meme for testing
    themeButton.addEventListener('dblclick', function(e) {
        console.log('Debug: Force showing meme bubble');
        showMemeBubble();
    });
});