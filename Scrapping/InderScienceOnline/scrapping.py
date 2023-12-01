from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import undetected_chromedriver as uc
import argparse
import json

# Configuration des arguments
parser = argparse.ArgumentParser(description='Description du script')
parser.add_argument('--subject', help='Get Subject')
parser.add_argument('--pageNumber', help='Get Page Number')
args = parser.parse_args()


#getting title
def get_title(i):
    try:
        title_object = i.find_element(By.XPATH,"./div[2]/span/h3/a")
        title = title_object.text
    except:
        title= None
        print("title not found")
    return title

#getting journal link
def get_article_link(i):
    try:
        titleToclick = i.find_element(By.XPATH,"./div[2]/span/h3/a")
        article_link = titleToclick.get_attribute("href")
    except:
        print("article link not found")
        article_link = None
    return article_link

#getting doi
pattern_doi = r"https://doi\.org/[^\s]+"
def get_doi(driver):
    try:
        doi_link = driver.find_element(By.CLASS_NAME,"epub-section__doi__text").text
        doi = doi_link[16:] 
        # doi = re.sub(pattern_doi, "", doi_link )
    except:
        doi = None
        print("doi not found")
    return doi

#getting abstract
def get_abstract(driver):
    try:
        abstract_div = driver.find_element(By.CLASS_NAME , "abstractSection.abstractInFull")
        abstract_text = abstract_div.find_element(By.XPATH,"./p").text
    except:
        abstract_text = None
        print("abstract not found")
    return abstract_text

#getting issn
def get_issn(driver):
    try:
        element = driver.find_element(By.CLASS_NAME,'rlist.article__info')   
        issn_element = element.find_element(By.XPATH,"./li[1]/span")
        issn = issn_element.text[6:] 
    except:
        issn = None
        print("ISSN not found")
    return issn

#getting journal name
def get_journal_name(driver):
    try:
        nav = driver.find_element(By.CLASS_NAME,'article__breadcrumbs.separator')
        journal_name = nav.find_element(By.XPATH,"./a[2]").text
    except:
        journal_name = None
        print("journal_name not found")
    return journal_name

#getting date
def get_date_publication(driver):
    try:
        date_section = driver.find_element(By.CLASS_NAME , "epub-section")
        date = date_section.find_element(By.XPATH,"./span[1]/span[2]").text
    except:
        date = None
        print("date publication not found")
    return date

#getting keywords
def get_keywords(driver):
    keyword_list = list()
    try:
        kwd_group = driver.find_element(By.CSS_SELECTOR,'kwd-group')
        kwd_links = kwd_group.find_elements(By.CLASS_NAME,"attributes")
               #filter the array
        for kwd_link in kwd_links:
            print(kwd_link.text)
            keyword_list.append(kwd_link.text)   
    except:
        keyword_list = None
        print("keywords not found")
    return keyword_list

#getting authors_details
def get_authors_details(driver):
    author_list = list()
    try:

        #getting the authors from the dropdown
        author_elements = driver.find_element(By.CLASS_NAME, 'rlist.inline-list.comma')
        author_name_elements = author_elements.find_elements(By.TAG_NAME, 'li')
        author_detail_elements = driver.find_element(By.CLASS_NAME, 'rlist.spaced.lower-alpha').find_elements(By.TAG_NAME, 'li')

        # Initialize a list to store author information
        author_list = []

        # Iterate through each author element
        for author_name_element in author_name_elements:
            author_info = {}
            
            # Extract author name
            author_name = author_name_element.text
            author_info['Name'] = author_name

            author_info['Other Information'] = ""

            if author_info['Name'] != "":
                author_list.append(author_info)
        # Iterate through each author element
        i=0
        for author in author_list:
            
            # Extract author info
            author_info = author_detail_elements[i].text
            author['Information'] = author_info
            i=i+1
              
    except:
        author_list = None
        print("authors not found")
    return author_list

#convert the list into a json file
def write_scraped_data_json(file_location:str):
    with open(file_location, "w") as write_file:
        json.dump(all_articles, write_file, indent=4)

options = webdriver.ChromeOptions() 
options.headless = False
driver = uc.Chrome(options=options)


driver.get("https://www.inderscienceonline.com/action/doSearch?AllField="+args.subject+"&startPage="+args.pageNumber+"&pageSize=100")
sleep(5)
all_articles = list()

items = driver.find_elements(By.CLASS_NAME, "search-item.clearfix")

for item in items:
    title_article = get_title(item)
    link_article = get_article_link(item)
    dico_article = { "title":title_article, "article_link":link_article}         
    all_articles.append(dico_article)

for article in all_articles:
    driver.get(article["article_link"])
    sleep(3)
    # publisher_tmp = get_publisher(driver)
    abstract_tmp = get_abstract(driver)
    doi_tmp=get_doi(driver)
    issn_tmp=get_issn(driver)
    date_publication_tmp = get_date_publication(driver)
    journal_name_tmp = get_journal_name(driver)
    keywords__tmp = get_keywords(driver)# [*]
    authors_details_tmp = get_authors_details(driver)
    print(doi_tmp)# [*]
    print(abstract_tmp)# [*]
    print(issn_tmp)# [*]
    print(date_publication_tmp)# [*]
    print(journal_name_tmp)# [*]
    article["journal_name"] = journal_name_tmp
    article["abstract"] = abstract_tmp
    article["doi"] = doi_tmp
    article["issn"] = issn_tmp
    article["date_publication"] = date_publication_tmp
    article["total_usage"] = ""
    article["keywords"] = keywords__tmp
    article["authors"] = authors_details_tmp

write_scraped_data_json("scraped_data.json")

driver.close()



