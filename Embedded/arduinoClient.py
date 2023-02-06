from websocket import create_connection
import serial
import time
import json
import face_recog_module
import requests

class FacerecogModule:
    def recog(self):
        output = face_recog_module.detected_face()
        return output


def sendInfo(msg):

    json_object = {
        "cmd": "face_name",
        "content": msg,
    }
    json_string = json.dumps(json_object)

    ws = create_connection("ws://localhost:9998")
    ws.send(json_string)
    ws.close()


def main():

    TIME_UNTIL_RECOG = 3    # 초음파 센서에 사람이 일정 거리 이내 들어왔을때 작동하는 시간
    TIME_UNTIL_RESET = 10   # 초음파 센서에 사람이 인식되지 않을 때 절전까지 대기하는 시간
    RECOG_DIST = 20         # 초음파 센서에 사람이 인식되는 거리

    person_detected = False
    detect_cnt = 0

    py_serial = serial.Serial(
        port='COM5',
        baudrate=9600,
    )

    while True:
        if py_serial.readable():
            response = py_serial.readline()
            distance = float(response[:len(response) - 1].decode())

            print(distance, detect_cnt, person_detected)
            if person_detected is False:  # newperson
                if distance < RECOG_DIST:
                    detect_cnt = detect_cnt + 1

                    if detect_cnt > TIME_UNTIL_RECOG:
                        # 얼굴 인식 후 전송
                        facemodule = FacerecogModule()
                        face_name = facemodule.recog()
                        sendInfo(face_name)

                        person_detected = not person_detected
                        detect_cnt = 0
                else:   # 사람이 인식되어 카운트 되는 도중에 다시 사람이 나갔을 때, 카운트 초기화
                    detect_cnt = 0
            else:
                if distance > 20:
                    detect_cnt = detect_cnt + 1

                    if detect_cnt > TIME_UNTIL_RESET:
                        message = "leave"
                        sendInfo(message)
                        person_detected = not person_detected
                        detect_cnt = 0
                else :
                    detect_cnt = 0

        time.sleep(0.5)


if __name__ == '__main__':
    main()
