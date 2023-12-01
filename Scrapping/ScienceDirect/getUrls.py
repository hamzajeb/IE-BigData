from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from lib2to3.pgen2 import driver
from time import sleep
from selenium.webdriver.common.by import By
import json
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.support import expected_conditions


current_page = 1
turn_it = True
all_links = list()

def get_items(driver):
    items= driver.find_elements(By.CLASS_NAME, 'ResultItem.col-xs-24.push-m')
    return items

def get_links(driver,items):
    for index, val in enumerate(items):
        items = driver.find_elements(By.CLASS_NAME, 'ResultItem.col-xs-24.push-m')
        url = items[index].find_element(By.XPATH, './div[1]/div[2]/h2[1]/span[1]/a[1]').get_attribute('href')
        dico_journal = url

        all_links.append(dico_journal)
    return all_links



while (turn_it):
    dico_journal = {}
    driver = webdriver.Chrome()
    url = "https://www.sciencedirect.com/search?qs=blockchain&show=100&offset=" + str(current_page)+"00"
    driver.get(url)
    sleep(3)

    items = get_items(driver)

    if items == []:
        #no more journals
        turn_it = False
    
    all_links = get_links(driver,items)


    driver.close

    current_page += 1

    if (dico_journal == {}):
        turn_it = False


with open("urls.json", "w") as write_file:
    json.dump(all_links, write_file, indent=4)

driver.close()