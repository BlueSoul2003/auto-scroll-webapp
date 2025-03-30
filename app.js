document.addEventListener('DOMContentLoaded', function() {
    const speedInput = document.getElementById('speed');
    const speedValue = document.getElementById('speedValue');
    const startButton = document.getElementById('startScroll');
    const stopButton = document.getElementById('stopScroll');
    const status = document.getElementById('status');
    
    let scrollInterval = null;
    let isScrolling = false;

    // Update speed value display
    speedInput.addEventListener('input', function() {
        speedValue.textContent = this.value;
    });

    // Convert speed (1-10) to scroll amount (1-50 pixels)
    function speedToScrollAmount(speed) {
        return speed * 5;
    }

    function startScrolling(speed) {
        if (scrollInterval) return;
        
        const scrollAmount = speedToScrollAmount(speed);
        
        scrollInterval = setInterval(() => {
            window.scrollBy({
                top: scrollAmount,
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

    // Start scrolling
    startButton.addEventListener('click', function() {
        const speed = parseInt(speedInput.value);
        startScrolling(speed);
        isScrolling = true;
        
        startButton.disabled = true;
        stopButton.disabled = false;
        status.textContent = 'Scrolling...';
    });

    // Stop scrolling
    stopButton.addEventListener('click', function() {
        stopScrolling();
        isScrolling = false;
        
        startButton.disabled = false;
        stopButton.disabled = true;
        status.textContent = 'Stopped';
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isScrolling) {
            stopScrolling();
            isScrolling = false;
            startButton.disabled = false;
            stopButton.disabled = true;
            status.textContent = 'Stopped (tab inactive)';
        }
    });

    // Handle page unload
    window.addEventListener('beforeunload', function() {
        stopScrolling();
    });
}); 