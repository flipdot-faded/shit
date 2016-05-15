# klobot project

Here are the files for a game that can be played on a toilet in the flipdot 
hackerspace Kassel. The control interface is a touchless capacitor that tracks the 
position of your hand. The monitor is connected to a Raspberry-Pi. A motion 
detector starts the game.

## Game

To channel Mr. Brown through the sanitary underground tubes, you need to move 
your hand relatively to the controller. You loose if Mr. Brown touches the 
tubewalls. You then will see the highscores of your fellow shitheads and can add 
yours. Try to stay in the game as long as possible, you have only one try per 
session! (maybe you can restart by using the lavatory brush...) 

## Data

### Resolution

game screen resolution: 320x240 px

panel resolutions: 320x240 (short), 320x480, 320x720 (long), 320x960 (extralong)

tube wideness: 80 px

mr.brown: 40x40 px

### Collision
Collision will be detected when Mr. Brown hits a pixel that is not coloured `eeeeee`.

### Tubes

While straight tubes can be drawn in a short panel, some combinations require 
longer panels. Especially crossing over to an other lane in a single short panel is 
very hard, therefore longer panels are available.

*Attention*: The connectors in the middle lane have a different grid and require sometimes long panels.

3 tubelanes -> 49 combinations:

```
001-001 (right tube straight) -> short
001-010 (right tube curve to middle tube)
001-011 (right tube splits into middle and right tube)
001-100 (right tube curve to left tube)
001-110 (...)
001-101
001-111

010-001
010-010
010-011
010-100
010-110
010-101
010-111

011-001
011-010
011-011
011-100
011-110
011-101
011-111

100-001
100-010
100-011
100-100
100-110
100-101
100-111

110-001
110-010
110-011
110-100
110-110
110-101
110-111

101-001
101-010
101-011
101-100
101-110
101-101
101-111

111-001
111-010
111-011
111-100
111-110
111-101
111-111
```
