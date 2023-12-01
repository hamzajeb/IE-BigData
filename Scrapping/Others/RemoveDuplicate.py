import json

# Charger le fichier JSON
with open('test.json', 'r', encoding='utf-8') as file:

    data = json.load(file)

# Utiliser un ensemble (set) pour stocker des clés uniques
unique_objects = []
seen_ids = set()

# Filtrer les objets en double
for obj in data:
    obj_id = obj['title']
    if obj_id not in seen_ids:
        unique_objects.append(obj)
        seen_ids.add(obj_id)

# Écrire les objets uniques dans un nouveau fichier JSON
with open('data_unique.json', 'w') as output_file:
    json.dump(unique_objects, output_file, indent=4)
