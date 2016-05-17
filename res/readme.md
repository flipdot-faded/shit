# Graphics

Here are the graphics for the game.

![Mr. Brown](https://github.com/flipdot/shit/blob/master/res/mr_brown.gif)

## Tubes

There are three tubelanes mr.brown can to flush through. The background panels contain the tubes. They are organized in subfolders named after the active/inactive lanes at the top of the panel. This is how you can easily find the next possible conntectors.

### naming scheme
All files are named in a certain way. E.g. `100-010_short.png` means at the top of the panel only the left lane has a tube connector, which leads to a tube in the middle. The addon `_short` says, this panel is only 240px high (=screen hight) and the player has to react fast to not hit the walls.

### level building
There is only one level, but it gets harder every panel. 

An easy start would look like:

````
010-010_short
010-010_short
...
````
![middle](https://github.com/flipdot/shit/blob/master/res/010/010-010_short.png)

![middle](https://github.com/flipdot/shit/blob/master/res/010/010-010_short.png)

lets make an easy curve to the left:

````
...
010-100
100-100
...
````

![middle to left](https://github.com/flipdot/shit/blob/master/res/010/010-100.png)

![left](https://github.com/flipdot/shit/blob/master/res/100/100-100.png)

now split into two tubes left and right (easy with a long straight followed by a slow angle):

````
...
100-100
100-101_alter
...
````

![left](https://github.com/flipdot/shit/blob/master/res/100/100-100.png)

![split in left and right](https://github.com/flipdot/shit/blob/master/res/100/100-101_alter.png)

then making it harder by using a joint within two short panels (sharp angle):

````
...
101-011_short
011-010_short
...
````

![hard curve from left to the middle right is straight](https://github.com/flipdot/shit/blob/master/res/101/101-011_short.png)

![join to the middle](https://github.com/flipdot/shit/blob/master/res/011/011-010_short.png)

...and so on.


### future graphics

There will be some more alternating for the dark panel background. Maybe some fancy stuff burried next to the tubes to please the eyes... (not there yet)
