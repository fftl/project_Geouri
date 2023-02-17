'''
    (py3) $ pip install opencv-python
    (py3) $ pip install opencv-contrib-python
    (py3) $ pip install cmake (dlib설치 오류 해결)
    (py3) $ pip install dlib
    (py3) $ pip install face_recognition
    (py3) $ pip install flask
'''

import face_recognition
import cv2
import os
import numpy as np


class FaceRecog():
    def __init__(self):
        self.camera = cv2.VideoCapture(0)
        self.known_face_encodings = []
        self.known_face_names = []

        # Load sample pictures and learn how to recognize it.
        dirname = 'knowns'
        files = os.listdir(dirname)
        for filename in files:
            name, ext = os.path.splitext(filename)
            if ext == '.jpg':
                self.known_face_names.append(name)
                pathname = os.path.join(dirname, filename)
                img = face_recognition.load_image_file(pathname)
                face_encoding = face_recognition.face_encodings(img)[0]
                self.known_face_encodings.append(face_encoding)

        # Initialize some variables
        self.found_face = False
        self.face_locations = []
        self.face_encodings = []
        self.face_name = ""
        self.process_this_frame = True

    def __del__(self):
        del self.camera

    def destroycamera(self):
        self.camera.release()

    def get_frame(self):
        # Grab a single frame of video
        ret, frame = self.camera.read()

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if self.process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            self.face_locations = face_recognition.face_locations(rgb_small_frame)
            self.face_encodings = face_recognition.face_encodings(rgb_small_frame, self.face_locations)

            for face_encoding in self.face_encodings:
                # See if the face is a match for the known face(s)
                distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                min_value = min(distances)

                # tolerance: How much distance between faces to consider it a match. Lower is more strict.
                # 0.6 is typical best performance.
                name = "Unknown"
                if min_value < 0.6:
                    index = np.argmin(distances)
                    name = self.known_face_names[index]
                    if self.face_name == name and self.face_name != "":
                        self.found_face = True
                    self.face_name = name

        self.process_this_frame = not self.process_this_frame

        return frame


def detected_face():
    face_recog = FaceRecog()
    while not face_recog.found_face:
        face_recog.get_frame()
        cv2.waitKey(10)

    face_recog.destroycamera()
    cv2.destroyAllWindows()
    return face_recog.face_name
