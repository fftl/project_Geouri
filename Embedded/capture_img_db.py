import requests
import numpy as np
import cv2
import time
import sys

#files = open('blackpink.png', 'rb')
url = 'http://i8a201.p.ssafy.io/mirror/snapShot/'

cap = cv2.VideoCapture(0)  # 노트북 웹캠을 카메라로 사용
cap.set(3, 640)  # 너비
cap.set(4, 480)  # 높이

ret, frame = cap.read()  # 사진 촬영
frame = cv2.flip(frame, 1)  # 좌우 대칭

"""serialNumber = sys.argv[1] #js로 받아온 argment
memberKey = sys.argv[2] #js로 받아온 argment"""

"""nowtime = time.strftime('%Y-%m-%d', time.localtime(time.time())) # yyyy-mm-dd
pic_name = nowtime + '_' + memberKey"""

"""cv2.imwrite(f'{pic_name}.jpg', frame)  # 사진 저장
files = open(f'{pic_name}.jpg', 'rb')
upload = {
    'serialNumber' : serialNumber,
    'memberKey' : memberKey,
    'imgFile': files,
    'imgName' : pic_name,
}"""

cv2.imwrite('hi.jpg', frame)  # 사진 저장

file = open('hi.jpg', 'rb')
upload = {
    "serialNumber" : "s9A1-4kc5-io7S-1Kw8",
    "memberKey" : 6,
    "imgFile": file,
    "imgName" : 'hi'
}

res = requests.post(url, files = upload)
print(res.text)
cap.release()
cv2.destroyAllWindows()