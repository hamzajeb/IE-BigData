from pymongo import MongoClient

# Connexion à la base de données MongoDB
client = MongoClient('localhost', 27017)
db = client['ScrappingItems']

# Noms des collections à fusionner
collection_names = ['ACM', 'ieee','InderScienceOnline','ScienceDirect']

# Nouveau nom pour la collection fusionnée
merged_collection_name = 'allItems'

# Initialiser la nouvelle collection fusionnée
merged_collection = db[merged_collection_name]

for collection_name in collection_names:
    # Récupérer les documents de la collection actuelle
    current_collection = db[collection_name]
    documents = current_collection.find()

    # Insérer les documents dans la collection fusionnée
    merged_collection.insert_many(documents)

client.close()
