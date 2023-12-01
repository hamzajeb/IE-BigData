import json
from collections import Counter

# Charger les données JSON depuis le fichier en spécifiant l'encodage utf-8
with open('items.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Votre code pour détecter les doublons reste le même
# Extraire les titres dans une liste
titles = [item['title'] for item in data]

# Compter le nombre d'occurrences de chaque titre
title_occurrences = Counter(titles)

# Identifier les titres en double
duplicate_titles = {title: count for title, count in title_occurrences.items() if count > 1}

# Afficher les titres en double et leur nombre d'occurrences
for title, count in duplicate_titles.items():
    print(f"Titre: {title} - Nombre de duplications : {count}")
