;(function() {
  function init() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var cellSize = 24;
    var mapSizeX = 12;
    var mapSizeY = 12;

    canvas.width = mapSizeX * cellSize;
    canvas.height = mapSizeY * cellSize;

    var gameMap = ([
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,1,1,1,1,1],
      [1,0,1,0,1,0,1,0,0,0,0,0],
      [1,0,1,0,1,0,1,0,1,1,1,1],
      [1,0,1,0,1,0,1,0,0,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,0,0,1,0,0,1],
      [1,0,1,0,1,1,1,1,1,0,0,1],
      [1,0,1,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,1,1],
    ]);

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
      context.fillStyle = '#111';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.save();

      for (var y = 0; y < mapSizeY; y++) {
        for (var x = 0; x < mapSizeX; x++) {
          switch (gameMap[y][x]) {
            case 0:
              break;
            case 1:
              context.drawImage(imgBrick, 0, 0, cellSize, cellSize, x * cellSize, y * cellSize, cellSize, cellSize);
              break;
          }
        }
      }
      context.restore();

      context.drawImage(tankObj.img, 2 * cellSize * tankObj.i, 0, cellSize * 2, cellSize * 2, tankObj.x, tankObj.y, tankObj.w, tankObj.h);
    }
    draw();

    window.addEventListener('keydown', function (e) {
      console.log(e.keyCode);
      var massX = tankObj.x / cellSize;
      var massY = tankObj.y / cellSize;
      console.log(massX + ' ' + massY);
      console.log(gameMap);
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
