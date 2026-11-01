'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const fieldCell = document.querySelectorAll('.field-cell');
const gameScore = document.querySelector('.game-score');
const startBtn = document.querySelector('.start');
const gameField = document.querySelector('.game-field');

const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

const KEY_DIRECTIONS = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
};
const SWIPE_THRESHOLD = 30;

let touchStartX = 0;
let touchStartY = 0;

function render() {
  const state = game.getState();
  const score = game.getScore();
  const gameStatus = game.getStatus();

  for (let r = 0; r < state.length; r++) {
    for (let c = 0; c < state[r].length; c++) {
      const index = r * 4 + c;
      const cell = fieldCell[index];

      cell.className = 'field-cell';

      if (state[r][c] === 0) {
        cell.textContent = '';
      }

      if (state[r][c] > 0) {
        const value = state[r][c];

        cell.textContent = value;
        cell.classList.add(`field-cell--${value}`);
      }
    }
  }

  gameScore.textContent = score;

  if (gameStatus === 'lose') {
    messageLose.classList.remove('hidden');
    messageWin.classList.add('hidden');
    messageStart.classList.add('hidden');
  }

  if (gameStatus === 'win') {
    messageWin.classList.remove('hidden');
    messageLose.classList.add('hidden');
    messageStart.classList.add('hidden');
  }

  if (gameStatus === 'playing') {
    messageStart.classList.add('hidden');
    messageWin.classList.add('hidden');
    messageLose.classList.add('hidden');

    startBtn.textContent = 'Restart';
    startBtn.classList.remove('start');
    startBtn.classList.add('restart');
  }
}

startBtn.addEventListener('click', () => {
  const gameStatus = game.getStatus();

  if (gameStatus === 'idle') {
    game.start();
  } else {
    game.restart();
    game.start();
  }

  render();
});

function move(direction) {
  if (direction === 'left') {
    game.moveLeft();
  }

  if (direction === 'right') {
    game.moveRight();
  }

  if (direction === 'up') {
    game.moveUp();
  }

  if (direction === 'down') {
    game.moveDown();
  }

  render();
}

document.addEventListener('keydown', keyEvent => {
  const direction = KEY_DIRECTIONS[keyEvent.key];

  if (!direction) {
    return;
  }

  keyEvent.preventDefault();
  move(direction);
});

gameField.addEventListener(
  'touchstart',
  touchEvent => {
    const touch = touchEvent.changedTouches[0];

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  },
  { passive: true },
);

gameField.addEventListener('touchend', touchEvent => {
  const touch = touchEvent.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < SWIPE_THRESHOLD) {
    return;
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    move(deltaX > 0 ? 'right' : 'left');
  } else {
    move(deltaY > 0 ? 'down' : 'up');
  }
});
