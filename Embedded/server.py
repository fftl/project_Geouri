import socket
import requests
import threading
import face_recog_module
import time

host = 'localhost'
port = 9998


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

        return output


def handle_client(client_socket, client_sockets, addr):
    client_sockets.append(client_socket)
    print("접속한 클라이언트의 주소 입니다. : ", addr)
    user = client_socket.recv(1024).decode().strip()
    print('접속한 클라이언트 -> ', user)

    while True:
        try:
            data = client_socket.recv(1024)
            # test = "hihih"
            # client_socket.send(test.encode())
            if not data:
                print('>> Disconnected by ' + addr[0], ':', addr[1])
                break
            cmd = data.decode();
            print('>> Received from ' + addr[0], ':', addr[1], cmd)


            hellomsg = "hello"
            for client in client_sockets:
                client.send(hellomsg.encode())



            # if cmd == 'newperson':
            #     detection = FacerecogModule()
            #     detected_person = detection.recog()
            #     for client in client_sockets:
            #         client.send(detected_person.encode())




        except ConnectionResetError as e:
            print('>> Disconnected by ' + addr[0], ':', addr[1])
            client_sockets.remove(client_socket)
            break

    client_socket.close()







    # string = "안녕하세요? %s 님"%user.decode()
    # client_socket.sendall(string.encode())
    # print("1초 후 클라이언트가 종료됩니다.")
    # time.sleep(1)
    # client_socket.close()

def accept_func():
    global server_socket
    #IPv4 체계, TCP 타입 소켓 객체를 생성
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #포트를 사용 중 일때 에러를 해결하기 위한 구문
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    #ip주소와 port번호를 함께 socket에 바인드 한다.
    #포트의 범위는 1-65535 사이의 숫자를 사용할 수 있다.
    server_socket.bind((host, port))
    #서버가 최대 5개의 클라이언트의 접속을 허용한다.
    server_socket.listen(5)

    client_sockets = []


    while 1:
        try:
            #클라이언트 함수가 접속하면 새로운 소켓을 반환한다.
            client_socket, addr = server_socket.accept()
        except KeyboardInterrupt:
            server_socket.close()
            print("Keyboard interrupt")

        print("클라이언트 핸들러 스레드로 이동 됩니다.")
        #accept()함수로 입력만 받아주고 이후 알고리즘은 핸들러에게 맡긴다.
        t = threading.Thread(target=handle_client, args=(client_socket, client_sockets, addr))
        t.daemon = True
        t.start()


if __name__ == '__main__':
    accept_func()