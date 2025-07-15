import {
    updateWinDisplay,
    setElementDisplay,
    updateCustomerOrder,
    shuffle,
    feedback,
    changeImgSrc,
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
const winnerScreenContent = document.querySelector(
    ".winner-screen-content"
) as HTMLDivElement;
// other dom elements
const orderDisplay = document.querySelector(
    ".customer-order-display__order"
) as HTMLHeadingElement;
const winDisplay = document.getElementById("winDisplay") as HTMLElement;
const pizzaBinBtn = document.querySelector<HTMLButtonElement>(".bin-pizza-btn");
const resetBtns = document.querySelectorAll(".reset");
const countdownDisplay = document.querySelector<HTMLParagraphElement>(
    ".countdown-timer-div"
);
const feedbackDisplay = document.querySelector<HTMLDivElement>(
    ".feedback-pizza-row"
);
const dessertModeBtn =
    document.querySelector<HTMLButtonElement>(".dessert-mode-btn");
const iconImages = document.querySelectorAll(".ingredient-buttons__icon");
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
const baseImage = document.querySelector(
    ".pizza-loading-images__base"
) as HTMLImageElement;
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
const onionImage = document.querySelector(
    ".pizza-loading-images__onion"
) as HTMLImageElement;
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
const dessertToppingsList: string[] = [
    "Blueberries",
    "Strawberries",
    "Chocolate chips",
    "Marshmallows",
    "Sprinkles",
];
const sauceList: string[] = ["Tomato sauce", "Pesto sauce", "BBQ sauce"];
const dessertSauceList: string[] = [
    "Chocolate Sauce",
    "Strawberry Sauce",
    "Caramel Sauce",
];
const dessertIconsArray: string[] = [
    "dough-icon.png",
    "chocolate-sauce-icon.png",
    "strawberry-sauce-icon.png",
    "caramel-sauce-icon.png",
    "blueberry-icon.png",
    "chocolate-chip-icon.png",
    "strawberry-icon.png",
    "marshmallow-icon.png",
    "sprinkles-icon.png",
];
const savouryIconsArray: string[] = [
    "dough-icon.png",
    "tomato-sauce-icon.png",
    "pesto-sauce-icon.png",
    "bbq-sauce-icon.png",
    "cheese-icon.png",
    "mushroom-icon.png",
    "sliced-tomato-icon.png",
    "pineapple-icon.png",
    "onion-icon.png",
];
let customerOrder: string[] = [];
let clickedIngredientsArray: string[] = [];
let countdown: any;
let timeLeft: number = 20;
let isDessertMode = false;

// Need to add checks here for checking is variables are empty or not
if (!onionBtn || !startGameButton || !orderDisplay || !bbqBtn) {
    throw new Error("Variable empty");
}
// functions
console.log(toppingsList);
const generateOrder = (numberOfToppings: number) => {
    let toppings: string[] = [];
    let sauce: string[] = [];
    if (isDessertMode) {
        toppings = dessertToppingsList.slice(0);
        sauce = dessertSauceList.slice(0);
    } else {
        toppings = toppingsList.slice(0);
        sauce = sauceList.slice(0);
    }
    const shuffledToppings = shuffle(toppings);
    const shuffledSauces = shuffle(sauce);
    const slicedToppings = shuffledToppings.slice(0, numberOfToppings);
    const slicedSauces = shuffledSauces.slice(0, 1);
    slicedSauces.unshift("Base");
    slicedSauces.push(...slicedToppings);
    customerOrder = slicedSauces;
    console.log("Customer order is: " + slicedSauces);
};
const binPizzaButton = () => {
    clickedIngredientsArray = [];
    pizzaLoadingImages.forEach((img) => {
        setElementDisplay(img, false);
    });
};

const ingredientClickedSwitch = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    if (!clickedIngredientsArray.includes(target.innerText) && !isDessertMode) {
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
    } else if (
        !clickedIngredientsArray.includes(target.innerText) &&
        isDessertMode
    ) {
        switch (target) {
            case baseBtn:
                setElementDisplay(baseImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Base");
                break;
            case tomatoBtn:
                setElementDisplay(tomatoImage as HTMLImageElement, true);
                changeImgSrc(
                    tomatoImage as HTMLImageElement,
                    "./src/images/chocolate-sauce.png"
                );
                clickedIngredientsArray.push("Chocolate Sauce");
                break;
            case pestoBtn:
                setElementDisplay(pestoImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Strawberry Sauce");
                changeImgSrc(
                    pestoImage as HTMLImageElement,
                    "./src/images/strawberry-sauce.png"
                );
                break;
            case bbqBtn:
                setElementDisplay(bbqImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Caramel Sauce");
                changeImgSrc(
                    bbqImage as HTMLImageElement,
                    "./src/images/caramel-sauce.png"
                );
                break;
            case cheeseBtn:
                setElementDisplay(cheeseImage as HTMLImageElement, true);
                clickedIngredientsArray.push("Blueberries");
                changeImgSrc(
                    cheeseImage as HTMLImageElement,
                    "./src/images/blueberry-topping.png"
                );
                break;
            case mushroomBtn:
                setElementDisplay(mushroomImage as HTMLImageElement, true);
                changeImgSrc(
                    mushroomImage as HTMLImageElement,
                    "./src/images/chocolate-chip-topping.png"
                );
                clickedIngredientsArray.push("Chocolate chips");
                break;
            case pineappleImageBtn:
                setElementDisplay(pineappleImage as HTMLImageElement, true);
                changeImgSrc(
                    pineappleImage as HTMLImageElement,
                    "./src/images/marshmallow-topping.png"
                );
                clickedIngredientsArray.push("Marshmallows");
                break;
            case tomatoSlicesBtn:
                setElementDisplay(tomatoSlicesImage as HTMLImageElement, true);
                changeImgSrc(
                    tomatoSlicesImage as HTMLImageElement,
                    "./src/images/strawberry-topping.png"
                );
                clickedIngredientsArray.push("Strawberries");
                break;
            case onionBtn:
                setElementDisplay(onionImage as HTMLImageElement, true);
                changeImgSrc(
                    onionImage as HTMLImageElement,
                    "./src/images/sprinkles-topping.png"
                );
                clickedIngredientsArray.push("Sprinkles");
                break;
            default:
                console.log("Switch error");
        }
    }
    console.log(clickedIngredientsArray);
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
const swapToDessertIcons = () => {
    iconImages.forEach((img, index) => {
        if (isDessertMode == true) {
            if (dessertIconsArray[index]) {
                img.src = `./src/images/icons/${dessertIconsArray[index]}`;
            }
        } else {
            if (savouryIconsArray[index]) {
                img.src = `./src/images/icons/${savouryIconsArray[index]}`;
            }
        }
    });
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
    swapToDessertIcons();
};

const resetGameFunction = () => {
    setElementDisplay(gameContent, false);
    setElementDisplay(landingContent, true);
    setElementDisplay(endScreenContent, false);
    setElementDisplay(winnerScreenContent, false);
    binPizzaButton();
    winCount = 0;
    levelNumber = 1;
    totalCorrectPizzas = 0;
    isDessertMode = false;
    console.log("restarting");
};

const dessertModeToggle = () => {
    console.log(isDessertMode);
    if (isDessertMode == true) {
        dessertModeBtn!.innerHTML = "Sweet tooth?";
        document.body.style.backgroundColor = "rgb(200, 182, 255)";
        isDessertMode = false;
        return isDessertMode;
    } else if (isDessertMode == false) {
        dessertModeBtn!.innerHTML = "Back to classic";
        document.body.style.backgroundColor = "rgb(255, 214, 255)";
        isDessertMode = true;
        return isDessertMode;
    }
    console.log(isDessertMode);
    return isDessertMode;
};
// Event listeners
startGameButton.addEventListener("click", startGame);
document
    .querySelector<HTMLButtonElement>(".bin-pizza-btn")
    ?.addEventListener("click", binPizzaButton);
dessertModeBtn?.addEventListener("click", dessertModeToggle);
ingredientBtns.forEach((btn) => {
    btn.addEventListener("click", ingredientClickedSwitch);
});
ovenBtn!.addEventListener("click", () => {
    checkOrder();
});
pizzaBinBtn!.addEventListener("click", binPizzaButton);
console.log(winCount);
resetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        resetGameFunction();
        console.log("restart");
        document.body.style.backgroundColor = "rgb(200, 182, 255)";
    });
});
