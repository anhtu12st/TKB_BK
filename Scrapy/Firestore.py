import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate(
    '/Users/anhtu12st/Documents/Programing/TKB_BK/Scrapy/admin.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

doc_ref = db.collection('tkb').document('M7jdcWgSUChlJEUzKTDKJEEszT83')


def getPrev():
    docs = db.collection('tkb').stream()
    for doc in docs:
        global ob
        ob = doc.to_dict()

    str = ob['data']
    return str[-23:-2]


def updateData(data):
    doc_ref.set({
        'data': data
    })
