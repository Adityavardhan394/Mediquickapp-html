// Update user information in the dashboard
function updateUserInfo() {
    const userSession = localStorage.getItem('userSession');
    const guestSession = localStorage.getItem('guestSession');
    const userProfile = document.querySelector('.user-profile span');
    
    try {
        if (userSession) {
            const session = JSON.parse(userSession);
            userProfile.textContent = session.name;
        } else if (guestSession) {
            const session = JSON.parse(guestSession);
            userProfile.textContent = 'Guest';
        } else {
            // No valid session found, redirect to login
            window.location.href = '../auth/index.html';
        }
    } catch (error) {
        console.error('Error updating user info:', error);
        handleLogout();
    }
}

// Handle user logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        window.location.href = '../auth/index.html';
    }
}

// Navigate to different pages
function navigateTo(page) {
    window.location.href = page;
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    // Implement search logic here
    console.log('Searching for:', searchTerm);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Update user information
    updateUserInfo();

    // Add search event listener
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Check session validity
    checkSessionValidity();
});

// Check if the user session is still valid
function checkSessionValidity() {
    const userSession = localStorage.getItem('userSession');
    const guestSession = localStorage.getItem('guestSession');
    
    if (userSession || guestSession) {
        try {
            const session = userSession ? JSON.parse(userSession) : JSON.parse(guestSession);
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
            
            // Session expires after 24 hours
            if (hoursSinceLogin >= 24) {
                handleLogout();
            }
        } catch (error) {
            console.error('Session validation error:', error);
            handleLogout();
        }
    } else {
        // No session found
        window.location.href = '../auth/index.html';
    }
}

// Handle notifications
function handleNotifications() {
    // Implement notification logic here
    console.log('Notifications clicked');
}

// Add event listeners for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Notification button click handler
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', handleNotifications);
    }

    // Card click animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });
}); 