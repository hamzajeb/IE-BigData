import json
with open('items.json') as file:
    dataset = json.load(file)

with open('urls.json') as file:
    links = json.load(file)
for i, article in enumerate(dataset):
    if i < len(links):
        article['article_link'] = links[i]
    else:
        article['article_link'] = None 

with open("items1.json", "w") as write_file:
    # convert the list into a json file
    json.dump(dataset, write_file, indent=4)
