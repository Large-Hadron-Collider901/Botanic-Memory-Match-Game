// Here is our array of objects consisting of image and name pairs
// We will use the image names when we are comparing images that were clicked in order to check for a match
let cardArray = [
    { name: "dahlia", img: "assets/dahlia.jpg" },
    { name: "dahlia", img: "assets/dahlia.jpg" },
    { name: "echinacea", img: "assets/echinacea.jpg" },
    { name: "echinacea", img: "assets/echinacea.jpg" },
    { name: "hibiscus", img: "assets/hibiscus.jpg" },
    { name: "hibiscus", img: "assets/hibiscus.jpg" },
    { name: "lilac", img: "assets/lilac.jpg" },
    { name: "lilac", img: "assets/lilac.jpg" },
    { name: "maypop", img: "assets/maypop.jpg" },
    { name: "maypop", img: "assets/maypop.jpg" },
    { name: "magnolia", img: "assets/magnolia.jpg" },
    { name: "magnolia", img: "assets/magnolia.jpg" },
];

// This is were we define variables and get DOM element we are passing data to
let grid = document.querySelector(".grid");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs; // Here is the variable where we will hold the images we create
let cardsId = []; // Array for containing cards clicked on
let cardsSelected = []; // Additional array for storing cards clicked on
let cardsWon = 0; // Records wins
let clicks = 0; // Records number of clicks

document.addEventListener("DOMContentLoaded", function () {
    //define functions
    createBoard(grid, cardArray); // creates the game board with cards
    arrangeCard(); // shuffles the cards
    playAgain.addEventListener("click", replay);

    //add a click function for images

    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(
        (img) => img.addEventListener("click", flipCard) // for each image, listen for clicks!
    );
});
//createBoard function
function createBoard(grid, array) {
    popup.style.display = "none"; // removes the popup
    array.forEach((arr, index) => {
        // loops through the image array
        let img = document.createElement("img"); // creates an img element
        img.setAttribute("src", "assets/card.jpg"); // sets the src attribute to display img
        img.setAttribute("data-id", index); // adds data attribute
        grid.appendChild(img);
    });
}

// arrangeCard function

function arrangeCard() {
    // shuffles the deck
    cardArray.sort(() => 0.5 - Math.random());
}
// flip Card function
function flipCard() {
    // listens for clicks
    let selected = this.dataset.id; // gets the id of img clicked to a variable selected
    cardsSelected.push(cardArray[selected].name); // use the variable to get object clicked and then push the name into the cardsSelected array
    cardsId.push(selected); // pushes the id of the image clicked into the cardsID array
    this.classList.add("flip"); // add a flip class to the img clicked to create a flip effect
    this.setAttribute("src", cardArray[selected].img); // change the img to reveal the img beneath
    if (cardsId.length === 2) {
        // repeat process when the second image is clicked and then we will check to see if they are the same image
        setTimeout(checkForMatch, 500);
    }
}
// checkForMatch function

function checkForMatch() {
    let imgs = document.querySelectorAll("img"); // gets all the images on the game board
    let firstCard = cardsId[0];
    let secondCard = cardsId[1]; // gets the ids of the images clicked from the cardsId array
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
        // checks if the first value in cardsArray is equal to the second and if it is not the same image that was clicked twice.
        alert("Great job, you found a match!");
        cardsWon += 1;
        scoreBoard.innerHTML = cardsWon; // if the images match adds one the the scoreboard
        setTimeout(checkWon, 500);
    } else {
        imgs[firstCard].setAttribute("src", "assets/card.jpg");
        imgs[secondCard].setAttribute("src", "assets/card.jpg");
        alert("Sorry, please try again!");
        imgs[firstCard].classList.remove("flip");
        imgs[secondCard].classList.remove("flip"); // if the images do not match, removes the flip class and the cards are turned over
    }
    cardsSelected = []; // clears array
    cardsId = []; // clears array
    clicks += 1; // adds 1 to the number of clicks
    clickBoard.innerHTML = clicks;
}

function checkWon() {
    if (cardsWon == cardArray.length / 2) {
        // checks if the value of cardsWon is equal to the deck array divided by 2
        alert("You Win!!!");
        setTimeout(() => (popup.style.display = "flex"), 300);
    }
}
// The replay function

function replay() {
    arrangeCard();
    grid.innerHTML = ""; // empties the game board
    createBoard(grid, cardArray); // creates new game board
    cardsWon = 0; // resets the score
    clicks = 0; // resets number of clicks
    clickBoard.innerHTML = 0;
    scoreBoard.innerHTML = 0;
    popup.style.display = "none";
}
