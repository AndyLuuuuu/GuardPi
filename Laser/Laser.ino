#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* ssid = "HitronAL2.4";
const char* password = "lu19920403";
const char* mqtt_server = "postman.cloudmqtt.com";
const int mqtt_port = 15145;
const char* mqtt_username = "yrahqccv";
const char* mqtt_password = "IJBjDBMUekyr";
byte mac[6];

DynamicJsonDocument doc(1024);
const int ldrPin = A0;
const int laser = 5;
const int armedLed = 0;
int ldrBase;
boolean armed = false;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(laser, OUTPUT);
  pinMode(ldrPin, INPUT);
  pinMode(armedLed, OUTPUT);
  digitalWrite(armedLed, LOW);
  digitalWrite(laser, LOW);
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

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  WiFi.macAddress(mac);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP8266Client", mqtt_username, mqtt_password )) {
      Serial.println("connected");
      ldrBase = analogRead(ldrPin);
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }


  client.subscribe("/sensorEvents");
  client.publish("/connectionEvents", (char*) String("{\"type\":\"laser\",\"state\":" + String(armed) + ",\"deviceName\":\"Doorway\", \"mac\":\"" + String(WiFi.macAddress()) + "\"}").c_str()); //Topic name
}

void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
    Serial.print((char)payload[i]);
  }
  deserializeJson(doc, message);
  JsonObject json = doc.as<JsonObject>();
  String cmd = json["cmd"];
  String mac = json["mac"];

  if (cmd == "ARM") {
    if (mac == String(WiFi.macAddress())) {
      armed = true;
      digitalWrite(armedLed, HIGH);
    }
  } else if (cmd == "DISARM") {
    if (mac == String(WiFi.macAddress())) {
      armed = false;
      digitalWrite(armedLed, LOW);
    }
  }
  
  Serial.println(cmd);
  Serial.println();
  Serial.println("-----------------------");
}

void loop() {
  client.loop();
//put your main code here, to run repeatedly:
  int ldrVal = analogRead(ldrPin);
  //  Serial.println(ldrBase);
  //  Serial.println(ldrVal);
  if (armed) {
    if (ldrVal < ldrBase) {
//      client.publish("/systemEvents", "Laser triggered.");
      Serial.println("Intruder!");
      delay(3000);
    }
  }
  delay(250);
}
