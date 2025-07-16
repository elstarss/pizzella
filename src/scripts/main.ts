import {
    updateWinDisplay,
    setElementDisplay,
    updateCustomerOrder,
    shuffle,
    feedback,
} from "./gameUtils";
import "../styles/style.scss";
import "../styles/variables.scss";

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
const iconImages = document.querySelectorAll(
    ".ingredient-buttons__icon"
) as NodeListOf<HTMLImageElement>;
const playButton = document.querySelector(
    ".audio-controls__play-btn"
) as HTMLButtonElement;
const audioImage = document.querySelector(
    ".audio-controls__play-btn--img"
) as HTMLImageElement;
const audio = document.querySelector("#audio") as HTMLAudioElement;
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
const pizzaLoadingImages = document.querySelectorAll(
    ".pizza-loading-images"
) as NodeListOf<HTMLImageElement>;
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
let customerOrder: string[] = [];
let clickedIngredientsArray: string[] = [];
let countdown: any;
let timeLeft: number = 20;
let isDessertMode: boolean = false;
const pizzaObject = {
    savoury: {
        toppingsList: [
            "Cheese",
            "Mushroom",
            "Tomato slices",
            "Pineapple",
            "Onion",
        ],
        sauceList: ["Tomato sauce", "Pesto sauce", "BBQ sauce"],
        srcListIcons: [
            "images/icons/dough-icon.png",
            "images/icons/savoury/tomato-sauce-icon.png",
            "images/icons/savoury/pesto-sauce-icon.png",
            "images/icons/savoury/bbq-sauce-icon.png",
            "images/icons/savoury/cheese-icon.png",
            "images/icons/savoury/mushroom-icon.png",
            "images/icons/savoury/pineapple-icon.png",
            "images/icons/savoury/sliced-tomato-icon.png",
            "images/icons/savoury/onion-icon.png",
        ],
        srcListToppings: [
            "images/pizza-toppings/pizza-base-1.png",
            "images/pizza-toppings/savoury/pizza-tomato-1.png",
            "images/pizza-toppings/savoury/pizza-pesto-1.png",
            "images/pizza-toppings/savoury/pizza-bbq.png",
            "images/pizza-toppings/savoury/pizza-cheese-1.png",
            "images/pizza-toppings/savoury/pizza-topping-mushroom-s2.png",
            "images/pizza-toppings/savoury/pizza-topping-pineapple.png",
            "images/pizza-toppings/savoury/tomato-pizza-topping-s2.png",
            "images/pizza-toppings/savoury/onion-pizza-topping-s2.png",
        ],
    },
    sweet: {
        toppingsList: [
            "Blueberries",
            "Chocolate chips",
            "Marshmallows",
            "Strawberries",
            "Sprinkles",
        ],
        sauceList: ["Chocolate Sauce", "Strawberry Sauce", "Caramel Sauce"],
        srcListIcons: [
            "images/icons/dough-icon.png",
            "images/icons/sweet/chocolate-sauce-icon.png",
            "images/icons/sweet/strawberry-sauce-icon.png",
            "images/icons/sweet/caramel-sauce-icon.png",
            "images/icons/sweet/blueberry-icon.png",
            "images/icons/sweet/chocolate-chip-icon.png",
            "images/icons/sweet/marshmallow-icon.png",
            "images/icons/sweet/strawberry-icon.png",
            "images/icons/sweet/sprinkles-icon.png",
        ],
        srcListToppings: [
            "images/pizza-toppings/pizza-base-1.png",
            "images/pizza-toppings/sweet/chocolate-sauce.png",
            "images/pizza-toppings/sweet/strawberry-sauce.png",
            "images/pizza-toppings/sweet/caramel-sauce.png",
            "images/pizza-toppings/sweet/blueberry-topping.png",
            "images/pizza-toppings/sweet/chocolate-chip-topping.png",
            "images/pizza-toppings/sweet/marshmallow-topping.png",
            "images/pizza-toppings/sweet/strawberry-topping.png",
            "images/pizza-toppings/sweet/sprinkles-topping.png",
        ],
    },
};
document.addEventListener("DOMContentLoaded", () => {
    if (!onionBtn || !startGameButton || !orderDisplay || !bbqBtn) {
        throw new Error("Variable empty");
    }
});
// functions
const swapToDessertImages = () => {
    iconImages.forEach((img, index) => {
        if (isDessertMode == true) {
            if (pizzaObject.sweet.srcListIcons[index]) {
                img.src = `${pizzaObject.sweet.srcListIcons[index]}`;
            }
        } else {
            console.log("got to savoury");
            if (pizzaObject.savoury.srcListIcons[index]) {
                img.src = `${pizzaObject.savoury.srcListIcons[index]}`;
            }
        }
    });
    pizzaLoadingImages.forEach((img, index) => {
        if (isDessertMode) {
            console.log("got to sweet");
            if (pizzaObject.sweet.srcListToppings[index]) {
                img.src = `${pizzaObject.sweet.srcListToppings[index]}`;
            }
        } else {
            console.log("got to savoury toppings");
            if (pizzaObject.savoury.srcListToppings[index]) {
                img.src = `${pizzaObject.savoury.srcListToppings[index]}`;
            }
        }
    });
};
const generateOrder = (numberOfToppings: number) => {
    let toppings: string[] = [];
    let sauce: string[] = [];
    if (isDessertMode) {
        toppings = pizzaObject.sweet.toppingsList.slice(0);
        sauce = pizzaObject.sweet.sauceList.slice(0);
    } else {
        toppings = pizzaObject.savoury.toppingsList.slice(0);
        sauce = pizzaObject.savoury.sauceList.slice(0);
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
    console.log(isDessertMode);
    const target = event.currentTarget as HTMLButtonElement;
    switch (target) {
        case baseBtn:
            setElementDisplay(baseImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Base");
            } else if (isDessertMode == true) {
                clickedIngredientsArray.push("Base");
            }
            break;
        case tomatoBtn:
            setElementDisplay(tomatoImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Tomato sauce");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Chocolate Sauce");
            }
            break;
        case pestoBtn:
            setElementDisplay(pestoImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Pesto sauce");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Strawberry Sauce");
            }
            break;
        case bbqBtn:
            setElementDisplay(bbqImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("BBQ sauce");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Caramel Sauce");
            }
            break;
        case cheeseBtn:
            setElementDisplay(cheeseImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Cheese");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Blueberries");
            }
            break;
        case mushroomBtn:
            setElementDisplay(mushroomImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Mushroom");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Chocolate chips");
            }
            break;
        case pineappleImageBtn:
            setElementDisplay(pineappleImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Pineapple");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Marshmallows");
            }
            break;
        case tomatoSlicesBtn:
            setElementDisplay(tomatoSlicesImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Tomato slices");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Strawberries");
            }
            break;
        case onionBtn:
            setElementDisplay(onionImage as HTMLImageElement, true);
            if (!isDessertMode) {
                clickedIngredientsArray.push("Onion");
            } else if (isDessertMode) {
                clickedIngredientsArray.push("Sprinkles");
            }
            break;

        default:
            console.log("Switch error");
    }
    return clickedIngredientsArray;
};

const checkOrder = () => {
    let correctIngredients = 0;
    const clickedIngredientsArrayCleaned = clickedIngredientsArray.filter(
        (topping, index) => {
            return clickedIngredientsArray.indexOf(topping) === index;
        }
    );
    for (let i = 0; i < clickedIngredientsArrayCleaned.length; i++) {
        if (customerOrder.includes(clickedIngredientsArrayCleaned[i])) {
            correctIngredients++;
        }
    }
    if (
        correctIngredients === clickedIngredientsArrayCleaned.length &&
        clickedIngredientsArrayCleaned.length == customerOrder.length
    ) {
        console.log("correct");
        winCount++;
        totalCorrectPizzas++;
        updateWinDisplay(winDisplay, levelNumber, winCount);
        levelUp();
        feedback(feedbackDisplay as HTMLDivElement, "correct");
    } else if (clickedIngredientsArrayCleaned.length < customerOrder.length) {
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
    if (levelNumber == 3 && winCount == 5) {
        console.log("Winner!!");
        setElementDisplay(gameContent as HTMLDivElement, false);
        setElementDisplay(winnerScreenContent as HTMLDivElement, true);
    } else if (winCount >= 5) {
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
    return isDessertMode;
};

const startGame = () => {
    swapToDessertImages();
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
    setElementDisplay(winnerScreenContent, false);
    binPizzaButton();
    winCount = 0;
    levelNumber = 1;
    totalCorrectPizzas = 0;
    isDessertMode = true;
    dessertModeToggle();
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
resetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        resetGameFunction();
    });
});
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        audioImage.src = "images/speaker-off-icon.png";
    } else {
        audio.pause();
        audioImage.src = "images/speaker-icon.png";
    }
});
