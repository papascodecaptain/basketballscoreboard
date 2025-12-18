
let countEl = document.getElementById("score")
let countEla = document.getElementById("scorea")
let count = 0 

function plus1(){
    count += 1 
    countEl.textContent = count
}



function plus2(){
    count += 2 
    countEl.textContent = count
}


function plus3(){
    count += 3 
    countEl.textContent = count
}


function reset(){
    count = 0
    countEl.textContent = count
}


function plus1a(){
    count += 1 
    countEla.textContent = count
}



function plus2a(){
    count += 2 
    countEla.textContent = count
}


function plus3a(){
    count += 3 
    countEla.textContent = count
}


function reseta(){
    count = 0
    countEla.textContent = count
}


function goToNewPage() {
    window.location.href = "players.html"; // Redirects to a local file
}


function goToPlay() {
    window.location.href = "main.html"; // Redirects to a local file
}