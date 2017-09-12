var mazeGenerator = function(mazeWidth, mazeHeight) {
  this.mazeWidth = mazeWidth;
  this.mazeHeight = mazeheight;

  this.setOfNumbers = [];
  this.rightBorder = [];
  this.bottomBorder = [];
};

mazeGenerator.prototype = function() {
  var createRow = function (row) {
    this.setOfNumbers[row] = [];
    this.rightBorder[row] = [];
    this.bottomBorder[row] = [];
  };

  var createFirstSet = function (row) {
    for (var i = 0; i < mazeWidth; i++) {
      this.setOfNumbers[row] = i;
    }
  };

  var createSet = function (row) {
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
  };

  var createLastSet = function (row) {
    for (var i = 0; i < mazeWidth; i++) {
      this.setOfNumbers[row][i] = this.setOfNumbers[row-1][i];
      this.rightBorder[row][i] = this.rightBorder[row-1][i];
      this.bottomBorder[row][i] = 1;
    }

    var nextArr = this.setOfNumbers[row][0];

    for (i = 0; i < mazeWidth; i++) {
      if(nextArr != this.setOfNumbers[row][i+1]){
        this.rightBorder[row][i] = 0;
        nextArr = this.setOfNumbers[row][i+1];
      }
      this.setOfNumbers[row][i+1] = this.setOfNumbers[row][i];
    }
  };

  var generateRandomWall = function () {
    return Math.floor(2 * Math.random());
  };

  var addRightBorder = function (row, cell) {
    this.rightBorder[row][cell] = 1;
  };

  var ifNoRightWall = function (row, cell) {
    this.setOfNumbers[row][cell+1] = this.setOfNumbers[row][cell];
  };

  var isolationCheck = function (row) {

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
  };
};
