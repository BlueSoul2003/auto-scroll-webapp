document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startScroll');
    const stopButton = document.getElementById('stopScroll');
    const speedInput = document.getElementById('speed');
    const speedValue = document.getElementById('speedValue');
    const status = document.getElementById('status');

    // Update speed value display
    speedInput.addEventListener('input', function() {
        speedValue.textContent = this.value;
    });

    // Start scrolling
    startButton.addEventListener('click', async function() {
        const speed = parseInt(speedInput.value);
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        chrome.tabs.sendMessage(tab.id, {
            action: 'startScroll',
            speed: speed
        });

        startButton.disabled = true;
        stopButton.disabled = false;
        status.textContent = 'Scrolling...';
    });

    // Stop scrolling
    stopButton.addEventListener('click', async function() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        chrome.tabs.sendMessage(tab.id, {
            action: 'stopScroll'
        });

        startButton.disabled = false;
        stopButton.disabled = true;
        status.textContent = 'Stopped';
    });
}); 