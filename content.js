let scrollInterval = null;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startScroll') {
        startScrolling(request.speed);
    } else if (request.action === 'stopScroll') {
        stopScrolling();
    }
});

function startScrolling(speed) {
    if (scrollInterval) return;
    
    scrollInterval = setInterval(() => {
        window.scrollBy({
            top: speed,
            behavior: 'smooth'
        });

        // Stop scrolling if we've reached the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            stopScrolling();
        }
    }, 50);
}

function stopScrolling() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
} 