/***
 *     _    _       _           _
 *    | |  | |     | |         | |
 *    | | _| | ___ | |__   ___ | |_
 *    | |/ / |/ _ \| '_ \ / _ \| __|
 *    |   <| | (_) | |_) | (_) | |_
 *    |_|\_\_|\___/|_.__/ \___/ \__|
 *
 * klobot game (2016 cc-by-sa flipdot.org)
 * https://github.com/flipdot/shit
 */

var game = new Object;

game.resolution = {
    heigth: 240,
    width: 320
};

game.speed = 10;

game.pipe = {/* pipe segments */
  path: "res/pipes/", /* path to pipe images */
  current: {// new pipe segment entering the screen
    height: 240,/* height of the pipes segment image */
    width: 320,/* width of our image, default 320 */
    top: "010", /* top connections of 3 lanes, default start one middle lane */
    bottom: "010", /* bottom connections of 3 lanes, default middle lane */
    path: this.top + "/", /* path of pipe images with the same top connectors */
    setImagePath: function (){
      this.imagePath = this.top + "-" + this.bottom + "_short" + ".png"; // Imagepath of 1-3 pipes, default "010-010_short.png"
    },
    imagePath: "",
    image: 0 /* new Image() comming soon */
  },
  last: {/* pipe segment which leaves the screen */
    height: 240,/* height of the pipes segment image */
    width: 320,/* width of our image, default 320 */
    top: "010", /* top connections of 3 lanes, default start one middle lane */
    bottom: "010", /* bottom connections of 3 lanes, default middle lane */
    setImagePath: function (){
      this.imagePath = this.top + "-" + this.bottom + "_short" + ".png"; // Imagepath of 1-3 pipes, default "010-010_short.png"
    },
    imagePath: "",
    image: 0 /* new Image() comming soon */
  }
};

game.mrBrown = {/* Our hero sprite! */
    path:"res/sprites/", /* path to sprite images */
    image: {
      height: 40,/* height of Mr.Brown sprite*/
      width: 40,/* width of Mr.Brown sprite*/
      setInitPosition: function () { /* top left corner of Mr.Brown sprite */
        this.position.y = Math.round((game.resolution.heigth*0.382) - (game.mrBrown.image.height/2)) /* default: golden ratio */
        this.position.x = Math.round(game.resolution.width/2) /* default startposition: middle lane*/
       },
      position: {}

 //     standard: this.mrBrown.path + "mrbrown.gif"/* animated shit sprite Mr. Brown */
      /* more movement animation todo...
      leftmove: this.mrBrown.path + "mrbrownleft.gif",
      rightmove: this.mrBrown.path + "mrbrownright.gif",
      collision: this.mrBrown.path + "mrbrownsplash.gif",
      */
    }
};

game.random = {// random generator for pipes
  makeRandom: function () {
    this.lane1 = Math.round(Math.random ()); /* non-/existing left pipe */
    this.lane2 = Math.round(Math.random ()); /* non-/existing middle pipe */
    this.lane3 = Math.round(Math.random ()); /* non-/existing right pipe */
    this.kind = "_short"; /* here will be variations of pipes (e.g. "_short" = pipesimage 240px high, "_cross" lanes crossing, "_fancy" = eyecandy background stuff) */
  }
};

game.init = function init(){ /* Initialising canvas */
  console.log(" _    _       _           _    ");
  console.log("| |  | |     | |         | |   ");
  console.log("| | _| | ___ | |__   ___ | |_  ");
  console.log("| |/ / |/ _ \\| '_ \\ / _ \\| __| ");
  console.log("|   <| | (_) | |_) | (_) | |_  ");
  console.log("|_|\\_\\_|\\___/|_.__/ \\___/ \\__| ");


  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);

  this.canvas.width = this.resolution.width;
  this.canvas.height = this.resolution.heigth;
  this.context = this.canvas.getContext('2d');

  // TESTING
  var img = new Image();
  img.src = "res/010/010-010.png";
  game.context.drawImage(img,0,0)


};

/**
 * hacked function to check if a randomly generated image exists
 * @param  {string} path to image
 * @return {booleans}
 */
function fileCheck(path) {
  var img = new Image();
  img.src = path;
  var pixelState = game.context.getImageData(0,0,1,1).data; /* get the original color of the upper right screencorner 1x1 testpixel */
  console.log("pixelState before: " + pixelState.join(""));
  game.context.drawImage(img, 0,0,1,1); /* draw the possibly existing image in size 1x1px in this testpixel */
  var pixelHack = game.context.getImageData(0,0,1,1).data; /* if the image exists, it will been drawn and changes the color of that pixel */
  console.log("pixelState after: " + pixelState.join(""));
  game.context.fillStyle = "rgba(" + pixelState.join(",") + ")"; /* prepare the old color for rectangle to overwrite that testpixel */
  game.context.fillRect(0,0,1,1); /* draw a 1x1 rectangle at the testpixel with the original color*/
  var pixelReckt = game.context.getImageData(0,0,1,1).data;
  console.log("pixelState afterafter: " + pixelReckt.join(""));
  if (pixelState.join("") === pixelHack.join(""))/* test if the color of this pixel has changed */
    return false;/* false if the pixelcolor stayed the same aka. the file didn't exist */
  else
    return true;/* true if the pixelcolor was changed aka. the file exists */
}
