export const DOM = {
    // content divs
    startGameButton: document.querySelector<HTMLButtonElement>(
        ".start-game-btn"
    ) as HTMLButtonElement,
    landingContent: document.querySelector(
        ".landing-screen-all"
    ) as HTMLDivElement,
    gameContent: document.querySelector<HTMLDivElement>(
        ".game-content"
    ) as HTMLDivElement,
    endScreenContent: document.querySelector<HTMLDivElement>(
        ".end-screen-content"
    ) as HTMLDivElement,
    endScreenScore:
        document.querySelector<HTMLHeadingElement>(".end-screen-score"),
    winnerScreenContent: document.querySelector(
        ".winner-screen-content"
    ) as HTMLDivElement,
    // other dom elements
    orderDisplay: document.querySelector(
        ".customer-order-display__order"
    ) as HTMLHeadingElement,
    winDisplay: document.getElementById("winDisplay") as HTMLElement,
    pizzaBinBtn: document.querySelector<HTMLButtonElement>(".bin-pizza-btn"),
    resetBtns: document.querySelectorAll(".reset"),
    countdownDisplay: document.querySelector<HTMLParagraphElement>(
        ".countdown-timer-div"
    ),
    feedbackDisplay: document.querySelector<HTMLDivElement>(
        ".feedback-pizza-row"
    ) as HTMLDivElement,
    dessertModeBtn:
        document.querySelector<HTMLButtonElement>(".dessert-mode-btn"),
    iconImages: document.querySelectorAll(
        ".ingredient-buttons__icon"
    ) as NodeListOf<HTMLImageElement>,
    playButton: document.querySelector(
        ".audio-controls__play-btn"
    ) as HTMLButtonElement,
    audioImage: document.querySelector(
        ".audio-controls__play-btn--img"
    ) as HTMLImageElement,
    audio: document.querySelector("#audio") as HTMLAudioElement,
    // buttons for ingredients
    ingredientBtns: document.querySelectorAll<HTMLButtonElement>(
        ".ingredient-buttons"
    ),
    baseBtn: document.getElementById("baseButton") as HTMLButtonElement,
    tomatoBtn: document.getElementById("tomatoButton") as HTMLButtonElement,
    pestoBtn: document.getElementById("pestoBtn") as HTMLButtonElement,
    bbqBtn: document.getElementById("bbqbtn"),
    cheeseBtn: document.getElementById("cheeseButton") as HTMLButtonElement,
    mushroomBtn: document.getElementById("mushroomButton") as HTMLButtonElement,
    tomatoSlicesBtn: document.getElementById(
        "tomatoSlicesButton"
    ) as HTMLButtonElement,
    onionBtn: document.getElementById("onionButton") as HTMLButtonElement,
    pineappleImageBtn: document.getElementById(
        "pineappleButton"
    ) as HTMLButtonElement,
    ovenBtn: document.getElementById("ovenButton"),
    // importing pizza loading images
    pizzaLoadingImages: document.querySelectorAll(
        ".pizza-loading-images"
    ) as NodeListOf<HTMLImageElement>,
    baseImage: document.querySelector(
        ".pizza-loading-images__base"
    ) as HTMLImageElement,
    tomatoImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__tomato-sauce"
    ),
    pestoImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__pesto"
    ),
    bbqImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__bbq"
    ),
    cheeseImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__cheese"
    ),
    mushroomImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__mushroom"
    ),
    tomatoSlicesImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__sliced-tomato"
    ),
    onionImage: document.querySelector(
        ".pizza-loading-images__onion"
    ) as HTMLImageElement,
    pineappleImage: document.querySelector<HTMLImageElement>(
        ".pizza-loading-images__pineapple"
    ),
};
