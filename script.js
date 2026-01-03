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
    
    if (savedT1) document.getElementById("home-display").textContent = savedT1;
    if (savedT2) document.getElementById("away-display").textContent = savedT2;
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



// --- SCORE FUNCTIONS ---
function plus1() { homeScore += 1; homeEl.textContent = homeScore; }
function plus2() { homeScore += 2; homeEl.textContent = homeScore; }
function plus3() { homeScore += 3; homeEl.textContent = homeScore; }
function reset() { homeScore = 0; homeEl.textContent = homeScore; }

function plus1a() { awayScore += 1; awayEl.textContent = awayScore; }
function plus2a() { awayScore += 2; awayEl.textContent = awayScore; }
function plus3a() { awayScore += 3; awayEl.textContent = awayScore; }
function reseta() { awayScore = 0; awayEl.textContent = awayScore; }

// --- FIXED: END GAME LOGIC ---
function goToNewPage() {
    const t1Name = localStorage.getItem("team1Name") || "HOME";
    const t2Name = localStorage.getItem("team2Name") || "AWAY";
    let message = "";

    if (homeScore > awayScore) {
        message = `🏆 ${t1Name} WINS! ${homeScore} to ${awayScore}`;
    } else if (awayScore > homeScore) {
        message = `🏆 ${t2Name} WINS! ${awayScore} to ${homeScore}`;
    } else {
        message = `🤝 IT'S A TIE! ${homeScore} to ${awayScore}`;
    }

    alert(message); // Show pop-up first
    window.location.href = "players.html"; // Then redirect
}