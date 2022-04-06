#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>


class EventDispatcher {
private:
  struct Listener {
    const char *eventName;
    std::function<void(void)> callback;
    bool isOnce;
  };
  std::vector<Listener> listeners;

public:
  void on(const char *eventName, std::function<void(void)> fn) {
    this->listeners.push_back(Listener{eventName, fn, false});
  }

  void once(const char *eventName, std::function<void(void)> fn) {
    this->listeners.push_back(Listener{eventName, fn, true});
  }

  void dispatch(const char *eventName) {
    for (auto it = this->listeners.begin(); it != this->listeners.end(); ++it) {
      if (strcmp(it->eventName, eventName) == 0) {
        it->callback();

        if (it->isOnce) {
          this->listeners.erase(it--);
        }
      }
    }
  }
};

class WiFiManager {
private:
  ESP8266WiFiMulti *wifiMulti;
  EventDispatcher *dispatcher;
  bool connected = false;
  bool shouldConnect = false;

public:
  static constexpr const char *WiFiConnectedEvent = "wifi_connected";
  static constexpr const char *WiFiDisconnectedEvent = "wifi_disconnected";

  WiFiManager(ESP8266WiFiMulti *wifiMulti, EventDispatcher *dispatcher,
              const char *ssid, const char *password) {
    this->wifiMulti = wifiMulti;
    this->dispatcher = dispatcher;
    WiFi.mode(WIFI_STA);
    this->wifiMulti->addAP(ssid, password);
  }

  void connect() { this->shouldConnect = true; }

  void disconnect() {
    this->shouldConnect = false;
    WiFi.disconnect();
    this->connected = false;
    this->dispatcher->dispatch(WiFiManager::WiFiDisconnectedEvent);
  }

  void loop() {
    if (this->shouldConnect && !this->connected &&
        this->wifiMulti->run() == WL_CONNECTED) {
      this->connected = true;
      this->shouldConnect = false;
      this->dispatcher->dispatch(WiFiManager::WiFiConnectedEvent);
    }
  }
};

ESP8266WiFiMulti WiFiMulti;

#define RELAY_PIN D1
#define BUTTON_PIN D5
#define BUZZER_PIN D2

// Local WiFi Network credentials
// Ido's wifi network connection credentials
#define SSID "RTM"
#define PASSWORD "0528341534"

const char *cert PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIEkjCCA3qgAwIBAgITBn+USionzfP6wq4rAfkI7rnExjANBgkqhkiG9w0BAQsF
ADCBmDELMAkGA1UEBhMCVVMxEDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNj
b3R0c2RhbGUxJTAjBgNVBAoTHFN0YXJmaWVsZCBUZWNobm9sb2dpZXMsIEluYy4x
OzA5BgNVBAMTMlN0YXJmaWVsZCBTZXJ2aWNlcyBSb290IENlcnRpZmljYXRlIEF1
dGhvcml0eSAtIEcyMB4XDTE1MDUyNTEyMDAwMFoXDTM3MTIzMTAxMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaOCATEwggEtMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/
BAQDAgGGMB0GA1UdDgQWBBSEGMyFNOy8DJSULghZnMeyEE4KCDAfBgNVHSMEGDAW
gBScXwDfqgHXMCs4iKK4bUqc8hGRgzB4BggrBgEFBQcBAQRsMGowLgYIKwYBBQUH
MAGGImh0dHA6Ly9vY3NwLnJvb3RnMi5hbWF6b250cnVzdC5jb20wOAYIKwYBBQUH
MAKGLGh0dHA6Ly9jcnQucm9vdGcyLmFtYXpvbnRydXN0LmNvbS9yb290ZzIuY2Vy
MD0GA1UdHwQ2MDQwMqAwoC6GLGh0dHA6Ly9jcmwucm9vdGcyLmFtYXpvbnRydXN0
LmNvbS9yb290ZzIuY3JsMBEGA1UdIAQKMAgwBgYEVR0gADANBgkqhkiG9w0BAQsF
AAOCAQEAYjdCXLwQtT6LLOkMm2xF4gcAevnFWAu5CIw+7bMlPLVvUOTNNWqnkzSW
MiGpSESrnO09tKpzbeR/FoCJbM8oAxiDR3mjEH4wW6w7sGDgd9QIpuEdfF7Au/ma
eyKdpwAJfqxGF4PcnCZXmTA5YpaP7dreqsXMGz7KQ2hsVxa81Q4gLv7/wmpdLqBK
bRRYh5TmOTFffHPLkIhqhBGWJ6bt2YFGpn6jcgAKUj6DiAdjd4lpFw85hdKrCEVN
0FE6/V1dN2RMfjCyVSRCnTawXZwXgWHxyvkQAiSr6w10kY17RSlQOYiypok1JR4U
akcjMS9cmvqtmg5iUaQqqcT5NJ0hGA==
-----END CERTIFICATE-----
)EOF";

EventDispatcher dispatcher;
ESP8266WiFiMulti wifiMulti;
WiFiManager wifiManager(&wifiMulti, &dispatcher, SSID, PASSWORD);

void setClock() {
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);


  delay(1000);

  dispatcher.on(WiFiManager::WiFiConnectedEvent, []() {
    setClock();
    digitalWrite(LED_BUILTIN, HIGH);
  });

  dispatcher.on(WiFiManager::WiFiDisconnectedEvent,
                []() { digitalWrite(LED_BUILTIN, LOW); });

  dispatcher.once(WiFiManager::WiFiConnectedEvent,
                  []() { wifiManager.disconnect(); });

  wifiManager.connect();
}

void sendHttpRequest() {
  dispatcher.once(WiFiManager::WiFiConnectedEvent, [=]() {
    BearSSL::WiFiClientSecure client;
    BearSSL::X509List list(cert);
    client.setTrustAnchors(&list);

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // Establish the connection
    if (http.begin(client,
                   "https://fde6ljq3kb.execute-api.eu-central-1.amazonaws.com/executeAlert"
                   "hello")) {

      Serial.print("[HTTP] POST...\n");
      // start connection and send HTTP header, set the HTTP method and request
      // body
      int httpCode = http.POST("{\"message\":\"hello from ESP8266\"}");

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] POST... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK) {
          // read response body as a string
          String payload = http.getString();
          Serial.println(payload);
        }
      } else {
        // print out the error message
        Serial.printf("[HTTP] POST... failed, error: %s\n",
                      http.errorToString(httpCode).c_str());
      }

      // finish the exchange
      http.end();
    } else {
      Serial.printf("[HTTP] Unable to connect\n");
    }

    wifiManager.disconnect();
  });

  wifiManager.connect();
}

void loop() {
  wifiManager.loop();
  bool send = true;

  if(send){
    Serial.print("Sending request\n");
    sendHttpRequest();
    send = false;

  }
}