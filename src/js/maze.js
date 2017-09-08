var x = 12;
var y = 12;
var mas = [];
var mapMas = [];
var mapX = 24;
var mapY = 24;
for (var i = 0; i < y; i++) {
  mas[i] = [];
  for (var j = 0; j < x; j++) {
    mas[i][j] = 1+j;
  }
}

console.log(mas);
