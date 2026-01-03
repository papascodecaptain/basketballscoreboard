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
    // 1. Get values from the inputs in players.html
    const t1 = document.getElementById("team1Input").value;
    const t2 = document.getElementById("team2Input").value;

    // 2. Save names to memory so main.html can find them
    localStorage.setItem("team1Name", t1 || "HOME");
    localStorage.setItem("team2Name", t2 || "AWAY");

    // 3. Now move to the game page
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

    screen.style.display = "flex"; // Show the overlay
}

function triggerPop(element) {
    element.classList.remove("pop-animation"); // Reset the animation
    void element.offsetWidth; // This is a "magic" line that forces the browser to restart the animation
    element.classList.add("pop-animation");
}