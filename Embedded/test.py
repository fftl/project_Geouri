import requests

if __name__ == '__main__':
    datas = {
        "serialNumber": "A201_12345",
        "memberKey": "1"
    }
    url = "http://i8a201.p.ssafy.io/mirror/member"

    response = requests.post(url, json=datas)
    response.encoding = 'UTF-8'
    print(response.text)
