var mazeGenerator = function (mazeWidth, mazeHeight) {
  this.mazeWidth = mazeWidth;
  this.mazeHeight = mazeHeight;

  this.setOfNumbers = [];
  this.rightBorder = [];
  this.bottomBorder = [];

  this.init();
};

mazeGenerator.prototype = (function () {
  var createRow = function (row) {
    this.setOfNumbers[row] = [];
    this.rightBorder[row] = [];
    this.bottomBorder[row] = [];
  };

  var createFirstSet = function (row) {
    var i = 0;
    for (i = 0; i < this.mazeWidth; i++) {
      this.setOfNumbers[row] = i;
    }
  };

  var createSet = function (row) {
    var x;
    for (x = 0; x < this.mazeWidth; x++) {
      // If upper cell has border bottom => create new set
      if (this.bottomBorder[row - 1][x]) {
        this.setOfNumbers[row][x] = (row * this.mazeWidth) + x;
      } else {
        //  If upper cell hasn't border bottom (== 0) => copy upper set
        this.setOfNumbers[row][x] = this.setOfNumbers[row - 1][x];
      }
    }
  };

  var createLastSet = function (row) {
    var i;
    var nextArr;
    for (i = 0; i < this.mazeWidth; i++) {
      this.setOfNumbers[row][i] = this.setOfNumbers[row - 1][i];
      this.rightBorder[row][i] = this.rightBorder[row - 1][i];
      this.bottomBorder[row][i] = 1;
    }

    nextArr = this.setOfNumbers[row][0];

    for (i = 0; i < this.mazeWidth; i++) {
      if (nextArr !== this.setOfNumbers[row][i + 1]) {
        this.rightBorder[row][i] = 0;
        nextArr = this.setOfNumbers[row][i + 1];
      }
      this.setOfNumbers[row][i + 1] = this.setOfNumbers[row][i];
    }
  };

  var generateRandomWall = function () {
    return Math.floor(2 * Math.random());
  };

  var addRightBorder = function (row, cell) {
    this.rightBorder[row][cell] = 1;
  };

  var ifNoRightWall = function (row, cell) {
    this.setOfNumbers[row][cell + 1] = this.setOfNumbers[row][cell];
  };

  var isolationCheck = function (row) {
    var x;
    var setIsIsolated;
    var s;
    for (x = 0; x < this.mazeWidth; x++) {
      // Set isolated if var setIsIsolated == 0
      setIsIsolated = 0;

      // Check set isolation. If set has open border bottom (== 0), set is not isolated
      for (s = 0; s < this.mazeWidth; s++) {
        if (this.bottomBorder[row][s] === 0 &&
            this.setOfNumbers[row][s] === this.setOfNumbers[row][x]) {
          setIsIsolated += 1;
        }
      }
      // If set finaly isolated, it must be opened
      if (setIsIsolated === 0) {
        this.bottomBorder[row][x] = 0;
      }
    }
  };

  var init = function () {
    var i;
    var j;

    for (i = 0; i < this.mazeHeight; i++) {
      // Step 1
      createRow.call(this, i);

      // Step 2
      if (i === 0) {
        createFirstSet.call(this, i);
      } else if (i === this.mazeHeight - 1) {
        createLastSet.call(this, i);
      } else {
        createSet.call(this, i);
      }

      // Step 3
      for (j = 0; j < this.mazeWidth; j++) {
        this.rightBorder[i][j] = generateRandomWall();
        this.bottomBorder[i][j] = generateRandomWall();

        if (this.setOfNumbers[i][j] === this.setOfNumbers[i][j + 1]) {
          addRightBorder.call(this, i, j);
        }
        if (this.rightBorder[i][j] === 0) {
          ifNoRightWall.call(this, i, j);
        }
      }

      // Step 4
      isolationCheck.call(this, i);
    }
  };

  return {
    init: init
  };
}());
