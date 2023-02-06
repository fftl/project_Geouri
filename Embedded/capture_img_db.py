import requests
import numpy as np
import cv2
import time
import sys

#files = open('blackpink.png', 'rb')
uri = 'http://i8a201.p.ssafy.io/'

cap = cv2.VideoCapture(0)  # 노트북 웹캠을 카메라로 사용
cap.set(3, 640)  # 너비
cap.set(4, 480)  # 높이

ret, frame = cap.read()  # 사진 촬영
frame = cv2.flip(frame, 1)  # 좌우 대칭

userKey = int(sys.argv) #js로 받아온 argment
nowtime = time.strftime('%Y-%m-%d', time.localtime(time.time())) # yyyy-mm-dd
pic_name = nowtime + '_' + userKey

cv2.imwrite(f'{pic_name}.jpg', frame)  # 사진 저장
files = open(f'{pic_name}.jpg', 'rb')
upload = {'file': files}

res = requests.post(url, files = upload)

cap.release()
cv2.destroyAllWindows()