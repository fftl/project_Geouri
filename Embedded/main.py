import serial
import time
import threading
import requests
import face_recog_module
import asyncio
import websockets

class SmartMirror:
    persondetected = False
    detect_cnt = 0
    def ultrasonic_arduino(self):
        py_serial = serial.Serial(
            port='COM5',
            baudrate=9600,
        )

        while True:

            time.sleep(0.1)
            if py_serial.readable():
                # 들어온 값이 있으면 값을 한 줄 읽음 (BYTE 단위로 받은 상태)
                # BYTE 단위로 받은 response 모습 : b'\xec\x97\x86\xec\x9d\x8c\r\n'
                response = py_serial.readline()

                # 디코딩 후, 출력 (가장 끝의 \n을 없애주기위해 슬라이싱 사용)
                distance = float(response[:len(response) - 1].decode())

                if self.persondetected is False:
                    if distance < 15:
                        self.detect_cnt = self.detect_cnt + 1
                else:
                    if distance > 15:
                        self.detect_cnt = self.detect_cnt + 1

                if self.detect_cnt > 3:
                    if self.persondetected is False:
                        print(self.facerecogModule())
                    self.persondetected = not self.persondetected
                    self.detect_cnt = 0


    def facerecogModule(self):

        output = face_recog_module.face_recognitiontest()
        datas = {'name': output}
        url = "http://i8a201.p.ssafy.io:8080/test"

        output = ""
        try:
            response = requests.post(url, data=datas)
            output = response.text
            print(output)

        except requests.exceptions.Timeout as errd:
            print("Timeout Error : ", errd)

        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting : ", errc)

        except requests.exceptions.HTTPError as errb:
            print("Http Error : ", errb)

        # Any Error except upper exception
        except requests.exceptions.RequestException as erra:
            print("AnyException : ", erra)

        return output

    def check_person_infrontofmirror(self):
        while True:
            if self.persondetected:
                print("detected!",self.detect_cnt)
            else:
                print("not detected!",self.detect_cnt)
            time.sleep(0.5)

    def run(self):
        x = threading.Thread(target=self.ultrasonic_arduino, daemon=True)
        y = threading.Thread(target=self.check_person_infrontofmirror, daemon=True)
        x.start()
        y.start()


if __name__ == "__main__":
    sm = SmartMirror()
    sm.run()

    while True:
        time.sleep(0.1)