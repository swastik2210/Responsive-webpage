// Collapsible Menu Functionality
const collapseBtn = document.getElementById('collapse-btn');
const leftMenu = document.querySelector('.left-menu');
const mainContent = document.querySelector('.main-content');
const rightPanel = document.querySelector('.right-panel');

let isCollapsed = false;

// Menu collapse functionality
collapseBtn.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
        leftMenu.style.width = '60px';
        collapseBtn.textContent = '→';
        mainContent.style.marginLeft = '0';
        // Hide menu items with animation
        document.querySelector('.menu-list').style.opacity = '0';
    } else {
        leftMenu.style.width = '250px';
        collapseBtn.textContent = '←';
        mainContent.style.marginLeft = '0';
        // Show menu items with animation
        document.querySelector('.menu-list').style.opacity = '1';
    }
});

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // Add your search implementation here
        searchInput.value = ''; // Clear the search input
    }
}

// Mobile Menu Handling
function handleMobileView() {
    if (window.innerWidth <= 600) {
        leftMenu.style.display = 'none';
        rightPanel.style.display = 'none';
        mainContent.style.margin = '0';
    } else {
        if (!isCollapsed) {
            leftMenu.style.display = 'block';
        }
        rightPanel.style.display = 'block';
    }
}

// Debounced resize handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedHandleMobileView = debounce(handleMobileView, 250);

// Event Listeners
window.addEventListener('resize', debouncedHandleMobileView);
window.addEventListener('load', handleMobileView);

// Add scroll-based animations for dishes
const dishes = document.querySelectorAll('.dish');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const dishObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

dishes.forEach(dish => {
    dish.style.opacity = '0';
    dish.style.transform = 'translateY(20px)';
    dish.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    dishObserver.observe(dish);
});

// Add rating functionality
const ratings = document.querySelectorAll('.rating');
ratings.forEach(rating => {
    rating.addEventListener('mouseover', () => {
        rating.style.cursor = 'pointer';
    });
    
    rating.addEventListener('click', () => {
        alert('Thank you for rating this dish!');
    });
});

// Handle page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Fade in main content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 100);
    
    // Initialize tooltips for dishes
    const dishImages = document.querySelectorAll('.dish img');
    dishImages.forEach(img => {
        img.addEventListener('mouseover', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Click for recipe details';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            
            document.body.appendChild(tooltip);
            
            const rect = img.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
            
            img.addEventListener('mouseout', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could implement a more sophisticated error handling system here
});