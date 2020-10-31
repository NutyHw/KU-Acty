from pymongo import MongoClient
import random
import string
from pandas import read_csv, DataFrame
from dateutil.parser import parse
import requests
from bson.objectid import ObjectId

def connect():
    client = MongoClient(
        host= 'localhost',
        port=27018
    )
    return client.KU_ACTY

def generateUsername():
    '''
    return 200 username in list
    '''

    username = list()
    with open('./source/username.txt') as f:
        username = f.read().strip().splitlines()
    return username

def randomPassword():
    '''
    return strong password which will accept by KU-Acty website
    '''

    specialCharacter = [ '@', '$', '!', '%', '*', '#', '?', '&' ]
    number = [ str(i) for i in range(9) ]
    char = list(string.ascii_letters)

    chosenChar = [ random.choice(char) for i in range(random.randint(8,12)) ]
    chosenNumber = [ random.choice(number) for i in range(random.randint(1,3)) ]
    chosenSpecial = [ random.choice(specialCharacter) for i in range(random.randint(1,3)) ]

    password = chosenChar + chosenNumber + chosenSpecial
    random.shuffle(password)

    return ''.join(password)

def generateUser():
    temp = {
        'username' : list(),
        'password' : list()
    }
    for username in generateUsername():
        password = randomPassword()
        r = requests.post('http://localhost:3000/auth/register',{
            'username' : username,
            'password' : password,
            'role' : 'organizer'
        })
        temp['username'].append(username)
        temp['password'].append(password)

    df = DataFrame(temp)
    df.to_csv('user.csv')

def generateEvent():
    '''
    generate event from event.csv
    '''
    events = read_csv('./source/event.csv')
    db = connect()

    allUsers = read_csv('./user.csv')
    for row in events.iterrows():
        data = row[1]

        eventStart = parse(data['วันที่เริ่ม'])
        eventEnd = parse(data['วันที่จบ'])

        record = db.organizers.find_one({ 'organizer_name' : data['Organizer'].strip() })
        record2 = db.users.find_one({ '_id' : ObjectId(record['user']) })
        row = allUsers[ allUsers['username'] == record2['username'] ]

        username = row.iloc[0]['username']
        password = row.iloc[0]['password']

        r = requests.post(
            'http://localhost:3000/auth/login',
            { 
                'username' : username,
                'password' : password
            }
        ).json()

        accessToken = r['access_token']
        headers = {
            'Authorization' : 'Bearer ' + accessToken
        }

        r = requests.post(
            'http://localhost:3000/events',
            data={
                'event_name' : data['ชื่อกิจกรรม'],
                'organizer_id' : record['user'],
                'benefit_hour' : data['จำนวนชั่วโมง (ชม.)'],
                'place' : data['สถานที่'],
                'event_start_time' : eventStart,
                'event_end_time' : eventEnd,
                'contact' : data['ช่องทางการติดต่อ'],
                'status' : random.choice(['active', 'cancle', 'inactive']),
                'description' : data['รายละเอียด'],
                'event_type' : [ i.strip() for i in data['หมวด'].split(',') ]
            },
            headers = headers
        )

def generateOrg():
    '''
    generate organizer
    '''
    events = read_csv('./source/event.csv')
    allOrg = list()
    res = list()
    for idx, event in events.iterrows():
        allOrg.append(event['Organizer'].strip())

    db = connect()
    allId = [ record['_id'] for record in list(db.users.find()) ]

    for org in set(allOrg):
        r = requests.post(
            'http://localhost:3000/organizers/',
            {
                'organizer_name' : org,
                'user' : random.choice(allId),
                'email' : 'test@gmail.com',
                'contact' : 'test contact',
                'location' : 'test location',
                'description' : 'test description',
            }
        )

def generateNisit():
    '''
    generate nisit
    '''
    res = {
        'username' : [],
        'password' : []
    }

    for i in range(100):
        username = 'b' + str(random.randint(5.8e10,6.3e10))
        password = randomPassword()
        requests.post(
            url='http://localhost:3000/auth/register/',
            data= {
                'username' : username,
                'password' : password,
                'role' : 'nisit'
            }
        )
        res['username'].append(username)
        res['password'].append(password)
    df = DataFrame(res)
    df.to_csv('nisit.csv')

if __name__ == '__main__':
    generateNisit()
