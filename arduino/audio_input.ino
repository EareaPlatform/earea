const int OUT_PIN = 2;
const int SAMPLE_TIME = 10;
const int SAMPLE_PERIOD = 3000;
const int SOUND_SIZE = 50;
const int MINIMUM_BUFFER_VALUE = 1;
const int SOUND_INDICATION = 1;

unsigned long millisCurrent;
unsigned long millisLast = 0;
unsigned long millisElapsed = 0;

unsigned long secondsCurrent;
unsigned long secondsLast = 0;
unsigned long secondsElapsed = 0;

int sampleBufferValue = 0;
int sound[SOUND_SIZE];
int soundSize = 0;

void setup() {
  Serial.begin(9600);

  for(int i = 0; i < SOUND_SIZE; i++){
    sound[i] = 0;
  }
}

void loop() {
  millisCurrent = millis();
  millisElapsed = millisCurrent - millisLast;

  secondsCurrent = millis();
  secondsEllapsed = secondsCurrent - secondsLast;
  
  if (digitalRead(OUT_PIN) == SOUND_INDICATION) {
    sampleBufferValue++;
  }
  
  if (millisElapsed > SAMPLE_TIME) {    
    if(sampleBufferValue > MINIMUM_BUFFER_VALUE){
      Serial.println(sampleBufferValue);
      sound[soundSize++] = sampleBufferValue;
      }
      
    sampleBufferValue = 0;
    millisLast = millisCurrent;
  }

  if(secondsEllapsed > SAMPLE_PERIOD){
      Serial.println("size: ");
      Serial.println(soundSize);
      
      for(int j = 0; j < soundSize; j++){
         Serial.println(sound[j]);
         sound[j] = 0;
      }

      secondsLast = secondsCurrent;
      soundSize = 0;
  }
}