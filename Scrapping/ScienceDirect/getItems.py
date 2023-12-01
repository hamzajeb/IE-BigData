import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from lib2to3.pgen2 import driver
from time import sleep
from selenium.webdriver.common.by import By
import json
from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import WebDriverException


current_link = 1
turn_it = True
all_items = list()

#getting title
def get_title(content):
    try:
        title_object = content.find_element(By.XPATH, './h1[1]')
        title = title_object.find_element(By.XPATH, './span[1]').text
    except:
        title= None
        print("title not found")
    return title

def get_doi(content):
    try:
        doi_link = content.find_element(By.XPATH, './div[3]')
        doi = doi_link.find_element(By.XPATH, "./a[1]").get_attribute('href')
    except:
        doi = None
        print("doi not found")
    return doi

#getting abstract
def get_abstract(content):
    try:
        abstract_div =content.find_element(By.CLASS_NAME, 'Abstracts')
        abstract_text = abstract_div.find_element(By.XPATH, "./div[1]/div[1]/p[1]").text
    except:
        abstract_text = None
        print("abstract not found")
    return abstract_text


def get_publisher(content):
    try:
        pub = content.find_element(By.XPATH, './div[1]')
        publisher_text = pub.find_element(By.XPATH, './div[2]/h2[1]/a[1]').text
    except:
        publisher_text = None
        print("publisher not found")
    return publisher_text

#getting date
def get_date_publication(content):
    try:
        div = content.find_element(By.XPATH, './div[1]')
        Date = div.find_element(By.XPATH, './div[2]/div[1]').text
    except:
        date = None
        print("date publication not found")
    return date

#getting authors
def get_authors(content):
    Authors = []
    Locations = []
    try:
        div = content.find_element(By.XPATH, './div[2]')
        AuthorObj = div.find_element(By.XPATH, './div[1]/div[1]/div[1]')
        listauthors = AuthorObj.find_elements(By.XPATH, "./button")
        for auth in listauthors:
            author = auth.find_element(By.XPATH, './span[1]').textAuthors.append(author)
            Authors.append(author)
        for auth in listauthors:
            auth.click()
            sleep(4)
            Location = driver.find_element(By.CLASS_NAME, "affiliation").text
            Locations.append(Location)
        authors= [
            {"Name": author, "Information": location}
            for author, location in zip(Authors, Locations)
        ]
    except:
        authors = None
        print("authors not found")
    return authors

while (turn_it):
    dico_journal = {}

    with open('urls.json') as links_file:
        links = json.load(links_file)
    for link in links:
        driver = webdriver.Chrome()
        try:
            driver.get(link)
        except WebDriverException:
            print("page down or @IP is blocked")
        sleep(4)


        try:
            page = driver.find_element(By.CLASS_NAME, 'article-wrapper.u-padding-s-top.grid.row')
        except:
            print("page not found")

        try:
            content = page.find_element(By.XPATH, '//article')
        except:
            print("content not found")



        Title = get_title(content)
        DOI = get_doi(content)
        Abstract = get_abstract(content)
        publisher = get_publisher(content)
        date = get_date_publication(content)
        authors = get_authors(content)

        dico_journal = {"title":Title, "abstract": Abstract,"date_publication": date,"issn":None,"total_usage": None,"keywords":None, "doi": DOI, "publisher": publisher, "authors": Authors}

        # this list contains all our data
        all_items.append(dico_journal)

        with open("items.json", "w") as write_file:
            # convert the list into a json file
            json.dump(all_items, write_file, indent=4)

        print(current_link)
        current_link += 1

    driver.close

    turn_it = False

driver.close()