#Typescript game
###Gameplay/intro:
Point and click game where player assemble a pizza matching the customer order, picking the right ingredients. A timer is set for each round and points awarded for correct pizzas.
Difficulty increases during later rounds where more complex pizzas are required and/or time allowed decreases.

##Key features
clickable ingredients buttons (displayed as images/ icons of what they represent)

order display- shows the required pizza to make

submit/ bake button- after ingredients assembled will then check if correct

timer- countdown for each round

score- updating score tracker during game and end

restart button- reset game

reset pizza button- scrap the previous ingredients and begin assembling again within the same round

###Optional features
combo bonus for correct pizzas in a row
difficulty options- harder orders/ shorter time to complete
mode switch- mystical pizzas / just theming colours switch

##Build requirements
###HTML -
-[]enter game button to start countdown for the round
-[]landing page includes game instructions
area for images to appear
-[]heading element with customer order displayed
-[]buttons for ingredients that toggle pizza images
-[]'bake' button that works as a submit button
-[]button to bin/restart pizza
-[]button to restart/refresh game fully
-[]countdown timer display
-[]display of current win count

###SCSS -
-[]media queries for device sizes
-[]consistent colour palette- need to decide
-[]hover feature over buttons
-[]animation on pizza when bake button is pressed

###typescript -
-[]start game function that starts countdown and displays game graphics
-[]ingredients array - base, sauce, cheese, pizza toppings
-[]function to update pizza loading area when ingredients are clicked
-[]generate order function which makes a random order out of the list of ingredients/ toppings
-[]function to submit/ bake pizza and return correct/ wrong ingredients and update score
-[]function to update score graphic
-[]function to reset current pizza being built without affecting win score etc
-[]countdown timer function that starts on new game/ next level
