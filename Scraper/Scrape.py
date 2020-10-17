import requests
import json
from bs4 import BeautifulSoup
from Firestore import updateData, getPrev

session = requests.session()
##################################################################
# Get lt-key and execution-key from login page
login_url = 'https://sso.hcmut.edu.vn/cas/login?service=http%3A%2F%2Fmybk.hcmut.edu.vn%2Fstinfo%2F'
res = session.get(login_url)
soup = BeautifulSoup(res.text, 'html.parser')
lt = soup.find('input', {'name': 'lt'}).get('value')
exe = soup.find('input', {'name': 'execution'}).get('value')

##################################################################
# Login to page
login_data = {
    'username': 'tu.phananhtu12st',
    'password': '2001stKh',
    'lt': lt,
    'execution': exe,
    '_eventId': 'submit',
    'submit': 'Đăng nhập'
}
res = session.post(login_url, data=login_data)

# Get token
token = BeautifulSoup(res.text, 'html.parser').find(
    'meta', {'name': '_token'}).get('content')
##################################################################
# Get timetable
tb_url = 'https://mybk.hcmut.edu.vn/stinfo/lichthi/ajax_lichhoc'
res = session.post(tb_url, data={'_token': token})

data = json.loads(res.text)[0]
if getPrev() == data['ngay_cap_nhat']:
    print("Updated Already.")
else:
    print('Last update:', data['ngay_cap_nhat'])

with open('data.json', 'w') as fs:
    fs.write(json.dumps(data))
    updateData(json.dumps(data))
