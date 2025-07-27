import {
    updateWinDisplay,
    setElementDisplay,
    updateCustomerOrder,
    shuffle,
    feedback,
} from "./gameUtils";
import "../styles/style.scss";
import "../styles/variables.scss";
import { DOM } from "./domElements";
import { pizzaObject } from "./pizzaObject";
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

document.addEventListener("DOMContentLoaded", () => {
    if (
        !DOM.onionBtn ||
        !DOM.startGameButton ||
        !DOM.orderDisplay ||
        !DOM.bbqBtn
    ) {
        throw new Error("Variable empty");
    }
});
// functions
const swapToDessertImages = () => {
    DOM.iconImages.forEach((img, index) => {
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
    DOM.pizzaLoadingImages.forEach((img, index) => {
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
    DOM.pizzaLoadingImages.forEach((img) => {
        setElementDisplay(img, false);
    });
};
const ingredientClickedSwitch = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;

    const ingredientMap = new Map([
        [
            DOM.baseBtn,
            {
                image: DOM.baseImage as HTMLImageElement,
                normal: "Base",
                dessert: "Base",
            },
        ],
        [
            DOM.tomatoBtn,
            {
                image: DOM.tomatoImage as HTMLImageElement,
                normal: "Tomato sauce",
                dessert: "Chocolate Sauce",
            },
        ],
        [
            DOM.pestoBtn,
            {
                image: DOM.pestoImage as HTMLImageElement,
                normal: "Pesto sauce",
                dessert: "Strawberry Sauce",
            },
        ],
        [
            DOM.bbqBtn,
            {
                image: DOM.bbqImage as HTMLImageElement,
                normal: "BBQ sauce",
                dessert: "Caramel Sauce",
            },
        ],
        [
            DOM.cheeseBtn,
            {
                image: DOM.cheeseImage as HTMLImageElement,
                normal: "Cheese",
                dessert: "Blueberries",
            },
        ],
        [
            DOM.mushroomBtn,
            {
                image: DOM.mushroomImage as HTMLImageElement,
                normal: "Mushroom",
                dessert: "Chocolate chips",
            },
        ],
        [
            DOM.pineappleImageBtn,
            {
                image: DOM.pineappleImage as HTMLImageElement,
                normal: "Pineapple",
                dessert: "Marshmallows",
            },
        ],
        [
            DOM.tomatoSlicesBtn,
            {
                image: DOM.tomatoSlicesImage as HTMLImageElement,
                normal: "Tomato slices",
                dessert: "Strawberries",
            },
        ],
        [
            DOM.onionBtn,
            {
                image: DOM.onionImage as HTMLImageElement,
                normal: "Onion",
                dessert: "Sprinkles",
            },
        ],
    ]);

    const ingredient = ingredientMap.get(target);

    if (ingredient) {
        setElementDisplay(ingredient.image, true);
        clickedIngredientsArray.push(
            isDessertMode ? ingredient.dessert : ingredient.normal
        );
    } else {
        console.log("Ingredient switch error occured");
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
        updateWinDisplay(DOM.winDisplay, levelNumber, winCount);
        levelUp();
        feedback(DOM.feedbackDisplay, "correct");
    } else if (clickedIngredientsArrayCleaned.length < customerOrder.length) {
        console.log("Not enough toppings");
        feedback(DOM.feedbackDisplay, "missing toppings");
        clickedIngredientsArray = [];
    } else {
        console.log("Wrong toppings!");
        feedback(DOM.feedbackDisplay, "wrong");
    }
    clickedIngredientsArray = [];
    generateOrder(levelNumber);
    updateCustomerOrder(customerOrder, DOM.orderDisplay);
    binPizzaButton();
    console.log(levelNumber, winCount);
};
const levelUp = () => {
    if (levelNumber == 3 && winCount == 5) {
        console.log("Winner!!");
        setElementDisplay(DOM.gameContent, false);
        setElementDisplay(DOM.winnerScreenContent, true);
    } else if (winCount >= 5) {
        levelNumber++;
        winCount = 0;
        updateWinDisplay(DOM.winDisplay, levelNumber, winCount);
    }
};

const startCountdown = () => {
    clearInterval(countdown);
    timeLeft = 60;
    DOM.countdownDisplay!.textContent = timeLeft + " seconds left!";
    countdown = setInterval(() => {
        timeLeft--;
        DOM.countdownDisplay!.textContent = timeLeft + " seconds left!";
        if (timeLeft <= 0 && DOM.gameContent.style.display == "block") {
            clearInterval(countdown);
            setElementDisplay(DOM.gameContent, false);
            setElementDisplay(DOM.endScreenContent, true);
            setElementDisplay(DOM.startGameButton, true);
            DOM.endScreenScore!.innerHTML =
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
        DOM.dessertModeBtn!.innerHTML = "Sweet tooth?";
        document.body.style.backgroundColor = "rgb(200, 182, 255)";
        isDessertMode = false;
        return isDessertMode;
    } else if (isDessertMode == false) {
        DOM.dessertModeBtn!.innerHTML = "Back to classic";
        document.body.style.backgroundColor = "rgb(255, 214, 255)";
        isDessertMode = true;
        return isDessertMode;
    }
    return isDessertMode;
};

const startGame = () => {
    swapToDessertImages();
    setElementDisplay(DOM.landingContent, false);
    setElementDisplay(DOM.gameContent, true);
    generateOrder(levelNumber);
    updateCustomerOrder(customerOrder, DOM.orderDisplay);
    startCountdown();
    updateWinDisplay(DOM.winDisplay, levelNumber, winCount);
};

const resetGameFunction = () => {
    setElementDisplay(DOM.gameContent, false);
    setElementDisplay(DOM.landingContent, true);
    setElementDisplay(DOM.endScreenContent, false);
    setElementDisplay(DOM.winnerScreenContent, false);
    binPizzaButton();
    winCount = 0;
    levelNumber = 1;
    totalCorrectPizzas = 0;
    isDessertMode = true;
    dessertModeToggle();
};
// Event listeners
DOM.startGameButton.addEventListener("click", startGame);
document
    .querySelector<HTMLButtonElement>(".bin-pizza-btn")
    ?.addEventListener("click", binPizzaButton);
DOM.dessertModeBtn?.addEventListener("click", dessertModeToggle);
DOM.ingredientBtns.forEach((btn) => {
    btn.addEventListener("click", ingredientClickedSwitch);
});
DOM.ovenBtn!.addEventListener("click", () => {
    checkOrder();
});
DOM.pizzaBinBtn!.addEventListener("click", binPizzaButton);
DOM.resetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        resetGameFunction();
    });
});
DOM.playButton.addEventListener("click", () => {
    if (DOM.audio.paused) {
        DOM.audio.play();
        DOM.audioImage.src = "images/speaker-off-icon.png";
    } else {
        DOM.audio.pause();
        DOM.audioImage.src = "images/speaker-icon.png";
    }
});
