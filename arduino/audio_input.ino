/*
 get input from audio sensor
 input pin: 8
*/

const int SOUND_PIN = 8;
const int SAMPLE_TIME = 10;
unsigned long currentMillis;
unsigned long lastMillis = 0;
unsigned long elapsedMillis = 0;
int sampleBufferValue = 0;

void setup() {
    Serial.begin(9600);
}

void loop() {
    currentMillis = millis();
    elapsedMillis = currentMillis - lastMillis;

    int input = digitalRead(SOUND_PIN);

    if (input == LOW) {
      sampleBufferValue++;
    }

    if (elapsedMillis > SAMPLE_TIME) {
      Serial.println(sampleBufferValue);
      sampleBufferValue = 0;
      lastMillis = currentMillis;
    }
}
