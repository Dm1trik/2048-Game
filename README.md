# 2048 Game

A browser version of the classic **2048** puzzle. Slide the tiles on a 4×4 board, merge the equal ones and try to reach the 2048 tile. The game logic lives in a separate `Game` class, so it is independent from the user interface.

## Live Preview

[Play the game](https://dm1trik.github.io/2048-Game/)

## Technologies Used

- HTML5
- SCSS (variables, nesting, CSS custom properties)
- JavaScript (ES6+, classes, DOM API)
- ESLint, Stylelint and HTML linter for code quality
- Prettier for code formatting

## Getting Started

1. Clone the repository:

```
git clone https://github.com/Dm1trik/2048-Game.git
cd 2048-Game
```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Run the project locally:

```
npm start
# or
yarn start
```

## Features

- **Keyboard controls**: use the arrow keys to move the tiles.
- **Touch controls**: swipe on the board to move the tiles on phones and tablets.
- **Score counter** that grows with every merge.
- **Game states**: the start, win and lose messages are shown according to the current status, and the Start button turns into Restart while you play.
- **Win and lose detection**: you win when the 2048 tile appears, and lose when the board is full and no merges are possible.
- **Responsive layout** that fits screens from 320px wide without horizontal scrolling.
- **Separated logic**: the `Game` class handles the board, score and status, and `main.js` only renders the state and handles input.
