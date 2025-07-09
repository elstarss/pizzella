//Win display
export const updateWinDisplay = (
    element: HTMLElement,
    level: number,
    winCount: number
) => {
    element.innerHTML = `Level ${level}, Pizzas made in this level: ${winCount}`;
};

// element visibility
export const setElementVisibility = (
    element: HTMLElement,
    visibility: boolean
) => {
    return (element.style.display = visibility ? "block" : "none");
};

// customer order display
export const updateCustomerOrder = (
    customerOrder: string[],
    element: HTMLElement
) => {
    let customerToppings = [...customerOrder];
    customerToppings.shift();
    element.textContent = `${customerToppings.join(" + ")}`;
};

export const shuffle = (array: string[]): string[] => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
};
