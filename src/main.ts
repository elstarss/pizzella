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
const orderDisplay = document.querySelector<HTMLParagraphElement>(
    ".customer-order-display"
);
//
// buttons for ingredients
const ingredientBtns = document.querySelectorAll<HTMLButtonElement>(
    ".ingredient-buttons"
);
const baseBtn = document.getElementById("baseButton") as HTMLButtonElement;
const tomatoBtn = document.getElementById("tomatoButton") as HTMLButtonElement;
const pestoBtn = document.getElementById("pestoBtn") as HTMLButtonElement;
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
//
// importing pizza loading images
//
const pizzaLoadingImages = document.querySelectorAll(".pizza-loading-images");
const baseImage = document.getElementById("pizzaBaseImage") as HTMLImageElement;
const tomatoImage = document.getElementById(
    "pizzaTomatoSauceImage"
) as HTMLImageElement;
const pestoImage = document.getElementById(
    "pizzaPestoSauceImage"
) as HTMLImageElement;
const cheeseImage = document.getElementById(
    "pizzaCheeseToppingImage"
) as HTMLImageElement;
const mushroomImage = document.getElementById(
    "mushroomToppingImage"
) as HTMLImageElement;
const tomatoSlicesImage = document.getElementById("tomatoSlicesToppingImage");
const onionImage = document.getElementById(
    "onionToppingImage"
) as HTMLImageElement;
const pineappleImage = document.getElementById(
    "pineappleToppingImage"
) as HTMLImageElement;
//
//
// Need to add checks here for checking is variables are empty or not
if (!onionBtn || !startGameButton || !orderDisplay) {
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
    generateOrder(2);
    updateCustomerOrder();
}

startGameButton.addEventListener("click", startGame);
//adding event listeners to each of the ingredient buttons to display their corresponding pizza loading image
baseBtn.addEventListener("click", () => setElementVisibility(baseImage, true));
tomatoBtn.addEventListener("click", () =>
    setElementVisibility(tomatoImage, true)
);

pestoBtn.addEventListener("click", () =>
    setElementVisibility(pestoImage, true)
);

cheeseBtn.addEventListener("click", () =>
    setElementVisibility(cheeseImage, true)
);
mushroomBtn.addEventListener("click", () =>
    setElementVisibility(mushroomImage, true)
);
tomatoSlicesBtn.addEventListener("click", () =>
    setElementVisibility(tomatoSlicesImage, true)
);
pineappleImageBtn.addEventListener("click", () =>
    setElementVisibility(pineappleImage, true)
);
onionBtn.addEventListener("click", () =>
    setElementVisibility(onionImage, true)
);
//
// Bin pizza button
console.log(pizzaLoadingImages);
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
// generating customer order
const toppingsList: string[] = [
    "Tomato sauce",
    "Pesto sauce",
    "Cheese",
    "Mushroom",
    "Tomato slices",
    "Pineapple",
    "Onion",
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
    slicedToppings.unshift("Base");
    customerOrder = slicedToppings;
    console.log("Customer order is: " + customerOrder);
}
//
//
console.log(orderDisplay);
let clickedIngredientsArray: string[] = [];

// function captures which ingredients are clicked by player
// function clickedIngredients(topping: string) {
//     if (!clickedIngredientsArray.includes(topping)) {
//         clickedIngredientsArray.push(topping);
//         console.log(`Clicked ingredients array is ${clickedIngredientsArray}`);
//     }
// }
// maybe another way to write this?
function registerClick(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    if (!clickedIngredientsArray.includes(target.innerText)) {
        clickedIngredientsArray.push(target.innerText);
        console.log(`Clicked ingredient array is ${clickedIngredientsArray}`);
    }
}
ingredientBtns.forEach((btn) => {
    btn.addEventListener("click", registerClick);
});

ovenBtn?.addEventListener("click", () => {
    checkOrder();
});
// add event listener to all ingredients and apply clickedIngredients function

// checking if clicked ingredient array matches generated customer order array
let winCount: number = 0;
//
function checkOrder() {
    let correctIngredients = 0;
    for (let i = 0; i < clickedIngredientsArray.length; i++) {
        if (customerOrder.includes(clickedIngredientsArray[i])) {
            correctIngredients++;
        }
    }
    if (correctIngredients === clickedIngredientsArray.length) {
        console.log("correct");
        winCount++;
        clickedIngredientsArray = [];
        generateOrder(2);
        binPizzaButton();
        updateWinDisplay();
        updateCustomerOrder();
    } else if (clickedIngredientsArray.length < customerOrder.length) {
        console.log("Not enough toppings");
    } else {
        console.log("Wrong toppings!");
        clickedIngredientsArray = [];
        generateOrder(2);
        updateCustomerOrder();
        binPizzaButton();
    }
}

//
//
// Customer order display
function updateCustomerOrder() {
    orderDisplay.textContent = `The customer order is: ${customerOrder.join(
        " + "
    )}`;
}

//Win display
function updateWinDisplay() {
    document.querySelector<HTMLDivElement>(
        ".win-display"
    ).textContent = `Win count is: ${winCount}`;
}
