import "./style.scss";
import "./variables.scss";

// importing landing page elements
const startGameButton =
    document.querySelector<HTMLButtonElement>(".start-game-btn");
const landingContent =
    document.querySelector<HTMLDivElement>(".landing-screen");
const gameContent = document.querySelector<HTMLDivElement>(".game-content");
//
// other dom elements
const orderDisplay = document.querySelector(".customer-order-display");
const winDisplay = document.getElementById("winDisplay") as HTMLElement;
const pizzaBinBtn = document.querySelector<HTMLButtonElement>(".bin-pizza-btn");
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
//
console.log(JSON.parse(JSON.stringify(winDisplay)));
// Need to add checks here for checking is variables are empty or not
if (!onionBtn || !startGameButton || !orderDisplay || !bbqBtn) {
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
    generateOrder(1);
    updateCustomerOrder();
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
// ..
//
//Win display
function updateWinDisplay() {
    winDisplay.innerHTML = `Win count is: ${winCount}`;
}

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

// maybe another way to write this?
function registerClick(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    if (!clickedIngredientsArray.includes(target.innerText)) {
        clickedIngredientsArray.push(target.innerText);
        console.log(`Clicked ingredient array is ${clickedIngredientsArray}`);
    }
}
//
function ingredientClickedSwitch(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    switch (target) {
        case baseBtn:
            setElementVisibility(baseImage, true);
            break;
        case tomatoBtn:
            setElementVisibility(tomatoImage, true);
            break;
        case pestoBtn:
            setElementVisibility(pestoImage, true);
            break;
        case bbqBtn:
            setElementVisibility(bbqImage, true);
            break;
        case cheeseBtn:
            setElementVisibility(cheeseImage, true);
            break;
        case mushroomBtn:
            setElementVisibility(mushroomImage, true);
            break;
        case pineappleImageBtn:
            setElementVisibility(pineappleImage, true);
            break;
        case tomatoSlicesBtn:
            setElementVisibility(tomatoSlicesImage, true);
            break;
        case onionBtn:
            setElementVisibility(onionImage, true);
            break;
        default:
            console.log("Switch error");
    }
}
//
ingredientBtns.forEach((btn) => {
    btn.addEventListener("click", registerClick);
    btn.addEventListener("click", ingredientClickedSwitch);
});
//

ovenBtn?.addEventListener("click", () => {
    checkOrder();
});
// add event listener to all ingredients and apply clickedIngredients function

// checking if clicked ingredient array matches generated customer order array
//
function checkOrder() {
    let correctIngredients = 0;
    for (let i = 0; i < clickedIngredientsArray.length; i++) {
        console.log(customerOrder);
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
        updateWinDisplay();
    } else if (clickedIngredientsArray.length < customerOrder.length) {
        console.log("Not enough toppings");
        clickedIngredientsArray = [];
    } else {
        console.log("Wrong toppings!");
    }
    clickedIngredientsArray = [];
    generateOrder(1);
    updateCustomerOrder();
    binPizzaButton();
}

//
//
// Customer order display
function updateCustomerOrder() {
    let customerToppings = [...customerOrder];
    customerToppings.shift();
    orderDisplay!.textContent = `The customer would like: ${customerToppings.join(
        " + "
    )}`;
}

// pizzabinbutton
function binPizza() {
    clickedIngredientsArray = [];
    pizzaLoadingImages.forEach((img) => {
        setElementVisibility(img, false);
    });
}
pizzaBinBtn!.addEventListener("click", binPizza);
