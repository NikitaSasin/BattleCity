;(function() {
  function createMap() {
    var x = 12;
    var y = 12;

    var rightBorder = [];
    var bottomBorder = [];
    var mass = [];

    for (var i = 0; i < y; i++) {
      rightBorder[i] = [];
      bottomBorder[i] = [];
      mass[i] = [];

      if (i == 0) {
        for (var j = 0; j < x; j++) {
          mass[i][j] = j + 1;
          rightBorder[i][j] = 0;
          bottomBorder[i][j] = 0;
        }
      }
      else if (i == j-1) {
        for (var j = 0; j < x; j++) {
          mass[i][j] = mass[i-1][j];
          rightBorder[i][j] = rightBorder[i-1][j];
          bottomBorder[i][j] = 1;
        }

        var nextArr = mass[i][0];
        for (var j = 0; j < x; j++) {
          if(nextArr != mass[i][j+1]) {
            rightBorder[i][j] = 0;
            nextArr = mass[i][j+1];
          }
          mass[i][j+1] = mass[i][j];
          alert(mass[i]);
          alert(rightBorder[i]);
        }
        break;
      }
      else {
        for (var j = 0; j < x; j++) {
          if (bottomBorder[i-1][j]) {
            mass[i][j] = j + 1;
          }
          else {
            mass[i][j] = mass[i-1][j];
          }
          rightBorder[i][j] = 0;
          bottomBorder[i][j] = 0;
        }
      }

      for (j = 0; j < x; j++) {
        //right border
        rightBorder[i][j] = Math.floor(2 * Math.random());
        bottomBorder[i][j] = Math.floor(2 * Math.random());
        if(mass[i][j] == mass[i][j+1]) {
          rightBorder[i][j] = 1;
        }
        if(rightBorder[i][j] == 0) {
          mass[i][j+1] = mass[i][j];

        }
      }

      for (j = 0; j < x; j++) {
        //bottom border check
        var pos = 0;
        for (var k = 0; k < j; k++) {
          if (bottomBorder[i][k] == 0 && mass[i][j] == mass[i][k]) {
            pos++;
          }
        }
        if(!pos) {
          bottomBorder[i][j] = 0;
        }

      }

    }
    return {
      mass: mass,
      rightBorder: rightBorder,
      bottomBorder: bottomBorder
    }
  }

  function init() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var m = createMap();
    var cellSize = 24;
    var mapSizeX = 12;
    var mapSizeY = 12;

    canvas.width = mapSizeX * cellSize;
    canvas.height = mapSizeY * cellSize;

    function Tank (w, h, x, y, img) {
      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;
      this.i = 2;
      this.img = img;
    }

    tankObj = new Tank(cellSize, cellSize, cellSize, (mapSizeY - 1) * cellSize, imgTank);

    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.save();

      var right = m.rightBorder;
      var bottom = m.bottomBorder;
      console.log(right);
      console.log(bottom);

      for (var y = 0; y < mapSizeY; y++) {
        for (var x = 0; x < mapSizeX; x++) {
          switch (right[y][x]) {
            case 0:
              break;
            case 1:
              context.drawImage(imgBrick, 0, 0, 2, cellSize, (x + 1) * cellSize - 2, y * cellSize, 2, cellSize);
              break;
          }
          switch (bottom[y][x]) {
            case 0:
              break;
            case 1:
              context.drawImage(imgBrick, 0, 0, cellSize, 2, x * cellSize, (y + 1) * cellSize - 2, cellSize, 2);
              break;
          }
        }
      }
      context.restore();


    }
    draw();

    window.addEventListener('keydown', function (e) {
      var massX = tankObj.x / cellSize;
      var massY = tankObj.y / cellSize;

      switch (e.keyCode) {
        case 87: //up
          if(!gameMap[massY - 1][massX] && (gameMap[massY - 1][massX] >= 0)) {
            tankObj.y -= cellSize;
          }
          tankObj.i = 2;
          draw();
          break;

        case 68: //right
          if(!gameMap[massY][massX + 1] && gameMap[massY][massX + 1] <= gameMap[massY].length) {
            tankObj.x += cellSize;
          }
          tankObj.i = 0;
          draw();
          break;

        case 83: //down
          if(!gameMap[massY + 1][massX] && gameMap[massY + 1][massX] <= gameMap.length) {
            tankObj.y += cellSize;
          }
          tankObj.i = 3;
          draw();
          break;

        case 65: //left
          if(!gameMap[massY][massX - 1] && gameMap[massY][massX - 1] >= 0) {
            tankObj.x -= cellSize;
          }
          tankObj.i = 1;
          draw();
          break;
      }
    });
  }

  var imgBrick = new Image();
  imgBrick.src = 'img/brick.png';
  var imgTank = new Image();
  imgTank.src = 'img/tank.png';
  var tankObj;
  window.addEventListener('load', function() {
    init();
  });
})();
