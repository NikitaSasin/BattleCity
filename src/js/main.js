//= mazeGenerator
//= game
var imgBrick = new Image();
var width = prompt('Enter maze width', 20);
var height = prompt('Enter maze height', 20);

imgBrick.addEventListener('load', function () {
  var maze = new Game(width, height, imgBrick);
});
imgBrick.src = 'img/brick.png';
