import asyncio
import time

import websockets
async def connect():
    while True:
        async with websockets.connect("ws://127.0.0.1:9998/") as websocket:
            await websocket.send("test")
            await asyncio.sleep(1)
            print("client")
            response = await websocket.recv()
            print(response)


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(connect())