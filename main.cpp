#define FIREBASE_HOST "minhnode-1eacf-default-rtdb.firebaseio.com"
#define FIREBASE_SC "pEPj37MbbZQGWcXvDWzHQsmcGPkRmdC4qlbubWwq"
#define D1 5
#define D2 16
#define D3 4
#define D4 0
#define D5 2
#define D6 15
#define LED_PIN 26

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <FirebaseESP32.h>
#include <DHTesp.h>

FirebaseData firebaseData;
FirebaseJson json;
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;
DHTesp dht;

int t, h;
int CD1, CD2, CD3, CD4, CD5, CD6;
String array1;

// Thông tin Wi-Fi
const char* ssid = "Wokwi-GUEST";
const char* pass = "";  // Wi-Fi không mật khẩu

void setup() {
  Serial.begin(115200);
  Serial.println("Serial Active");
  delay(1000);

  // Khởi động DHT11 tại chân GPIO 17
  dht.setup(17, DHTesp::DHT11);

  // Kết nối Wi-Fi
  WiFi.begin(ssid, pass); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");

  // Firebase config
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_SC;

  // Khởi tạo Firebase
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true); 
  Serial.println("Firebase Active");

  // Thiết lập chân đầu ra
  pinMode(LED_PIN, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);

  digitalWrite(LED_PIN, LOW);
}

void loop() {
  if (Firebase.getInt(firebaseData, "thietbi1/device1")) {
    CD1 = firebaseData.intData();
    digitalWrite(D1, CD1 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "thietbi2/device2")) {
    CD2 = firebaseData.intData();
    digitalWrite(D2, CD2 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "thietbi3/device3")) {
    CD3 = firebaseData.intData();
    digitalWrite(D3, CD3 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "thietbi4/device4")) {
    CD4 = firebaseData.intData();
    digitalWrite(D4, CD4 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "thietbi5/device1")) {
    CD5 = firebaseData.intData();
    digitalWrite(D5, CD5 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "thietbi6/device1")) {
    CD6 = firebaseData.intData();
    digitalWrite(D6, CD6 == 1 ? LOW : HIGH);
  }

  t = dht.getTemperature();
  h = dht.getHumidity();

  if (t != 0 && h != 0)
    array1 = "done";
  else
    array1 = "error";

  json.set("CHAR", array1);
  json.set("temperature", t); 
  json.set("humidity", h);

  // Cập nhật dữ liệu lên Firebase
  bool check = Firebase.updateNode(firebaseData, "/Sensor", json);
  if (check) {
    Serial.println("done");
    digitalWrite(LED_PIN, HIGH);
  } else {
    Serial.print("Error: ");
    Serial.println(firebaseData.errorReason());
    digitalWrite(LED_PIN, LOW);
  }

  delay(2000);  // Thêm delay để tránh quá tải Firebase
}
