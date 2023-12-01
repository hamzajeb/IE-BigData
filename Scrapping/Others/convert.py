import json
with open('items0.json') as file:
    first_dataset = json.load(file)
second_dataset = []
# Création d'un nouveau dataset selon le format attendu pour tous les objets dans first_dataset
for data_entry in first_dataset:
    new_entry = {
        "title": data_entry["Title"],
        "abstract": data_entry["Abstract"],
        "doi": data_entry["DOI"],
        "publisher": data_entry["Publisher"],
        "date_publication": data_entry["Date"],
        "issn": None,
        "total_usage": None,
        "keywords": None,
        "authors": [
            {"Name": author, "Information": location}
            for author, location in zip(data_entry["Authors"], data_entry["Locations"])
        ]
    }
    second_dataset.append(new_entry)

with open("items.json", "w") as write_file:
    # convert the list into a json file
    json.dump(second_dataset, write_file, indent=4)
