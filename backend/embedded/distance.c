
int trigPin = 11;    //trig 핀 설정
int echoPin = 12;    //echo 핀 설정

void setup()
{
  Serial.begin(9600);  //시리얼 통신
  pinMode(trigPin, OUTPUT);  //trigPin모드 OUTPUT
  pinMode(echoPin, INPUT);  //echoPin모드 INPUT
}

void loop()
{
  float duration, distance;  //변수 선언
  digitalWrite(trigPin, HIGH);  //trigPin HIGH
  delay(10);  //0.01초 딜레이
  digitalWrite(trigPin, LOW);  //trigPin LOW

  duration  = pulseIn(echoPin, HIGH);   //echoPin 이 HIGH를 유지한 시간을 저장한다.
  distance  = ((float)(340 * duration)  / 10000)  / 2;    //거리계산  

  print("distance : %f", distance);  //시리얼 모니터에 문자 출력

    
  delay(1000);  //딜레이 1초
}