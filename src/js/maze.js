var mazeGenerator = fucntion(mazeWidth, mazeHeight) {
  this.mazeWidth = mazeWidth;
  this.mazeHeight = mazeheight;

  this.setOfNumbers = [];
  this.rightBorder = [];
  this.bottomBorder = [];
}

mazeGenerator.prototype.createRow = function (row) {
  this.setOfNumbers[row] = [];
  this.rightBorder[row] = [];
  this.bottomBorder[row] = [];
}

mazeGenerator.prototype.createFirstSet = function (row) {
  for (var i = 0; i < mazeWidth; i++) {
    this.setOfNumbers[row] = i;
  }
}

mazeGenerator.prototype.createSet = function (row) {
  for (var i = 0; i < mazeWidth; i++) {
    // If upper cell has border bottom => create new set
    if (this.bottomBorder[row-1][i]) {
      this.setOfNumbers[row][i] = row * mazeWidth + i;
    }
    //  If upper cell hasn't border bottom (== 0) => copy upper set
    else {
      this.setOfNumbers[row][i] = this.setOfNumbers[row-1][i];
    }
  }
}

mazeGenerator.prototype.createLastSet = function (row) {
  for (var i = 0; i < mazeWidth; i++) {
    this.setOfNumbers[row][i] = this.setOfNumbers[row-1][i];
    this.rightBorder[row][i] = this.rightBorder[row-1][i];
    this.bottomBorder[row][i] = 1;
  }

  var nextArr = this.setOfNumbers[row][0];

  for (var i = 0; i < mazeWidth; i++) {
    if(nextArr != this.setOfNumbersrow][i+1]) {
      this.rightBorder[row][i] = 0;
      nextArr = this.setOfNumbers[row][i+1];
    }
    this.setOfNumbers[row][i+1] = this.setOfNumbers[row][i];
  }
}

mazeGenerator.prototype.generateRandomWall = function () {
  return Math.floor(2 * Math.random());
}

mazeGenerator.prototype.addRightBorder = function (row, cell) {
  this.rightBorder[row][cell] = 1;
}

mazeGenerator.prototype.ifNoRightWall = function (row, cell) {
  this.setOfNumbers[row][cell+1] = this.setOfNumbers[row][cell];
}

mazeGenerator.prototype.isolationCheck = function (row) {

  for (var i = 0; i < mazeWidth; i++) {
    // Set isolated if var setIsIsolated == 0
    var setIsIsolated = 0;

    // Check set isolation. If set has open border bottom (== 0), set is not isolated
    for (var j = 0; j < mazeWidth; j++) {
      if(this.bottomBorder[row][j] == 0 && this.setOfNumbers[row][j] == this.setOfNumbers[row][i]) {
        setIsIsolated++;
      }
    }

    // If set finaly isolated, it must be opened
    if (setIsIsolated == 0) {
      this.bottomBorder[row][i] = 0;
    }
  }
}
