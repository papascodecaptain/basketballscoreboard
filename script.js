//Variables for Home and Away so scores don't overlap
let homeScore = 0;
let awayScore = 0;

let homeEl = document.getElementById("score");
let awayEl = document.getElementById("scorea");

// --- DATA PERSISTENCE: RUNS ON MAIN.HTML LOAD ---
// This checks if we are on the scoreboard page and updates names
if (document.getElementById("home-display")) {
    const savedT1 = localStorage.getItem("team1Name");
    const savedT2 = localStorage.getItem("team2Name");
    
    if (savedT1) document.getElementById("home-display").textContent = savedT1.toUpperCase();
    if (savedT2) document.getElementById("away-display").textContent = savedT2.toUpperCase();
}

// --- FIXED: GO TO PLAY FUNCTION ---
function goToPlay() {
    // 1. Get values from the inputs
    const t1 = document.getElementById("team1Input").value.trim();
    const t2 = document.getElementById("team2Input").value.trim();
    
    // ADD THIS LINE: Get the selected time from the dropdown
    const selectedTime = document.getElementById("timeInput").value;

    if (t1 === "" || t2 === "") {
        alert("Please enter names for both teams!");
        return; 
    }
    
    // OPTIONAL: Check if a time was actually selected
    if (selectedTime === " ") {
        alert("Please select a game duration!");
        return;
    }

    // 2. Save names AND the time to memory
    localStorage.setItem("team1Name", t1 || "HOME");
    localStorage.setItem("team2Name", t2 || "AWAY");
    
    // ADD THIS LINE: Save the game time
    localStorage.setItem("gameTime", selectedTime);

    // 3. Move to the game page
    window.location.href = "main.html";
}

function goToPlayers(){
    window.location.href ="players.html"
}

// --- SCORE FUNCTIONS ---
function handleScore(team, points) {
    if (team === 'home') {
        // If points is 0, it's a reset. Otherwise, add the points.
        homeScore = (points === 0) ? 0 : homeScore + points;
        homeEl.textContent = homeScore;
        triggerPop(homeEl); // We will build this next!
    } else {
        awayScore = (points === 0) ? 0 : awayScore + points;
        awayEl.textContent = awayScore;
        triggerPop(awayEl);
    }
}

// Show the overlay
function goToNewPage() {
    const t1Name = localStorage.getItem("team1Name") || "HOME";
    const t2Name = localStorage.getItem("team2Name") || "AWAY";
    const screen = document.getElementById("winner-screen");
    const text = document.getElementById("victory-text");

    if (homeScore > awayScore) {
        text.textContent = `🏆 ${t1Name.toUpperCase()} WINS!`;
    } else if (awayScore > homeScore) {
        text.textContent = `🏆 ${t2Name.toUpperCase()} WINS!`;
    } else {
        text.textContent = "ITS A TIE! 🤝";
    }

    screen.style.display = "flex"; // This makes it visible
}

// Function for the 'New Game' button
function resetGame() {
    homeScore = 0;
    awayScore = 0;
    homeEl.textContent = 0;
    awayEl.textContent = 0;
    document.getElementById("winner-screen").style.display = "none"; // Hide overlay
}

// Function for the 'Exit' button
function exitToMenu() {
    window.location.href = "load.html";
}

function triggerPop(element) {
    element.classList.remove("pop-animation"); // Reset the animation
    void element.offsetWidth; // This is a "magic" line that forces the browser to restart the animation
    element.classList.add("pop-animation");
}

let timer;
let timeLeft;
let isTimerRunning = false;

// 1. Setup the clock based on user choice from players.html
if (document.getElementById("timer-display")) {
    const minutes = parseInt(localStorage.getItem("gameTime")) || 10;
    timeLeft = minutes * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById("timer-display").textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
}

// 2. The Smart Button Logic
function handleTimerButton() {
    const btn = document.getElementById("endGame");

    // If time is up, the button acts as the FINAL "END GAME" trigger
    if (timeLeft <= 0) {
        goToNewPage();
        return;
    }

    if (isTimerRunning) {
        // PAUSE
        clearInterval(timer);
        btn.textContent = "RESUME GAME";
        btn.style.backgroundColor = "transparent"; 
    } else {
        // START
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                btn.textContent = "FINISH GAME"; // Change text when done
                btn.style.backgroundColor = "#c43a3abd"; // Turn red to signal end
            }
        }, 1000);
        btn.textContent = "PAUSE GAME";
    }
    isTimerRunning = !isTimerRunning;
}