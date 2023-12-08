import json
with open('../allItems.json', 'r', encoding="utf8") as file:
    allItems = json.load(file)

with open('./QuartileAndCountry.json', 'r', encoding="utf8") as file:
    quartilesCountries = json.load(file)


# Create a dictionary for faster lookups
lookup_dict = {(entry["issn"], entry["journal_name"]): {"Quartile": entry["Quartile"], "country": entry["country"]} for entry in quartilesCountries}

# Update allItems with Quartile and country information
for entry in allItems:
    if"journal_name" in entry:
        key = (entry["issn"], entry["journal_name"])
        if key in lookup_dict:
            entry["Quartile"] = lookup_dict[key]["Quartile"]
            entry["country"] = lookup_dict[key]["country"]
            del entry["_id"]
    else:
        entry["Quartile"] = None
        entry["country"] = None
        del entry["_id"]


with open('allItemsWithQuartiles.json', 'w') as output_file:
    json.dump(allItems, output_file, indent=2)
