'use strict';

class Game {
  constructor(initialState) {
    if (initialState) {
      this.initialState = initialState.map(row => [...row]);
      this.board = initialState.map(row => [...row]);
    } else {
      this.initialState = Array(4)
        .fill(null)
        .map(() => Array(4).fill(0));

      this.board = Array(4)
        .fill(null)
        .map(() => Array(4).fill(0));
    }

    this.score = 0;
    this.status = 'idle';
  }

  moveLeft() {
    if (this.status !== 'playing') {
      return;
    }

    const oldBoard = JSON.stringify(this.board);

    for (let r = 0; r < this.board.length; r++) {
      this.board[r] = this.slideRow(this.board[r]);
    }

    if (oldBoard !== JSON.stringify(this.board)) {
      this.addRandomTile();
      this.updateStatus();
    }
  }
  moveRight() {
    if (this.status !== 'playing') {
      return;
    }

    const oldBoard = JSON.stringify(this.board);

    for (let r = 0; r < this.board.length; r++) {
      let row = this.board[r].reverse();

      row = this.slideRow(row);
      this.board[r] = row.reverse();
    }

    if (oldBoard !== JSON.stringify(this.board)) {
      this.addRandomTile();
      this.updateStatus();
    }
  }
  moveUp() {
    if (this.status !== 'playing') {
      return;
    }

    const oldBoard = JSON.stringify(this.board);

    this.board = this.transpose(this.board);

    for (let r = 0; r < this.board.length; r++) {
      this.board[r] = this.slideRow(this.board[r]);
    }

    this.board = this.transpose(this.board);

    if (oldBoard !== JSON.stringify(this.board)) {
      this.addRandomTile();
      this.updateStatus();
    }
  }
  moveDown() {
    if (this.status !== 'playing') {
      return;
    }

    const oldBoard = JSON.stringify(this.board);

    this.board = this.transpose(this.board);

    for (let r = 0; r < this.board.length; r++) {
      let row = this.board[r].reverse();

      row = this.slideRow(row);
      this.board[r] = row.reverse();
    }

    this.board = this.transpose(this.board);

    if (oldBoard !== JSON.stringify(this.board)) {
      this.addRandomTile();
      this.updateStatus();
    }
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.board.map(row => [...row]);
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.status = 'playing';
    this.addRandomTile();
    this.addRandomTile();
  }

  restart() {
    this.board = this.initialState.map(row => [...row]);
    this.score = 0;
    this.status = 'idle';
  }

  addRandomTile() {
    const emptyCells = [];

    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board[r].length; c++) {
        if (this.board[r][c] === 0) {
          emptyCells.push({
            r,
            c,
          });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];

    this.board[randomCell.r][randomCell.c] = Math.random() < 0.1 ? 4 : 2;
  }

  slideRow(row) {
    let array = row.filter(n => n !== 0);

    for (let i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        array[i] = array[i] * 2;
        array[i + 1] = 0;
        this.score += array[i];
      }
    }

    array = array.filter(n => n !== 0);

    while (array.length < 4) {
      array.push(0);
    }

    return array;
  }

  transpose(matrix) {
    const newMatrix = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0));

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        newMatrix[r][c] = matrix[c][r];
      }
    }

    return newMatrix;
  }

  updateStatus() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.board[r][c] === 2048) {
          this.status = 'win';

          return;
        }
      }
    }

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.board[r][c] === 0) {
          return;
        }
      }
    }

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (c < 3 && this.board[r][c] === this.board[r][c + 1]) {
          return;
        }

        if (r < 3 && this.board[r][c] === this.board[r + 1][c]) {
          return;
        }
      }
    }

    this.status = 'lose';
  }
}

module.exports = Game;
