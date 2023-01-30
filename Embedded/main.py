import serial
import time
import os
import requests
import sys




def arduinotest():
    py_serial = serial.Serial(
        port='COM5',
        baudrate=9600,
    )

    cnt = 0

    while True:

        time.sleep(0.1)
        if py_serial.readable():
            # 들어온 값이 있으면 값을 한 줄 읽음 (BYTE 단위로 받은 상태)
            # BYTE 단위로 받은 response 모습 : b'\xec\x97\x86\xec\x9d\x8c\r\n'
            response = py_serial.readline()

            # 디코딩 후, 출력 (가장 끝의 \n을 없애주기위해 슬라이싱 사용)
            distance = float(response[:len(response) - 1].decode())
            if distance < 15:
                cnt = cnt + 1
            print(distance, cnt)

            if cnt > 4 :
                break;

def facerecog() :
    print("face recog start")
    stream = os.popen('python face_recog.py')
    output = stream.read().strip()

    datas = {'name' : output}
    url = "http://i8a201.p.ssafy.io:8080/test"

    output = ""
    try:
        response = requests.post(url, data=datas)
        output = response.text

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


if __name__ == "__main__":
    while True:
        arduinotest()
        print(facerecog())
    sys.exit()