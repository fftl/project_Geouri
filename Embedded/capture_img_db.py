import requests
import cv2
import time
import sys
from requests_toolbelt import MultipartEncoder

url = 'http://i8a201.p.ssafy.io/mirror/snapShot/'

cap = cv2.VideoCapture(0)  # 노트북 웹캠을 카메라로 사용
cap.set(3, 640)  # 너비
cap.set(4, 480)  # 높이
ret, frame = cap.read()  # 사진 촬영
frame = cv2.flip(frame, 1)  # 좌우 대칭
# serialNumber = sys.argv[1] #js로 받아온 argment
# memberKey = sys.argv[2] #js로 받아온 argment

serialNumber = "8DLL-44yh-x7vB-VuWK"
memberKey = "60lm-pxTc"

current_time = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) # yyyy-mm-dd
pic_name = current_time + '_' + memberKey

cv2.imwrite(f'pictures/{pic_name}.jpg', frame)  # 사진 저장
cap.release()
cv2.destroyAllWindows()

file = ( f'{pic_name}.jpg',open(f'pictures/{pic_name}.jpg', 'rb'), 'image/jpeg')

field_data = {
    'serialNumber' : serialNumber,
    'memberKey' : memberKey,
    'imgFile': file,
    'imgName': pic_name+'.jpg',
}

m = MultipartEncoder(fields=field_data)
headers = {'Content-Type': m.content_type}

res = requests.post(url, headers=headers, data=m)

print(res.text)