//sections & buttons
let landingPage = document.querySelector(".landing");
let gamePage = document.querySelector(".game");
let resultPage = document.querySelector(".result");
let selectionBtn = document.querySelector(".selection");
let startBtn = document.querySelector(".start");
let replayBtn = document.querySelector(".replay");
let messageNote = document.querySelector(".message");
let walkingNote = document.querySelector(".walkthrough");
let outcome = document.querySelector(".outcome");
let controlSection = document.querySelector(".control-values")

//display none to other sections
gamePage.style.display = "none";
controlSection.style.display = "none";
resultPage.style.display = "none";


//lives counter
let lives = document.querySelector(".lives span");
let remaining = 5;

//button array
let buttonSelection = ["Progress", "Regress"]

//image array
let imageStage = [
    {
        img: "busstop.jpg",
        text: "Left the home to reach the bus stop",
        regtext: "You missed the bus! try again to catch another bus"
    },
    {
        img: "schoolbus.jpeg",
        text: "Bus arrived! board bus and head to school",
        regtext: "Still in the bus! You are getting late for the school"
    },
    {
        img: "school.jpg",
        text: "Finally! Reached school",
    }

]

//starting the game:
startBtn.addEventListener("click", () => {
    gamePage.style.display = "flex";
    controlSection.style.display = "flex";
    landingPage.style.display = "none";
})
let i = -1; //counter for image

//displaying the selection options
let fluctuation = setInterval(() => {
    let randomSelect = Math.floor(Math.random() * buttonSelection.length);
    selectionBtn.textContent = buttonSelection[randomSelect];
}, 100)

//on selecting the options
selectionBtn.addEventListener("click", () => {
    walkingNote.style.display = "none";
    //assigning -1 value for stop and restart facility of button
    if (fluctuation > -1) {
        clearInterval(fluctuation);
        messageNote.style.display = "block";
        messageNote.textContent = "Click the button again for options"
        fluctuation = -1; //assigning value to fluctuation

        //if progress is selected
        if (selectionBtn.textContent == "Progress") {
            i++; //increment
            console.log("i value success : " + i);
            gamePage.style.backgroundImage = `url('${imageStage[i].img}')`; //changing to next image
            console.log(gamePage.style.backgroundImage)
            walkingNote.style.display = "block";
            walkingNote.textContent = imageStage[i].text; //showing text associated with success
            console.log(imageStage[i]);
            //when player reaches last image result page is displayed with a delay of 2 seconds
            if (i + 1 === (imageStage.length)) {
                messageNote.style.display = "none";
                selectionBtn.disabled = true;
                setTimeout(() => {
                    resultPage.style.display = "flex";
                    gamePage.style.display = "none";
                    walkingNote.style.display = "none";
                    controlSection.style.display = "none";
                }, 2000);
            }
        }
        //if regress is selected
        if (selectionBtn.textContent == "Regress") {
            remaining--; //decrement in lives
            i--; //decrement in image index
            console.log("i value failure : " + i);
            lives.textContent = remaining;
            //if image index is either 0 or more than it previous image is switched
            if (i > 0 || i == 0) {
                gamePage.style.backgroundImage = `url('${imageStage[i].img}')`; //displaying previous image
                walkingNote.style.display = "block";
                walkingNote.textContent = imageStage[i].regtext; //showing text associated with failure
                console.log("remaining : " + remaining);
                console.log("image index: " + imageStage[i])
            }
            //if index is negative then displaying the default image
            if (i < 0) {
                gamePage.style.backgroundImage = "url(home.jpeg)";
                walkingNote.style.display = "block";
                walkingNote.textContent = "Back to home! Get up sleeping brat and go to the bus stop!";
                i = -1; //reseting the incrementer
                console.log("i reset : " + i);
            }
            //when all lives are exhausted
            if (remaining === 0) {
                selectionBtn.disabled = true;
                setTimeout(() => {
                    resultPage.style.display = "flex";
                    controlSection.style.display = "none";
                    gamePage.style.display = "none";
                    walkingNote.style.display = "none";
                    outcome.innerHTML = `Game Over! All lives are exhausted.<br>
                    You didn't reach the school. &#128128;`;
                }, 2000);
            }
        }
    } else {
        messageNote.style.display = "none";
        messageNote.textContent = "";
        fluctuation = setInterval(() => {
            let randomSelect = Math.floor(Math.random() * buttonSelection.length);
            selectionBtn.textContent = buttonSelection[randomSelect];
        }, 100)
    }
})

//replay button
replayBtn.addEventListener('click', () => {
    window.location.reload();
})
