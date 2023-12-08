import json

with open('../allItems.json', 'r', encoding="utf8") as file:
    data = json.load(file)

unique_objects = {}

# Filtrer les objets uniques
for obj in data:
    # puisque il exise plusieurs journaux peut possede meme jouurnal_name avec diff ISSN
    key = (obj.get('issn'), obj.get('journal_name'))
    if key not in unique_objects and key != ("","") and key != (None,None):
        unique_objects[key] = {'issn': obj.get('issn'), 'journal_name': obj.get('journal_name')}

filtered_objects = list(unique_objects.values())

# Enregistrer les objets filtrés dans un nouveau fichier JSON
with open('ISSN&JournalName.json', 'w') as output_file:
    json.dump(filtered_objects, output_file, indent=2)
