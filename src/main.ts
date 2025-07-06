import "./style.scss";
import "./variables.scss";

const startGameButton = document.querySelector(
    ".start-game-btn"
) as HTMLButtonElement;
const landingContent = document.querySelector(
    ".landing-screen"
) as HTMLDivElement;
const gameContent = document.querySelector(".game-content") as HTMLDivElement;
// function to change display of any html element
function setElementVisibility(element, display: boolean) {
    element.style.display = display ? "block" : "none";
}

function startGame() {
    setElementVisibility(landingContent, false);
    setElementVisibility(gameContent, true);
    generateOrder(2);
}

startGameButton.addEventListener("click", startGame);

// gameplay content
// ..
// generating customer order
const toppingsList: string[] = [
    "tomato sauce",
    "cheese",
    "mushroom",
    "sliced tomato",
];

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
    const slicedToppings = shuffledToppings.slice(0, numberOfToppings);
    slicedToppings.push("base");
    customerOrder = slicedToppings;
    console.log("Customer order is: " + customerOrder);
}

let clickedIngredientsArray: string[] = [];

// function captures which ingredients are clicked by player
function clickedIngredients(topping: string) {
    if (!clickedIngredientsArray.includes(topping)) {
        clickedIngredientsArray.push(topping);
        console.log(`Clicked ingredients array is ${clickedIngredientsArray}`);
    }
}

// add event listener to all ingredients and apply clickedIngredients function

// checking if clicked ingredient array matches generated customer order array
let winCount: number = 0;
//
function checkOrder() {
    let correctIngredients = 0;
    for (let i = 0; i < clickedIngredientsArray.length; i++) {
        if (customerOrder.includes(clickedIngredientsArray[i])) {
            console.log(correctIngredients);
            correctIngredients++;
            console.log(correctIngredients);
        }
    }
    if (correctIngredients === clickedIngredientsArray.length) {
        console.log("correct");
        winCount++;
    } else {
        console.log("wrong toppings!");
    }
}
