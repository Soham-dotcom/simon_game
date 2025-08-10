let gameSeq = [];
let userSeq = [];
let colors = ["red", "blue", "teal", "orange"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(!started) {
        console.log("Game started");
        started = true;

        levelup();
    }
})

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = "Level " + level;
    
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = colors[randomIdx];
    gameSeq.push(randomColor);
    console.log(gameSeq);
    let randomButton = document.querySelector(`.${randomColor}`);
    console.log(randomButton);
    btnFlash(randomButton);
}

function btnFlash(button) {
    button.classList.add("flash");
    setTimeout(function() {
        button.classList.remove("flash");
    }, 400);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup, 1000);
        }
    }else{
        h2.innerHTML = `Game Over!, your score is <b>${level}</b> <br> Press any key to start the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);
        reset();
    }
}

function btnPressed() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPressed);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
