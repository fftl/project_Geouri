import serial
import time
import threading
import requests
import face_recog_module
import socket
import asyncio
import websockets
import argparse

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
        # x = threading.Thread(target=self.ultrasonic_arduino, daemon=True)
        # y = threading.Thread(target=self.check_person_infrontofmirror, daemon=True)
        # x.start()
        # y.start()
        self.accept_func()

    def handle_client(client_socket, addr):
        print("접속한 클라이언트의 주소 입니다. : ", addr)
        user = client_socket.recv(1024)
        string = "안녕하세요? %s 님"%user.decode()
        client_socket.sendall(string.encode())
        print("1초 후 클라이언트가 종료됩니다.")
        time.sleep(1)
        client_socket.close()

    def accept_func(self):
        global server_socket
        #IPv4 체계, TCP 타입 소켓 객체를 생성
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        #포트를 사용 중 일때 에러를 해결하기 위한 구문
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        #ip주소와 port번호를 함께 socket에 바인드 한다.
        #포트의 범위는 1-65535 사이의 숫자를 사용할 수 있다.
        server_socket.bind(('localhost', 8889))

        #서버가 최대 5개의 클라이언트의 접속을 허용한다.
        server_socket.listen(5)

        while 1:
            try:
                #클라이언트 함수가 접속하면 새로운 소켓을 반환한다.
                client_socket, addr = server_socket.accept()
            except KeyboardInterrupt:
                server_socket.close()
                print("Keyboard interrupt")

            print("클라이언트 핸들러 스레드로 이동 됩니다.")
            #accept()함수로 입력만 받아주고 이후 알고리즘은 핸들러에게 맡긴다.
            t = threading.Thread(target=self.handle_client, args=(client_socket, addr))
            t.daemon = True
            t.start()


if __name__ == "__main__":

    # def __init__(self):
    #     start_server = websockets.serve(self.accept, "localhost", 9998);
    #     # 비동기로 서버를 대기한다.
    #     asyncio.get_event_loop().run_until_complete(start_server);
    #     asyncio.get_event_loop().run_forever();
    # async def accept(websocket, path):
    #     while True:
    #         # 클라이언트로부터 메시지를 대기한다.
    #         data = await websocket.recv();
    #         print("receive : " + data);
    #         # 클라인언트로 echo를 붙여서 재 전송한다.
    #         await websocket.send("echo : " + data);

    parser = argparse.ArgumentParser(description="\nJoo's server\n-p port\n")
    parser.add_argument('-p', help="port")

    args = parser.parse_args()
    try:
        port = int(args.p)
    except:
        pass




    sm = SmartMirror()
    sm.run()

    while True:
        time.sleep(0.1)