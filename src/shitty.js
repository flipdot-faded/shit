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

game.pipe = {/* Background pipe segments */
  path: "res/pipes/", /* path to pipe images */
  current: {/* new pipe segment entering the screen */
    height: 240,/* height of the pipes segment image */
    width: 320,/* width of our image, default 320 */
    top: "010", /* top connections of 3 lanes, default start: one middle lane */
    bottom: "010", /* bottom connections of 3 lanes, default: middle lane */
    path: this.top + "/", /* path of pipe images with the same top connectors, default: "010/" */
    kind: "_short" /* the 'kind' of a segment provides infos e.g. about crossings or imageheight, default: "_short" */
    setImagePath: function (){ /* define a function to calculate an image path with passed connectors */
      this.imagePath = this.top + "-" + this.bottom + this.kind + ".png"; /* Imagepath of a 1-3 pipes segment, e.g. "010-010_short.png" */
    },
    imagePath: "",
    image: 0 /* new Image() coming soon */
  },
  last: {/* pipe segment which leaves the screen */
    height: 240,/* height of the pipes segment image, default: 240px */
    width: 320,/* width of our image, default: 320px */
    top: "010", /* top connections of 3 lanes, default: start one middle lane */
    bottom: "010", /* bottom connections of 3 lanes, default: middle lane */
    path: this.top + "/", /* path of pipe images with the same top connectors, default: "010/" */
    kind: "_short" /* the 'kind' of a segment provides infos e.g. about crossings or imageheight, default: "_short" */
    setImagePath: function (){ /* define a function to calculate an image path with passed connectors */
      this.imagePath = this.top + "-" + this.bottom + this.kind + ".png"; /* Imagepath of a 1-3 pipes segment, e.g. "010-010_short.png" */
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
      setInitPosition: function () { /* define a function to calculate the initial top left corner position of Mr.Brown sprite */
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

game.random = {/* random generator for pipes */
  makeRandom: function () {
    this.lane1 = Math.round(Math.random ()); /* generate non-/existing left pipe */
    this.lane2 = Math.round(Math.random ()); /* generate non-/existing middle pipe */
    this.lane3 = Math.round(Math.random ()); /* generate non-/existing right pipe */
    this.kind = "_short"; /* here will be variations of pipes generated (e.g. "_short" = pipesimage 240px high, "_cross" lanes crossing, "_fancy" = eyecandy background stuff) */
  }
};

game.init = function init(){ /* Initialising canvas */
  /* draw a nice debug ascii-picture in the console for developers happyness*/
  console.log(" _    _       _           _    ");
  console.log("| |  | |     | |         | |   ");
  console.log("| | _| | ___ | |__   ___ | |_  ");
  console.log("| |/ / |/ _ \\| '_ \\ / _ \\| __| ");
  console.log("|   <| | (_) | |_) | (_) | |_  ");
  console.log("|_|\\_\\_|\\___/|_.__/ \\___/ \\__| ");
  console.log("## may the shit be with you ##");

  this.canvas = document.createElement('canvas'); /* create a <canvas> in the browser window */
  document.body.appendChild(this.canvas); /* adds the canvas to the html <body> element */

  this.canvas.width = this.resolution.width; /* apply the defined screen resolution to the canvas */
  this.canvas.height = this.resolution.heigth;
  this.context = this.canvas.getContext('2d'); /* provide a 2D rendering context for the drawing surface of a <canvas> element. */

  // TESTING
  var img = new Image();
  img.src = "../res/pipes/010/010-010.png";
  game.context.drawImage(img,0,0)
};

/** fileCheck(path)
* hacked function to check if a randomly generated image exists
* @param  {string} path to image
* @return {booleans}
*/
function fileCheck(path) {
  var img = new Image(); /* define the variable 'img' as a new Image */
  img.src = path; /* set the source of this 'img' with the path that is passed as argument to the function */
  var pixelState = game.context.getImageData(0,0,1,1).data; /* get the original color of the upper right screencorner 1x1 testpixel */
    console.log("pixelState before: " + pixelState.join("")); /* DEBUG Information for developers in the console */
  game.context.drawImage(img, 0,0,1,1); /* draw the possibly existing image in size 1x1px in this testpixel */
  var pixelHack = game.context.getImageData(0,0,1,1).data; /* if the image exists, it will been drawn and changes the color of that pixel */
    console.log("pixelState after: " + pixelState.join("")); /* DEBUG Information for developers in the console */
  game.context.fillStyle = "rgba(" + pixelState.join(",") + ")"; /* prepare the old color for a rectangle to overwrite that testpixel */
  game.context.fillRect(0,0,1,1); /* draw a 1x1 rectangle at the testpixel with the original color*/
    var pixelReckt = game.context.getImageData(0,0,1,1).data; /* get the new testpixel color after the rectangle was drawn */
    console.log("pixelState afterafter: " + pixelReckt.join("")); /* DEBUG Information for developers in the console */
  if (pixelState.join("") === pixelHack.join(""))/* compare if the color of this pixel has changed */
    return false;/* false if the pixelcolor stayed the same aka. the file didn't exist and wasn't drawn */
  else
    return true;/* true if the pixelcolor was changed aka. the file exists */
}
