import {
    updateWinDisplay,
    setElementDisplay,
    updateCustomerOrder,
    shuffle,
    feedback,
} from "./gameUtils";
import "./style.scss";
import "./variables.scss";
// content divs
const startGameButton = document.querySelector<HTMLButtonElement>(
    ".start-game-btn"
) as HTMLButtonElement;
const landingContent = document.querySelector(
    ".landing-screen-all"
) as HTMLDivElement;
const gameContent = document.querySelector<HTMLDivElement>(
    ".game-content"
) as HTMLDivElement;
const endScreenContent = document.querySelector<HTMLDivElement>(
    ".end-screen-content"
) as HTMLDivElement;
const endScreenScore =
    document.querySelector<HTMLHeadingElement>(".end-screen-score");
const winnerScreenContent = document.querySelector<HTMLDivElement>(
    ".winner-screen-content"
);
// other dom elements
const orderDisplay = document.querySelector(
    ".customer-order-display__order"
) as HTMLHeadingElement;
const winDisplay = document.getElementById("winDisplay") as HTMLElement;
const pizzaBinBtn = document.querySelector<HTMLButtonElement>(".bin-pizza-btn");
const resetGameBtn =
    document.querySelector<HTMLButtonElement>(".reset-game-btn");
const resetGameBtnEnd = document.querySelector<HTMLButtonElement>(
    ".reset-game-btn-end"
);
const countdownDisplay = document.querySelector<HTMLParagraphElement>(
    ".countdown-timer-div"
);
const feedbackDisplay = document.querySelector<HTMLDivElement>(
    ".feedback-pizza-row"
);
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
// importing pizza loading images
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
//Global variables
let winCount: number = 0;
let levelNumber: number = 1;
let totalCorrectPizzas: number = 0;
const toppingsList: string[] = [
    "Cheese",
    "Mushroom",
    "Tomato slices",
    "Pineapple",
    "Onion",
];
const sauceList: string[] = ["Tomato sauce", "Pesto sauce", "BBQ sauce"];
let customerOrder: string[] = [];
let clickedIngredientsArray: string[] = [];
let countdown: any;
let timeLeft: number = 20;
// let pizzaStreak: number = 0;

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
// functions
const generateOrder = (numberOfToppings: number) => {
    const shuffledToppings = shuffle(toppingsList);
    const shuffledSauces = shuffle(sauceList);
    const slicedToppings = shuffledToppings.slice(0, numberOfToppings);
    const slicedSauces = shuffledSauces.slice(0, 1);
    slicedSauces.unshift("Base");
    slicedSauces.push(...slicedToppings);
    customerOrder = slicedSauces;
    console.log("Customer order is: " + customerOrder);
};
const binPizzaButton = () => {
    clickedIngredientsArray = [];
    pizzaLoadingImages.forEach((img) => {
        setElementDisplay(img, false);
    });
};

const ingredientClickedSwitch = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    if (!clickedIngredientsArray.includes(target.innerText)) {
        switch (target) {
            case baseBtn:
                setElementDisplay(baseImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Base");
                break;
            case tomatoBtn:
                setElementDisplay(tomatoImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Tomato sauce");
                break;
            case pestoBtn:
                setElementDisplay(pestoImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Pesto sauce");
                break;
            case bbqBtn:
                setElementDisplay(bbqImage as HTMLImageElement, true);
                clickedIngredientsArray.push("BBQ sauce");
                break;
            case cheeseBtn:
                setElementDisplay(cheeseImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Cheese");
                break;
            case mushroomBtn:
                setElementDisplay(mushroomImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Mushroom");
                break;
            case pineappleImageBtn:
                setElementDisplay(pineappleImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Pineapple");
                break;
            case tomatoSlicesBtn:
                setElementDisplay(tomatoSlicesImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Tomato slices");
                break;
            case onionBtn:
                setElementDisplay(onionImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Onion");
                break;
            default:
                console.log("Switch error");
        }
    }
};

const checkOrder = () => {
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
        feedback(feedbackDisplay as HTMLDivElement, "correct");
    } else if (clickedIngredientsArray.length < customerOrder.length) {
        console.log("Not enough toppings");
        feedback(feedbackDisplay as HTMLDivElement, "missing toppings");
        clickedIngredientsArray = [];
    } else {
        console.log("Wrong toppings!");
        feedback(feedbackDisplay as HTMLDivElement, "wrong");
    }
    clickedIngredientsArray = [];
    generateOrder(levelNumber);
    updateCustomerOrder(customerOrder, orderDisplay);
    binPizzaButton();
    console.log(levelNumber, winCount);
};

const levelUp = () => {
    if (levelNumber == 3 && winCount == 1) {
        console.log("Winner!!");
        setElementDisplay(gameContent as HTMLDivElement, false);
        setElementDisplay(winnerScreenContent as HTMLDivElement, true);
    } else if (winCount >= 1) {
        levelNumber++;
        winCount = 0;
        updateWinDisplay(winDisplay, levelNumber, winCount);
    }
};

const startCountdown = () => {
    clearInterval(countdown);
    timeLeft = 60;
    countdownDisplay!.textContent = timeLeft + " seconds left!";
    countdown = setInterval(() => {
        timeLeft--;
        countdownDisplay!.textContent = timeLeft + " seconds left!";
        if (timeLeft <= 0 && gameContent.style.display == "block") {
            clearInterval(countdown);
            setElementDisplay(gameContent, false);
            setElementDisplay(endScreenContent, true);
            setElementDisplay(startGameButton, true);
            endScreenScore!.innerHTML =
                "Time's up! </br>You scored: " +
                totalCorrectPizzas +
                " points </br> You made it to level: " +
                levelNumber;
        }
    }, 1000);
};

const startGame = () => {
    setElementDisplay(landingContent, false);
    setElementDisplay(gameContent, true);
    generateOrder(levelNumber);
    updateCustomerOrder(customerOrder, orderDisplay);
    startCountdown();
    updateWinDisplay(winDisplay, levelNumber, winCount);
};

const resetGameFunction = () => {
    setElementDisplay(gameContent, false);
    setElementDisplay(landingContent, true);
    setElementDisplay(endScreenContent, false);
    binPizzaButton();
    winCount = 0;
    levelNumber = 1;
    totalCorrectPizzas = 0;
};

const dessertMode = () => {
    pineappleImage.src = "./src/images/blueberry-topping.png";
};
dessertMode();
// Event listeners
startGameButton.addEventListener("click", startGame);
document
    .querySelector<HTMLButtonElement>(".bin-pizza-btn")
    ?.addEventListener("click", binPizzaButton);

ingredientBtns.forEach((btn) => {
    btn.addEventListener("click", ingredientClickedSwitch);
});
ovenBtn!.addEventListener("click", () => {
    checkOrder();
});
pizzaBinBtn!.addEventListener("click", binPizzaButton);
console.log(winCount);
resetGameBtn.addEventListener("click", resetGameFunction);
resetGameBtnEnd?.addEventListener("click", resetGameFunction);
