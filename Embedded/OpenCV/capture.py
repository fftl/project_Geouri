import cv2

capture = cv2.VideoCapture(0)  # 노트북 내장 웹캠은 0, USB웹캠은 2로 하면 연결되었음.
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    cv2.imshow("original", frame)
    if cv2.waitKey(1) == ord('q'):  # 웹캠 프로그램을 종료할때는 키보드 q를 누름.
        cv2.imwrite('capture.jpg', frame) # 사진 촬영 파일 저장
        break

capture.release()
cv2.destroyAllWindows()