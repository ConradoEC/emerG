let currentStep = 0;

function updateProgress() {
    
    const bubbles = document.querySelectorAll('.signup-container:nth-child(' + (currentStep + 1) + ') .progress-bubble');

    document.querySelectorAll('.progress-bubble').forEach(bubble => {
        bubble.classList.remove('active');
    });

    if (bubbles[currentStep]) {
        bubbles[currentStep].classList.add('active');
    }
}

const nextButtons = document.querySelectorAll('.next-btn');
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
       
        currentStep++;
        updateVisibility();
        updateProgress();
    });
});

const backButtons = document.querySelectorAll('.back-btn');
backButtons.forEach(button => {
    button.addEventListener('click', () => {
     
        currentStep--;
        updateVisibility();
        updateProgress();
    });
});

function updateVisibility() {
    const signupContainers = document.querySelectorAll('.signup-container');
    signupContainers.forEach((container, index) => {
        container.style.display = index === currentStep ? 'flex' : 'none';
    });
}

updateProgress();
updateVisibility();