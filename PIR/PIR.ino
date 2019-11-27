#include <ESP8266WiFi.h>
#include <ArduinoWebsockets.h>

const char* ssid = "HitronAL2.4";
const char* password = "lu19920403";

const int ledPin = 0;
const int pirPin = 4;
const int armedLed = 2;
boolean armed = false;

using namespace websockets;
WebsocketsClient client;

void onMessageCallback(WebsocketsMessage message) {
  Serial.print("Got Message: ");
  Serial.println(message.data());
  if (message.data() == "on") {
    armed = true;
    digitalWrite(armedLed, HIGH);
  } else if (message.data() == "off") {
    armed = false;
    digitalWrite(ledPin, LOW);
    digitalWrite(armedLed, LOW);
  }
}

void onEventsCallback(WebsocketsEvent event, String data) {
  if (event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Connnection Opened");
    client.send("{\"event\":\"add_device\",\"name\":\"Office Motion\",\"type\":\"Motion\",\"mac\":\"" + WiFi.macAddress() + "\",\"status\":false}");
  } else if (event == WebsocketsEvent::ConnectionClosed) {
    Serial.println("Connnection Closed");
  } else if (event == WebsocketsEvent::GotPing) {
    Serial.println("Got a Ping!");
    client.send("{\"event\":\"ping_response\",\"mac\":\"" + WiFi.macAddress() + "\"}");
  } else if (event == WebsocketsEvent::GotPong) {
    Serial.println("Got a Pong!");
  }
}




void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(armedLed, OUTPUT);
  pinMode(pirPin, INPUT);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected established!");
  Serial.print("IP: ");
  Serial.print(WiFi.localIP());
  Serial.println("");
  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);
  client.connect("ws://192.168.0.12:3000/ws");
  digitalWrite(armedLed, LOW);
  delay(5000);
}

void loop() {
  client.poll();
//put your main code here, to run repeatedly:
  int pirVal = digitalRead(pirPin);
  if (armed) {
    if (pirVal == HIGH) {
      digitalWrite(ledPin, HIGH);
      client.send("{\"event\":\"device_event\",\"name\":\"Office Motion\",\"type\":\"Motion\",\"mac\":\"" + WiFi.macAddress() + "\",\"message\":\"Motion detected.\"}");
      delay(1000);
      digitalWrite(ledPin, LOW);
      delay(5000);
    } else if (pirVal == LOW) {
      digitalWrite(ledPin, LOW);
    }
  }
  delay(500);
}
