from websocket import create_connection
import time
import json
import face_recog_module



def sendInfo(msg):
    json_object = {
        "cmd": "face_name",
        "content": msg,
    }
    json_string = json.dumps(json_object)

    ws = create_connection("ws://localhost:9998")
    ws.send(json_string)
    ws.close()


if __name__ == '__main__':
    output = face_recog_module.detected_face()
    sendInfo(output)

        
