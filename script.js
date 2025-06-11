/**
 * Dynamic Typing Effect Script
 * This script creates a typing animation for a designated element on the page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Array of strings to be typed out
    const texts = [
        "Author",
        "AI Researcher",
        "Linux Programmer",
        "Technologist"
    ];

    // Configuration for the typing animation
    const typingSpeed = 100; // Time in ms between each character
    const deletingSpeed = 50;  // Time in ms for deleting
    const delayBetweenTexts = 2000; // Delay in ms after a text is fully typed

    // HTML element where the text will be displayed
    const typingTextElement = document.getElementById('typing-text');
    if (!typingTextElement) {
        console.error("Typing text element not found!");
        return;
    }

    let textIndex = 0; // Current index for the 'texts' array
    let charIndex = 0; // Current character index in the current text
    let isDeleting = false; // Flag to check if we are deleting text

    /**
     * The main function that drives the typing animation.
     * It's called recursively using setTimeout to create the animation loop.
     */
    function type() {
        const currentText = texts[textIndex];
        
        // Check if we are deleting or typing
        if (isDeleting) {
            // Remove a character
            charIndex--;
            typingTextElement.textContent = currentText.substring(0, charIndex);
        } else {
            // Add a character
            charIndex++;
            typingTextElement.textContent = currentText.substring(0, charIndex);
        }

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        // If the word is fully typed
        if (!isDeleting && charIndex === currentText.length) {
            delay = delayBetweenTexts; // Pause before starting to delete
            isDeleting = true;
        } 
        // If the word is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to the next word
            delay = typingSpeed * 2; // Short pause before typing the new word
        }

        // Call the function again after the calculated delay
        setTimeout(type, delay);
    }

    // Start the animation
    type();
});

