# Typescript game
### Gameplay/intro:
Pizella is a point and click game where the player assembles a pizza matching the customer order, selecting the right ingredients to score a point. There are three levels of progressive difficulty with more toppings to add each time, and the player must assemble five correct pizzas each level to progress. Each game has a limit of 60 seconds.

## Key features
- clickable ingredients buttons (displayed as images/ icons of what they represent)
- customer order display- shows the required pizza to make
- submit/ bake button- after ingredients assembled will then check if correct
- timer- countdown for each round
- score- updating score tracker during game and end
- restart button- reset game
- reset pizza button- scrap the previous ingredients and begin assembling again within the same round

### Additional features
- 'secret' dessert mode where players can make dessert pizzas with a whole new mix of toppings
- landing screen with toggle to activate dessert mode that changes background
- end screen with information on how well the player did 

## Build requirements
### HTML -
- [x] enter game button to start countdown for the round
- [x] landing page includes game instructions
area for images to appear
- [x] heading element with customer order displayed
- [x] buttons for ingredients that toggle pizza images
- [x] 'bake' button that works as a submit button
- [x] button to bin/restart pizza
- [x] button to restart/refresh game fully
- [x] countdown timer display
- [x] display of current win count

### SCSS -
- [x] media queries for device sizes
- [x] consistent colour palette
- [x] hover feature over buttons
- [x] animation on pizza when bake button is pressed

### typescript -
- [x] start game function that starts countdown and displays game graphics
- [x] ingredients array - base, sauce, cheese, pizza toppings
- [x] function to update pizza loading area when ingredients are clicked
- [x] generate order function which makes a random order out of the list of ingredients/ toppings
- [x] function to submit/ bake pizza and return correct/ wrong ingredients and update score
- [x] function to update score graphic
- [x] function to reset current pizza being built without affecting win score etc
- [x] countdown timer function that starts on new game/ next level

# Potential extra features
- [ ] Divide levels into seperate rounds, with the timer resetting for each progressive level
- [ ] Improved audio features- sound effects when baking, or when an order is correct
- [ ] Additional player feedback when pizza is baked e.g. variation in praise
