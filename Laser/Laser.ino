#include <ESP8266WiFi.h>
#include <ArduinoWebsockets.h>

const char* ssid = "HitronAL2.4";
const char* password = "lu19920403";

const int ldrPin = A0;
const int laser = 5;
int ldrBase;
boolean armed = false;

using namespace websockets;
WebsocketsClient client;

void onMessageCallback(WebsocketsMessage message) {
  Serial.print("Got Message: ");
  Serial.println(message.data());
  if (message.data() == "on") {
    armed = true;
    digitalWrite(laser, HIGH);
  } else if (message.data() == "off") {
    armed = false;
    digitalWrite(laser, LOW);
  }
}

void onEventsCallback(WebsocketsEvent event, String data) {
  if (event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Connnection Opened");
    client.send("{\"event\":\"add_device\",\"name\":\"Doorway Laser\",\"type\":\"Laser\",\"mac\":\"" + WiFi.macAddress() + "\",\"status\":false}");
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
  pinMode(laser, OUTPUT);
  pinMode(ldrPin, INPUT);
  digitalWrite(laser, LOW);
  ldrBase = analogRead(ldrPin);
  delay(500);

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

}

void loop() {
  client.poll();
//put your main code here, to run repeatedly:
  int ldrVal = analogRead(ldrPin);
  //  Serial.println(ldrBase);
  //  Serial.println(ldrVal);
  if (armed) {
    if (ldrVal < ldrBase) {
      client.send("intruder");
      Serial.println("Intruder!");
    }
  }
  delay(200);
}
