#include <CapacitiveSensor.h>
/*
 * This is the Arduino Code for the controller of the Flipdot toilet game.
 * Just connect the metal plate of the Sensor to Pin 2 and a short pice of Wire to pin 4
 */

 
#define SMOOTHING_VALUE_WEIGHT 0.1 //The bigger the number, the less the values are smoothed
#define AVERAGING_WINDOW 25

double lastVal = 0;
CapacitiveSensor sensor = CapacitiveSensor(4,2);

void setup() {
   Serial.begin(9600);
}

void loop() {
    //acuarie a new averaged sensor value
    long val =  sensor.capacitiveSensor(AVERAGING_WINDOW);

    //normalize it to a range from 0 to 1
    if(val < 200) {
      val = 200;
    } else if(val > 1200) {
      val = 1200;
    }
    val -= 200;
    double doubleVal = val / 1000.0;

    //now the smoothing code
    lastVal += (doubleVal * SMOOTHING_VALUE_WEIGHT);
    lastVal /= 1 + SMOOTHING_VALUE_WEIGHT;

    //print the result
    Serial.print(lastVal);
    Serial.println("\n");
}
