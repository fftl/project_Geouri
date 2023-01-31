import asyncio
import websockets
import face_recog_module
import requests

CONNECTIONS = set()


class FacerecogModule:
    async def recog(self):
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



async def handler(websocket):

    CONNECTIONS.add(websocket)
    print("handler start", CONNECTIONS)

    while True:
        try:
            message = await websocket.recv()
            if message.strip() == 'react':
                reply = "react"
                websockets.broadcast(CONNECTIONS, reply)
            await websocket.wait_closed()
        finally:
            CONNECTIONS.remove(websocket)
        break

    # if name == 'newperson':
    #     detection = FacerecogModule()
    #     detected_person = detection.recog()
    #     await websocket.send(detected_person)
    # await websocket.send(name)

async def test():
    while True:
        await asyncio.sleep(1)


async def main():
    async with websockets.serve(handler, "localhost", 9998):
        # await asyncio.Future()  # run forever
        await test()
if __name__ == "__main__":
    asyncio.run(main())