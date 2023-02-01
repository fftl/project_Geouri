from websocket import create_connection
import serial
import time
import json
import face_recog_module
import requests

class FacerecogModule:
    def recog(self):
        output = face_recog_module.detected_face()
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

        json_object = { "user_name" : output}
        json_string = json.dumps(json_object)
        return json_string


def sendInfo(msg):
    ws = create_connection("ws://localhost:9998")
    ws.send(msg)
    ws.close()


if __name__ == '__main__':

    host = 'localhost'
    user = 'arduino'
    port = 9998

    person_detected = False
    detect_cnt = 0

    py_serial = serial.Serial(
        port='COM5',
        baudrate=9600,
    )

    while True:
        if py_serial.readable():
            # 들어온 값이 있으면 값을 한 줄 읽음 (BYTE 단위로 받은 상태)
            # BYTE 단위로 받은 response 모습 : b'\xec\x97\x86\xec\x9d\x8c\r\n'
            response = py_serial.readline()

            # 디코딩 후, 출력 (가장 끝의 \n을 없애주기위해 슬라이싱 사용)
            distance = float(response[:len(response) - 1].decode())

            print(distance, detect_cnt, person_detected)
            if person_detected is False:
                if distance < 20:
                    detect_cnt = detect_cnt + 1
            else:
                if distance > 20:
                    detect_cnt = detect_cnt + 1

            if detect_cnt > 3:
                if person_detected is False: #newperson
                    facemodule = FacerecogModule()
                    face_name = facemodule.recog()
                    sendInfo(face_name)
                else:
                    message = "leave"
                    sendInfo(message)
                person_detected = not person_detected
                detect_cnt = 0
        time.sleep(0.5)
