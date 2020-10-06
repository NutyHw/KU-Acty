import requests
import time
import random
import pandas as pd

allStudent = {
    'username' : [],
    'password' : []
}

allOrganizer = {
    'username' : [],
    'password' : []
}

def randomStudentId():
    number = random.randint(5600000000, 6100000000)
    return f'b{number}'

def randomPassword():
    number = [ str(i) for i in range(10) ]
    captialChar = [ chr(i) for i in range(65,91) ]
    nonCapChar = [ chr(i) for i in range(97,123) ]

    allValidChar = number + captialChar + nonCapChar

    return ''.join([ random.choice(allValidChar) for i in range(random.randint(6,20)) ])

def generateStudent():
    for i in range(200):
        payload = {
            'username' : randomStudentId(),
            'password' : randomPassword()
        }

        allStudent['username'].append(payload['username'])
        allStudent['password'].append(payload['password'])
        r = requests.post('http://localhost:3000/auth/register', json=payload)

        time.sleep(0.5);

def generateOrganizer():
    allUsername = list()
    with open('./username.txt') as f:
        allUsername = f.read().splitlines()

    for username in allUsername:
        payload = {
            'username' : username,
            'password' : randomPassword()
        }

        allOrganizer['username'].append(username)
        allOrganizer['password'].append(payload['password'])
        r = requests.post('http://localhost:3000/auth/register', json=payload)

        time.sleep(0.5);

if __name__ == '__main__':
    generateStudent()
    generateOrganizer()

    studentDf = pd.DataFrame(data=allStudent)
    orgDf = pd.DataFrame(data=allOrganizer)

    studentDf.to_csv('student.csv',index=False)
    orgDf.to_csv('organizer.csv',index=False)
