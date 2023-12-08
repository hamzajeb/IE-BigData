import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['ScrappingItems']
collection = db['Quartiles']


with open('QuartileAndCountry.json') as file:
    file_data = json.load(file)

collection.insert_many(file_data)

client.close()