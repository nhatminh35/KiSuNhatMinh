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


FirebaseData firebaseData;
FirebaseJson json;
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

uint8_t ID, ID_2 , DELETE_1, DELETE_2;
bool Value;

int CD1, CD2, CD3, CD4, CD5, CD6;
String array1;

char ssid[] = "Wokwi-GUEST";
char pass[] = ""; 

void setup() {
  Serial.begin(115200);
  Serial.println("Serial Active");
  delay(100);



  WiFi.begin(ssid, pass); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi Connected!");

  // Firebase config
  firebaseConfig.host = FIREBASE_HOST;
  firebaseConfig.signer.tokens.legacy_token = FIREBASE_SC;
 

  // Khởi tạo Firebase
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Firebase.reconnectWiFi(true); 

  Serial.println("Firebase Active");

  // Cấu hình chân xuất tín hiệu
  pinMode(LED_PIN, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);
  digitalWrite(LED_PIN, LOW);
}
void REG_FINGER_1(int ID){
 

  Serial.printf("\n HEHE %d" , ID);
  
}

void DELETE_FINGER_1(int ID){
  Serial.printf("\n hehe %d " , ID);
 
}
void CHECK(uint8_t *ID,bool *Value){
  digitalWrite(D5,1);
  digitalWrite(D6,1);
  if(Firebase.getInt(firebaseData, "/FINGER_DATA/check1")){
   int check1 = firebaseData.intData();
     if(check1 == 1){
      if(Firebase.getInt(firebaseData, "/FINGER_DATA/ID1")){
        *ID = firebaseData.intData();
        *Value = 1;
        REG_FINGER_1(*ID);
        digitalWrite(D5,0);
        Firebase.setInt(firebaseData, "/FINGER_DATA/check1", 3);
     } 
       }
    else if(check1 == 0){
      if(Firebase.getInt(firebaseData, "/FINGER_DATA/ID1")){
        *ID = firebaseData.intData();
        *Value = 0;
        DELETE_FINGER_1(*ID);
        digitalWrite(D6,0);
      Firebase.setInt(firebaseData, "/FINGER_DATA/check1", 3);   
    }
     }
       }

         }


void CHECK_DEVICE(){
  // Đọc trạng thái điều khiển từ Firebase
  if (Firebase.getInt(firebaseData, "/thietbi1/device1")) {
    CD1 = firebaseData.intData();
    digitalWrite(D1, CD1 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "/thietbi2/device2")) {
    CD2 = firebaseData.intData();
    digitalWrite(D2, CD2 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "/thietbi3/device3")) {
    CD3 = firebaseData.intData();
    digitalWrite(D3, CD3 == 1 ? LOW : HIGH);
  }

  if (Firebase.getInt(firebaseData, "/thietbi4/device4")) {
    CD4 = firebaseData.intData();
    digitalWrite(D4, CD4 == 1 ? LOW : HIGH);
  }




  // Gửi dữ liệu cảm biến lên Firebase
  json.clear();
  json.set("status", array1);
}


void loop() {
  CHECK_DEVICE();
  CHECK(&ID , &Value);
 
}
