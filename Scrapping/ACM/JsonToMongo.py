import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['ScrappingItems']
collection = db['ACM']


with open('lasuite1.json') as file:
    file_data = json.load(file)

collection.insert_many(file_data)

print("Fichier JSON ajouté à la base de données MongoDB avec succès.")

client.close()