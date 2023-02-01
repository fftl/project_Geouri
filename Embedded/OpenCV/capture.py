import cv2
import socket
import numpy

host = 'localhost'
port = 10000

sock = socket.socket()
sock.connect((host, port))

capture = cv2.VideoCapture(0)  # 노트북 내장 웹캠은 0, USB웹캠은 2로 하면 연결되었음.
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    cv2.imshow("original", frame)
    if cv2.waitKey(1) == ord('q'):  # 웹캠 프로그램을 종료할때는 키보드 q를 누름.
        # 사진 촬영 파일 저장
        #cv2.imwrite('capture.jpg', frame) 

        # 추출한 이미지를 String 형태로 변환(인코딩) 시키는 과정
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY),90]
        result, imgencode = cv2.imencode('.jpg', frame, encode_param)
        data = numpy.array(imgencode)
        stringData = data.tostring()

        # String 형태로 변환한 이미지를 socket을 통해서 전송
        sock.send(str(len(stringData)).ljust(16))
        sock.send(stringData)
        sock.close()

        # 다시 이미지로 디코딩해서 
        decimg = cv2.imdecode(data, 1) # imdecode(buf, flags) : buf는 이미지 데이터, flags는 이미지를 읽어야하는 방식을 지정
        break

capture.release()
cv2.destroyAllWindows()