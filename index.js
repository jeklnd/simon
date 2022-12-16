let computerSequence = [];
let userSequence = [];
let buttonColors = ["red", "yellow", "blue", "green"];
let level = 0;


function levelUp() {
    level++;
    $("h1").html(`Level ${level}`)
    return level
}

function addNewColor() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    computerSequence.push(randomColor);
    console.log(computerSequence)
    return randomColor
    
}

function checkUserSequence(lastColorPressed) {
    // for (let i = userSequence.length - 1; i < userSequence.length; i++) {
    if (userSequence[lastColorPressed] === computerSequence[lastColorPressed]) {
        console.log("success")
    } else {
        console.log("wrong");
        restartGame()
        return
    } 
    
    if (userSequence.length === computerSequence.length) {
        setTimeout(gameplay, 1000);
        userSequence = [];
    }
}

function restartGame() {
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200)
    $("h1").html(`Game Over. `)
    $("h1").after(`<h2>Press any key to restart</h2>`)
    computerSequence = []
    userSequence = []
    level = 0
}

// start game
document.addEventListener("keydown", function(event) {
    if (computerSequence.length === 0){
        $("h2").remove()
        gameplay()
    }
})

// gameplay 
function gameplay() {

    levelUp()
    addNewColor()

    for (let i = computerSequence.length - 1; i < computerSequence.length; i++) {
        
        // highlight
        $(`div#${computerSequence[i]}`).addClass("pressed");
        
        setTimeout(function(){
            $(`div#${computerSequence[i]}`).removeClass("pressed");
        }, 100);    
    
        // play sound
        let theColor = computerSequence[i];
        let theSound = new Audio(`sounds/${computerSequence[i]}.mp3`);
        theSound.play();
    }
}

// generate user sequence
$("div.btn").on("click", function(event) {
    if (computerSequence.length != 0) {
        buttonID = event.target.id
        userSequence.push(buttonID)
        console.log(userSequence)

        // highlight
        $(`div#${buttonID}`).addClass("pressed");
        setTimeout(function() {
            $(`div#${buttonID}`).removeClass("pressed");
        }, 100);

        // play sound
        let theSound = new Audio(`sounds/${buttonID}.mp3`);
        theSound.play();

        // check user clicks versus computer sequence
        checkUserSequence(userSequence.length - 1)
    }
    })
