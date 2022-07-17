#include <SPI.h>
#include <WiFiNINA.h>
#include "arduino_secrets.h" 

char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key index number (needed only for WEP)
const int SENSOR_IN = 2;
const int SAMPLE_TIME = 10;
const int SAMPLE_PERIOD = 3000;
const int SOUND_SIZE = 50;
const int MINIMUM_BUFFER_VALUE = 30;
const int SOUND_INDICATION = 1;
const int SIZE_OF_INT = 4;

unsigned long millisCurrent;
unsigned long millisLast = 0;
unsigned long millisElapsed = 0;

unsigned long secondsCurrent;
unsigned long secondsLast = 0;
unsigned long secondsEllapsed = 0;

int sampleBufferValue = 0;
int sound[SOUND_SIZE];
char httpBodyString[SIZE_OF_INT*SOUND_SIZE];
int soundSize = 0;

int sendRequest = 1;
int disconnectFromServer = 1;
int result;

int status = WL_IDLE_STATUS;
// if you don't want to use DNS (and reduce your sketch size)
// use the numeric IP instead of the name for the server:
//IPAddress server(18,195,37,93);  // numeric IP
char server[] = "ntp7avzadkf7vetekcmn4u5sp40flfdu.lambda-url.eu-central-1.on.aws";

// Initialize the Ethernet client library
// with the IP address and port of the server
// that you want to connect to (port 80 is default for HTTP):
WiFiSSLClient client;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  
  for(int i = 0; i < SOUND_SIZE; i++){
    sound[i] = 0;
  }
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  Serial.println("\n");

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  Serial.println("Connected to WiFi");
  printWiFiStatus();

  Serial.println("\nStarting connection to server...");
  // if you get a connection, report back via serial:
  result = client.connect(server, 443);
}

void loop() {
    millisCurrent = millis();
    millisElapsed = millisCurrent - millisLast;
  
    secondsCurrent = millis();
    secondsEllapsed = secondsCurrent - secondsLast;
    
    if (digitalRead(SENSOR_IN) == SOUND_INDICATION) {
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
        if(soundSize > 15){
            Serial.println("size: ");
            Serial.println(soundSize);

            int bodyLen = generateBodyStr(httpBodyString, sound);
    
             Serial.println("HTTP Request:");
            // Make a HTTP request:
            client.println("POST /earea-serverless-dev-processSound HTTP/1.1");
            client.print("Host: ");
            client.println(server);
            client.println("Connection: keep-alive");
            client.print("Content-Length: ");
            client.println(bodyLen);
            client.println();
            client.println(httpBodyString);
        }
        
        for(int j = 0; j < soundSize; j++){
           Serial.println(sound[j]);
           sound[j] = 0;
        }
  
        secondsLast = secondsCurrent;
        soundSize = 0;
    }
      
    while (client.available()) {
      char c = client.read();
      Serial.write(c);
    }

  // if the server's disconnected, stop the client:
  if (!client.connected() ) {
    Serial.println();
    Serial.println("disconnecting from server.");
    client.stop();
    }
 }

void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

int generateBodyStr(char* httpBody, int* values) {
  char buffer[4];
  
  if (soundSize == 0){
    return 0;
  }

  int bodyLen = sprintf(httpBody, "%s,", itoa(values[0], buffer, 10));  
  for (int i = 1; i < soundSize - 1; i++) {  // append the remaining field names and values to the string
    // each pair is separated by an ampersand (&)
    bodyLen += sprintf(&httpBody[bodyLen], "%s,",itoa(values[i], buffer, 10));
  }
  bodyLen += sprintf(&httpBody[bodyLen], "%s",itoa(values[soundSize], buffer, 10));

  
  return bodyLen;
}