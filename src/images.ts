const iconImages = document.querySelectorAll(".ingredient-buttons__icon");
const iconsArray = [
    "./src/images/icons/dough-icon",
    "./src/images/icons/chocolate-sauce-icon",
    "./src/images/icons/strawberry-sauce-icon",
    "./src/images/icons/caramel-sauce-icon",
    "./src/images/icons/blueberry-icon",
    "./src/images/icons/chocolate-chip-icon",
    "./src/images/icons/marshmallow-icon",
    "./src/images/icons/strawberry-icon",
    "./src/images/icons/sprinkles-icon",
];

const changingImages: Function = () => {
    for (let i = 0; i < iconImages.length; i++) {
        iconImages[i].src = iconsArray[i];
    }
};

const swapToDessertIcons = () => {
    iconImages.forEach((img, index) => {
        if (iconsArray[index]) {
            img.src = iconsArray[index];
        }
    });
};
