//Win display
export const updateWinDisplay = (
    element: HTMLElement,
    level: number,
    winCount: number
) => {
    element.innerHTML = `Level ${level}, Pizzas made in this level: ${winCount}`;
};
