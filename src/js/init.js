;(function() {

  function init() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var m = createMap();
    var cellSize = 24;
    var mapSizeX = 30;
    var mapSizeY = 30;

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

      for (var y = 0; y < mapSizeY; y++) {
        for (var j = 0; j < mapSizeX; j++) {
          context.drawImage(imgBrick, 0, 0, 2, cellSize, 0, y * cellSize, 2, cellSize)
          context.drawImage(imgBrick, 0, 0, 2, cellSize, mapSizeX * (cellSize) - 2, y * cellSize, 2, cellSize)
        }
        if (y == 0) {
            for (var j = 0; j < mapSizeX; j++) {
              context.drawImage(imgBrick, 0, 0, 2, cellSize, j * cellSize, y, cellSize, 2)
            }
        }

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
