// --- Game Variables ---
let secretNumber; // The number the player needs to guess
let score;        // Current score (number of attempts)
let highScore = 0; // Stores the highest score achieved
const maxAttempts = 10; // Maximum attempts allowed in a game

// --- DOM Elements (Getting references to HTML elements) ---
const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const messageDisplay = document.getElementById('message');
const newGameBtn = document.getElementById('newGameBtn');

// --- Game Initialization Function ---
function initializeGame() {
    // Generate a random secret number between 1 and 100 (inclusive)
    secretNumber = Math.floor(Math.random() * 100) + 1;
    // console.log('Secret Number (for debugging):', secretNumber); // Keep this for testing, remove in final version

    score = maxAttempts; // Reset score to max attempts
    displayMessage('Start guessing...'); // Reset message display
    guessInput.value = ''; // Clear the input field
    guessInput.disabled = false; // Enable input
    checkBtn.disabled = false; // Enable check button
    newGameBtn.style.display = 'none'; // Hide new game button
    messageDisplay.style.color = '#3F51B5'; // Reset message color
    document.body.style.backgroundColor = 'initial'; // Reset background (from CSS)
}

// --- Helper Function to Display Messages ---
function displayMessage(msg) {
    messageDisplay.textContent = msg;
}

// --- Event Listener for "Check!" Button ---
checkBtn.addEventListener('click', function() {
    const guess = Number(guessInput.value); // Get guess from input and convert to number

    // Input Validation: Check if guess is valid
    if (guess === 0) { // Check for empty or 0 input
        displayMessage('No number entered!');
        messageDisplay.style.color = '#FFC107'; // Yellow for warning
    } else if (guess < 1 || guess > 100) {
        displayMessage('Guess must be between 1 and 100!');
        messageDisplay.style.color = '#FFC107'; // Yellow for warning
    } else if (isNaN(guess)) { // Check if input is not a number
        displayMessage('Please enter a valid number!');
        messageDisplay.style.color = '#FFC107'; // Yellow for warning
    }
    // Game Logic: Compare guess to secret number
    else {
        score--; // Decrement score for each valid guess

        if (guess === secretNumber) {
            displayMessage(`🎉 Correct! You guessed it in ${maxAttempts - score} tries!`);
            messageDisplay.style.color = '#4CAF50'; // Green for success
            document.body.style.backgroundColor = '#4CAF50'; // Change background on win
            guessInput.disabled = true; // Disable input on win
            checkBtn.disabled = true; // Disable check button on win
            newGameBtn.style.display = 'block'; // Show new game button

            // Update High Score
            if ((maxAttempts - score) < highScore || highScore === 0) { // Fewer tries mean better score
                highScore = (maxAttempts - score);
                // You could display high score somewhere if you add a span for it
                // document.getElementById('highScoreDisplay').textContent = highScore;
            }

        } else if (guess > secretNumber) {
            displayMessage('Too high! Try again.');
            messageDisplay.style.color = '#FF5722'; // Orange for too high
        } else if (guess < secretNumber) {
            displayMessage('Too low! Try again.');
            messageDisplay.style.color = '#2196F3'; // Blue for too low
        }

        // Check if game is over (no attempts left)
        if (score <= 0 && guess !== secretNumber) {
            displayMessage(`Game Over! My number was ${secretNumber}.`);
            messageDisplay.style.color = '#F44336'; // Red for game over
            document.body.style.backgroundColor = '#F44336'; // Change background on loss
            guessInput.disabled = true; // Disable input
            checkBtn.disabled = true; // Disable check button
            newGameBtn.style.display = 'block'; // Show new game button
        }
    }
});

// --- Event Listener for "New Game" Button ---
newGameBtn.addEventListener('click', initializeGame);

// --- Initial Game Setup on Page Load ---
initializeGame();