import requests
import numpy as np
import cv2
import time
import sys
from requests_toolbelt import MultipartEncoder

#files = open('blackpink.png', 'rb')
url = 'http://i8a201.p.ssafy.io/mirror/snapShot/'

# cap = cv2.VideoCapture(0)  # 노트북 웹캠을 카메라로 사용
# cap.set(3, 640)  # 너비
# cap.set(4, 480)  # 높이
# ret, frame = cap.read()  # 사진 촬영
# frame = cv2.flip(frame, 1)  # 좌우 대칭


serialNumber = sys.argv[1] #js로 받아온 argment
memberKey = sys.argv[2] #js로 받아온 argment

print(serialNumber)
print(memberKey)


# serialNumber = "8DLL-44yh-x7vB-VuWK"
# memberKey = "60lm-pxTc"
#
# nowtime = time.strftime('%Y-%m-%d', time.localtime(time.time())) # yyyy-mm-dd
# pic_name = nowtime + '_' + memberKey
#
# cv2.imwrite(f'{pic_name}.jpg', frame)  # 사진 저장
# file = ( f'{pic_name}.jpg',open(f'{pic_name}.jpg', 'rb'), 'image/jpeg')
#
# field_data = {
#     'serialNumber' : serialNumber,
#     'memberKey' : memberKey,
#     'imgFile': file,
#     'imgName': pic_name+'.jpg',
# }
#
# m = MultipartEncoder(fields=field_data)
# headers = {'Content-Type': m.content_type}
#
# res = requests.post(url, headers=headers, data=m)
# print(res)
# print(res.text)



# cap.release()
# cv2.destroyAllWindows()