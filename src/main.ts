import { updateWinDisplay } from "./gameUtils";
import "./style.scss";
import "./variables.scss";

// HTML element captures
// Global variables
// DOM manipulation direct on document (eventlisteners)

// importing landing page elements
const startGameButton =
    document.querySelector<HTMLButtonElement>(".start-game-btn");
const landingContent = document.querySelector<HTMLDivElement>(
    ".landing-screen-all"
);
const gameContent = document.querySelector<HTMLDivElement>(".game-content");
const endScreenContent = document.querySelector<HTMLDivElement>(
    ".end-screen-content"
);
const endScreenScore =
    document.querySelector<HTMLHeadingElement>(".end-screen-score");
//
// other dom elements
const orderDisplay = document.querySelector(".customer-order-display__order");
const winDisplay = document.getElementById("winDisplay") as HTMLElement;
const pizzaBinBtn = document.querySelector<HTMLButtonElement>(".bin-pizza-btn");
const resetGameBtn =
    document.querySelector<HTMLButtonElement>(".reset-game-btn");
const resetGameBtnEnd = document.querySelector<HTMLButtonElement>(
    ".reset-game-btn-end"
);
//
// buttons for ingredients
const ingredientBtns = document.querySelectorAll<HTMLButtonElement>(
    ".ingredient-buttons"
);
const baseBtn = document.getElementById("baseButton") as HTMLButtonElement;
const tomatoBtn = document.getElementById("tomatoButton") as HTMLButtonElement;
const pestoBtn = document.getElementById("pestoBtn") as HTMLButtonElement;
const bbqBtn = document.getElementById("bbqbtn");
const cheeseBtn = document.getElementById("cheeseButton") as HTMLButtonElement;
const mushroomBtn = document.getElementById(
    "mushroomButton"
) as HTMLButtonElement;
const tomatoSlicesBtn = document.getElementById(
    "tomatoSlicesButton"
) as HTMLButtonElement;
const onionBtn = document.getElementById("onionButton") as HTMLButtonElement;
const pineappleImageBtn = document.getElementById(
    "pineappleButton"
) as HTMLButtonElement;
const ovenBtn = document.getElementById("ovenButton");
//

//
// importing pizza loading images
//
const pizzaLoadingImages = document.querySelectorAll(".pizza-loading-images");
const baseImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__base"
);
const tomatoImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__tomato-sauce"
);

const pestoImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__pesto"
);
const bbqImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__bbq"
);
const cheeseImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__cheese"
);
const mushroomImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__mushroom"
);
const tomatoSlicesImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__sliced-tomato"
);
const onionImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__onion"
);

const pineappleImage = document.querySelector<HTMLImageElement>(
    ".pizza-loading-images__pineapple"
);
//
//
let winCount: number = 0;
let levelNumber: number = 1;
let totalCorrectPizzas: number = 0;
// let pizzaStreak: number = 0;
//

// Need to add checks here for checking is variables are empty or not
if (
    !onionBtn ||
    !startGameButton ||
    !orderDisplay ||
    !bbqBtn ||
    !resetGameBtn
) {
    throw new Error("Variable empty");
}
//
//
// function to change display of any html element
function setElementVisibility(element: any, display: boolean) {
    element.style.display = display ? "block" : "none";
}
// start game functionality
function startGame() {
    setElementVisibility(landingContent, false);
    setElementVisibility(gameContent, true);
    generateOrder(levelNumber);
    updateCustomerOrder();
    startCountdown();
    updateWinDisplay(winDisplay, levelNumber, winCount);
}

startGameButton.addEventListener("click", startGame);
//
// Bin pizza button
function binPizzaButton() {
    clickedIngredientsArray = [];
    pizzaLoadingImages.forEach((img) => {
        setElementVisibility(img, false);
    });
}
document
    .querySelector<HTMLButtonElement>(".bin-pizza-btn")
    ?.addEventListener("click", binPizzaButton);
// gameplay content
//
// generating customer order
const toppingsList: string[] = [
    "Cheese",
    "Mushroom",
    "Tomato slices",
    "Pineapple",
    "Onion",
];
const sauceList: string[] = ["Tomato sauce", "Pesto sauce", "BBQ sauce"];
// creating a function to shuffle array using fisher yates
// goes through array starting from last index and swaps random elements with the current [i]. copies array so it is not mutated
function shuffle(array: string[]): string[] {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
}

// customerOrder globally accessible
let customerOrder: string[] = [];

// generate order accepts numberoftoppings so i can make the game harder later on. always has a pizza base
function generateOrder(numberOfToppings: number) {
    const shuffledToppings = shuffle(toppingsList);
    const shuffledSauces = shuffle(sauceList);
    const slicedToppings = shuffledToppings.slice(0, numberOfToppings);
    const slicedSauces = shuffledSauces.slice(0, 1);
    slicedSauces.unshift("Base");
    slicedSauces.push(...slicedToppings);
    customerOrder = slicedSauces;
    console.log("Customer order is: " + customerOrder);
}
//
//
let clickedIngredientsArray: string[] = [];

function ingredientClickedSwitch(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    if (!clickedIngredientsArray.includes(target.innerText)) {
        switch (target) {
            case baseBtn:
                setElementVisibility(baseImage, true);
                clickedIngredientsArray.push("Base");
                break;
            case tomatoBtn:
                setElementVisibility(tomatoImage, true);
                clickedIngredientsArray.push("Tomato sauce");
                break;
            case pestoBtn:
                setElementVisibility(pestoImage, true);
                clickedIngredientsArray.push("Pesto sauce");
                break;
            case bbqBtn:
                setElementVisibility(bbqImage, true);
                clickedIngredientsArray.push("BBQ sauce");
                break;
            case cheeseBtn:
                setElementVisibility(cheeseImage, true);
                clickedIngredientsArray.push("Cheese");
                break;
            case mushroomBtn:
                setElementVisibility(mushroomImage, true);
                clickedIngredientsArray.push("Mushroom");
                break;
            case pineappleImageBtn:
                setElementVisibility(pineappleImage, true);
                clickedIngredientsArray.push("Pineapple");
                break;
            case tomatoSlicesBtn:
                setElementVisibility(tomatoSlicesImage, true);
                clickedIngredientsArray.push("Tomato slices");
                break;
            case onionBtn:
                setElementVisibility(onionImage, true);
                clickedIngredientsArray.push("Onion");
                break;
            default:
                console.log("Switch error");
        }
    }
}
//
ingredientBtns.forEach((btn) => {
    btn.addEventListener("click", ingredientClickedSwitch);
});
//

ovenBtn?.addEventListener("click", () => {
    console.log(clickedIngredientsArray);

    checkOrder();
});
// add event listener to all ingredients and apply clickedIngredients function

// checking if clicked ingredient array matches generated customer order array
//
function checkOrder() {
    let correctIngredients = 0;
    console.log(clickedIngredientsArray);
    console.log(customerOrder);
    for (let i = 0; i < clickedIngredientsArray.length; i++) {
        if (customerOrder.includes(clickedIngredientsArray[i])) {
            correctIngredients++;
        }
    }
    if (
        correctIngredients === clickedIngredientsArray.length &&
        clickedIngredientsArray.length == customerOrder.length
    ) {
        console.log("correct");
        winCount++;
        totalCorrectPizzas++;
        updateWinDisplay(winDisplay, levelNumber, winCount);
        levelUp();
    } else if (clickedIngredientsArray.length < customerOrder.length) {
        console.log("Not enough toppings");
        clickedIngredientsArray = [];
    } else {
        console.log("Wrong toppings!");
    }
    clickedIngredientsArray = [];
    generateOrder(levelNumber);
    updateCustomerOrder();
    binPizzaButton();
    console.log(levelNumber, winCount);
}

//
//Win display
//function updateWinDisplay() {
//  winDisplay.innerHTML = `Level ${levelNumber}, Pizzas made in this level: ${winCount}`;
//}
//
// Customer order display
function updateCustomerOrder() {
    let customerToppings = [...customerOrder];
    customerToppings.shift();
    orderDisplay!.textContent = `${customerToppings.join(" + ")}`;
}

// pizzabinbutton
function binPizza() {
    clickedIngredientsArray = [];
    pizzaLoadingImages.forEach((img) => {
        setElementVisibility(img, false);
    });
}
pizzaBinBtn!.addEventListener("click", binPizza);
console.log(winCount);

// reset game btn
function resetGameFunction() {
    setElementVisibility(gameContent, false);
    setElementVisibility(landingContent, true);
    setElementVisibility(endScreenContent, false);
    binPizza();
    winCount = 0;
    levelNumber = 1;
    totalCorrectPizzas = 0;
}
resetGameBtn.addEventListener("click", resetGameFunction);

// function that increases difficulty if win count is over x in a level (set to just 2 for now)
function levelUp() {
    if (levelNumber == 3 && winCount == 2) {
        console.log("Winner!!");
        setElementVisibility(gameContent, false);
    } else if (winCount >= 2) {
        levelNumber++;
        winCount = 0;
        updateWinDisplay(winDisplay, levelNumber, winCount);
    }
}
//
const countdownDisplay = document.querySelector<HTMLParagraphElement>(
    ".countdown-timer-div"
);
// countdown timer
let countdown: any;
let timeLeft: number = 15;

function startCountdown() {
    // prevents from duplication issues- resets from when countdown begins
    clearInterval(countdown);
    timeLeft = 15;
    countdownDisplay!.textContent = timeLeft + " seconds left!";
    countdown = setInterval(() => {
        timeLeft--;
        countdownDisplay!.textContent = timeLeft + " seconds left!";
        if (timeLeft <= 0) {
            clearInterval(countdown);
            setElementVisibility(gameContent, false);
            setElementVisibility(endScreenContent, true);
            setElementVisibility(startGameButton, true);
            endScreenScore!.innerHTML =
                "Time's up! You scored " + totalCorrectPizzas + " points";
        }
    }, 1000);
}

resetGameBtnEnd?.addEventListener("click", resetGameFunction);
