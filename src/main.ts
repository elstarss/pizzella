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
}

startGameButton.addEventListener("click", startGame);

//pizza icons
