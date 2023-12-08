from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import undetected_chromedriver as uc
import argparse
import json
from collections import Counter
import json

with open('./ISSN&JournalName.json', 'r', encoding="utf8") as file:
    data = json.load(file)

def most_common_element(elements):
    counter = Counter(elements)
    most_common = counter.most_common(1)
    return most_common[0][0] if most_common else None

# Configuration des arguments
parser = argparse.ArgumentParser(description='Description du script')
parser.add_argument('--subject', help='Get Subject')
parser.add_argument('--pageNumber', help='Get Page Number')
args = parser.parse_args()
updated_objects_list = []

driver = webdriver.Chrome()
for obj in data:
    i=0
    # journal_name="2769-6472"
    driver.get("https://www.scimagojr.com/journalsearch.php?q="+obj["journal_name"].replace(" ", "+"))
    sleep(3)
    try:
        # Find the text input element by its name, ID, class, or other attributes
        first_link = driver.find_element("css selector", '.search_results a')

        link = first_link.get_attribute('href')

        driver.get(link)
        
    except:
        i=i+1
        print("ISSN or journal name not exist number ",i)
    ##################
    try:
        country_link = driver.find_element("css selector",'.journalgrid a')

        country = country_link.text
        print(country)
        obj['country'] = country

        ##################
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Attente explicite (si nécessaire)
        button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '.combo_button.table_button'))
        )

        # Cliquez sur le bouton
        button.click()
        table = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'tbody'))
        )
        target_tr = []
        for row in table.find_elements(By.TAG_NAME, 'tr'):
            td_elements = row.find_elements(By.TAG_NAME, 'td')
            if len(td_elements) >= 2 and td_elements[1].text == "2022":
                target_tr.append(row.find_elements(By.TAG_NAME, 'td')[2].text)
        result = most_common_element(target_tr)
        print(result)
        obj['Quartile'] = result
    except:
        print("country_link or quartile not exist")
    # Write the updated object to the output file
    if 'Quartile' not in obj:
        obj['Quartile']=''
    if 'country' not  in obj:
        obj['country']=''
    # Add the updated object to the list
    updated_objects_list.append(obj)

    # Write the list of updated objects to the output file
    with open('QuartileAndCountry.json', 'w', encoding="utf8") as output_file:
        json.dump(updated_objects_list, output_file, ensure_ascii=False, indent=2)
driver.quit()


