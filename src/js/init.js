function game(mapSizeX, mapSizeY) {
  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');
  this.cellSize = 24;
  this.mapSizeX = mapSizeX;
  this.mapSizeY = mapSizeY;
  this.imgBrick = new Image();
  this.imgBrick.src = "img/brick.png";

  this.maze = new mazeGenerator(mapSizeX, mapSizeY);

  this.init();
}

game.prototype = (function () {

  var setCanvas = function () {
    this.canvas.width = this.mapSizeX * this.cellSize;
    this.canvas.height = this.mapSizeY * this.cellSize;
  }

  var clearCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  var drawPerimetr = function (row) {
    for (var j = 0; j < this.mapSizeX; j++) {
      this.context.drawImage(this.imgBrick, 0, 0, 2, this.cellSize, 0, row * this.cellSize, 2, this.cellSize);
      this.context.drawImage(this.imgBrick, 0, 0, 2, this.cellSize, this.mapSizeX * (this.cellSize) - 2, row * this.cellSize, 2, this.cellSize);
    }
    if (row == 0) {
      for (var j = 0; j < this.mapSizeX; j++) {
        this.context.drawImage(this.imgBrick, 0, 0, 2, this.cellSize, j * this.cellSize, row, this.cellSize, 2);
      }
    }
    if (row == this.mapSizeY - 1) {
      for (var j = 0; j < this.mapSizeX; j++) {
        this.context.drawImage(this.imgBrick, 0, 0, 2, this.cellSize, j * this.cellSize, this.mapSizeY * this.cellSize - 2, this.cellSize, 2);
      }
    }
  };

  var drawMaze = function (row) {
    for (var i = 0; i < this.mapSizeX; i++) {
      switch (this.maze.rightBorder[row][i]) {
        case 0:
          break;
        case 1:
          this.context.drawImage(this.imgBrick, 0, 0, 2, this.cellSize, (i + 1) * this.cellSize - 2, row * this.cellSize, 2, this.cellSize);
          break;
      }
      switch (this.maze.bottomBorder[row][i]) {
        case 0:
          break;
        case 1:
          this.context.drawImage(this.imgBrick, 0, 0, this.cellSize, 2, i * this.cellSize, (row + 1) * this.cellSize - 2, this.cellSize, 2);
          break;
      }
    }
  };

  var init = function () {
    setCanvas.call(this);
    clearCanvas.call(this);

    this.context.save();

    for (var i = 0; i < this.mapSizeY; i++) {
      drawPerimetr.call(this, i);
      drawMaze.call(this, i);
    }
    this.context.restore();
  }

  return {
    init: init
  }
}());
