#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x3F,20,4);  // set the LCD address to 0x20 for
a 16 chars and 2 line display

const int trigger = 10;
const int echo = 9;

// const float durchmesser = 3.8;
// const float pfand = 0.25;

// unsigned long lastAktion = 0;
// unsigned long timeout = 10000;

float distance;

int count = 0;
int old_state = 0;  // 0 = Low, 1 = High

void setup(){
  Serial.begin(9600);
  pinMode(trigger,OUTPUT);
  pinMode(echo,INPUT);

  lcd.init();                      // initialize the lcd

  // Print a message to the LCD.
  lcd.backlight();
  lcd.print("Rollen Messung... ");
}

void loop(){
//Initialize the sensor
  digitalWrite(trigger,LOW);
  delayMicroseconds(5);
//We start the measurements
//We send out a signal activating the trigger output for 10 microseconds
  digitalWrite(trigger,HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger,LOW);
//We acquire the data and We convert the measurement to meters
//We measure the pulse width
//When the pin is HIGH It will measure the amount of time until it is LOW)
  distance=pulseIn(echo,HIGH);
  distance=distance*0.01657;

//We send the measured data through the serial port and to the LCD display
  lcd.setCursor ( 0, 1 );        // go to the first line
  lcd.print(distance);
  lcd.print("cm                  ");
  Serial.print(distance);
  Serial.print("cm  ");

  delay(200);
}
