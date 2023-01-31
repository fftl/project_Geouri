import socket
import argparse
#접속하고 싶은 ip와 port를 입력받는 클라이언트 코드를 작성해보자.
# 접속하고 싶은 포트를 입력한다.
port = 9998

if __name__ == '__main__':

    host = 'localhost'
    user = 'react'
    #IPv4 체계, TCP 타입 소켓 객체를 생성
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # 지정한 host와 prot를 통해 서버에 접속합니다.
    client_socket.connect((host, port))
    client_socket.send(user.encode())

    while True:
        data = client_socket.recv(1024)
        print("recive : ", repr(data.decode()))


    # 소켓을 닫는다.
    client_socket.close()
    print("접속을 종료합니다.")