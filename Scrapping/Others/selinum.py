from lib2to3.pgen2 import driver
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
import json
from selenium.webdriver.support.ui import WebDriverWait  # Import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC 
# https://www.scimagojr.com/journalrank.php
# C:\Users\lenovo\OneDrive\Documents\LSI4\IE\project\Scrapping\scrappingItems\scrappingItems>scrapy crawl ieee -a topic=blockchains -a page_number=143
# C:\Users\lenovo\OneDrive\Documents\LSI4\IE\project\Scrapping\InderScienceOnline>python scrapping.py --subject blockchain --pageNumber 1
def filter_journals():
    try:
        journal_input_div_object = driver.find_element(By.ID,"refinement-ContentType:Journals")
        driver.execute_script("arguments[0].click();", journal_input_div_object)
        sleep(1)
    except:
        print("canot filter journals")

#getting authors
def get_author(j):
    try:
        authors = j.find_element(By.CSS_SELECTOR,'xpl-authors-name-list').text
        list_auths = authors.split(';\n')
    except:
        list_auths = None
        print("Authors not found")
    return list_auths

#getting title
def get_title(j):
    try:
        tile_object = j.find_element(By.CSS_SELECTOR,'h3')
        title = tile_object.text
    except:
        title= None
        print("title not found")
    return title

#getting publication info (year type publisher)
def get_journal_info(j):
    try:
        pub_info = j.find_element(By.CSS_SELECTOR,'div.publisher-info-container')
        year = pub_info.find_element(By.XPATH,'./span[1]').text
        year = year.replace('Year: ', '')

        publisher = pub_info.find_element(By.XPATH,'./span[3]').text
        publisher = publisher.lstrip('|')
        publisher = publisher.replace(' Publisher: ', '')
    except:
        print("info not nound")
        publisher= None
        year= None

    return publisher,  year

#getting journal link
def get_journal_link(j):
    try:
        tile_object = j.find_element(By.CSS_SELECTOR,'h3')
        titleToclick = tile_object.find_element(By.CSS_SELECTOR,'a')
        journal_link = titleToclick.get_attribute("href")
    except:
        print("journal link not found")
        journal_link = None
    return journal_link

#click event on the journal
def click_journal(j):
    #Cliking the link
    try:
        tile_object = j.find_element(By.CSS_SELECTOR,'h3')
        titleToclick = tile_object.find_element(By.CSS_SELECTOR,'a')
        ActionChains(driver).move_to_element(titleToclick).perform()
        titleToclick.click()
        sleep(1)
    except:
        print("Nothing to clik")

#getting abstract
def get_abstract():
    try:
        absract_div = driver.find_element(By.CLASS_NAME , "row.document-main-body")
        abstract_div2 = absract_div.find_element(By.CLASS_NAME,"u-mb-1")
        abstract_text = abstract_div2.find_element(By.XPATH,"./div[1]").text
    except:
        abstract_text = None
        print("abstract not found")

    return abstract_text


#getting abstract
def get_date_publication():
    try:
        date = driver.find_element(By.CLASS_NAME , "u-pb-1.doc-abstract-pubdate").text.replace("Date of Publication: ", "")
    except:
        date = None
        print("date publication not found")

    return date


#getting abstract
def get_doi():
    try:
        doi_div2 = driver.find_element(By.CLASS_NAME,"u-pb-1.stats-document-abstract-doi")
        doi = doi_div2.find_element(By.CSS_SELECTOR,'a').text
    except:
        doi = None
        print("doi not found")
    return doi

#getting abstract
def get_total_usage():
    try:
        keywords_dropdown = driver.find_element(By.ID,"metrics")
        ActionChains(driver).move_to_element(keywords_dropdown).perform()
        keywords_dropdown.click()

        sleep(0.5)
        total_div = driver.find_element(By.CLASS_NAME,"accordion-body.collapse.show")
        # This code incorporates an explicit wait using WebDriverWait. If the element is not immediately available when the page 
        # loads, an explicit wait ensures that the script waits for it to become available.
        wait = WebDriverWait(driver, 10)
        element = wait.until(EC.presence_of_element_located((By.XPATH, '//span[contains(@class, "green-text")]')))
        total=element.text
    except:
        total = None
        print("total use not found")
    return total

#getting abstract
def get_journal_name():
    try:
        doi_div2 = driver.find_element(By.CLASS_NAME,"u-pb-1.stats-document-abstract-publishedIn")
        journal_name = doi_div2.find_element(By.CSS_SELECTOR,'a').text
    except:
        journal_name = None
        print("journal_name not found")
    return journal_name

#getting abstract
def get_issn():
    try:
        # Existe deux types :
        # 1. dropDown (need click in button or get issn) 
        element = driver.find_element(By.CLASS_NAME,'col-6')   
        dropdown = element.find_element(By.XPATH,"./div[3]/div[1]")
        dropdown.click()
        issn_element = element.find_element(By.XPATH,"./div[3]/div[2]/div[2]")
        issn = issn_element.text
    except:
        # 2. Simple text :
        issn = element.find_element(By.XPATH,"./div[3]/div[1]/div").text
    return issn[-9:]




def get_keywords():
    keyword_list = list()
    final_list_kw = list()
    try:
        #clicking on the dropdown to display elements
        keywords_dropdown = driver.find_element(By.ID,"keywords")
        ActionChains(driver).move_to_element(keywords_dropdown).perform()
        keywords_dropdown.click()

        sleep(0.5)

        #getting the keywords from the dropdown
        
        keyword_div = driver.find_element(By.CLASS_NAME,"accordion-body.collapse.show")
        keywords_ul = keyword_div.find_element(By.XPATH,"./xpl-document-keyword-list/section/div/ul")
        keywords_li = keywords_ul.find_elements(By.CSS_SELECTOR,"li.doc-keywords-list-item")

        str_kw = ""
        for kw in keywords_li:
            keyword = kw.find_element(By.XPATH,"./ul").text
            str_kw += keyword

        keyword_list = str_kw.split('\n')
        keyword_list = list(set(keyword_list))
        
        #filter the array
        for character in keyword_list:
            if character == ',':
                continue
            final_list_kw.append(character)        
        driver.back()
    except:
            keyword_list = None
            print("keywords not found")
    return final_list_kw

def get_authors_details():
    author_list = list()
    try:
        # Exist two formes for list of authors :

        # FORME 1 :

        #clicking on the dropdown to display elements
        wait = WebDriverWait(driver, 10)
        authors_dropdown = wait.until(EC.visibility_of_element_located((By.ID, 'authors')))
        ActionChains(driver).move_to_element(authors_dropdown).perform()
        authors_dropdown.click()

        sleep(0.5)

        #getting the authors from the dropdown
        author_elements = driver.find_elements(By.CLASS_NAME, 'author-card')

        # Initialize a list to store author information
        author_list = []

        # Iterate through each author element
        for author_element in author_elements:
            author_info = {}
            
            # Extract author name
            author_name_element = author_element.find_element(By.TAG_NAME, 'span')
            author_name = author_name_element.text
            author_info['Name'] = author_name

            # Extract other author information
            info_element = author_element.find_element(By.XPATH,"./div/div[2]/div[2]/div")
            info = info_element.text
            author_info['Information'] = info

            # Extract other author information
            other_info_element = author_element.find_element(By.CLASS_NAME, 'u-pt-1')
            other_info = other_info_element.text
            author_info['Other Information'] = other_info

            # Append author information to the list
            if author_info['Name'] != "":
                author_list.append(author_info)
              
        driver.back()
    except:

        # FORME 2 :

        for author_element in author_elements:
            author_info = {}
            
            # Extract author name
            author_name_element = author_element.find_element(By.TAG_NAME, 'span')
            author_name = author_name_element.text
            author_info['Name'] = author_name

            info_element = author_element.find_element(By.XPATH,"./div/div/div[2]/div")
            info = info_element.text
            author_info['Information'] = info

            author_info['Other Information'] = ""

            if author_info['Name'] != "":
                author_list.append(author_info)
    return author_list

def write_scraped_data_json(file_location:str):
    with open(file_location, "w") as write_file:
        #convert the list into a json file
        json.dump(all_journals, write_file, indent=4)

#event to click coockies 
#accepting cookies to destroy the overlay
def accept_cookies():
    cookies_btn = driver.find_element(By.CLASS_NAME, "cc-btn.cc-dismiss")
    driver.execute_script("arguments[0].click();", cookies_btn)



current_page = 2
turn_it= True
all_journals = list()
while(turn_it):
    dico_journal= {}
    driver = webdriver.Chrome()
    #web_site = "https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=Abdelmalek%20Essaadi&newsearch=true&type=alt3&pageNumber="+str(current_page)
    web_site = "https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=blockchains&highlight=true&returnFacets=ALL&returnType=SEARCH&refinements=ContentType:Journals"
    driver.get(web_site)
    sleep(2)
    # filter_journals()
    journals = driver.find_elements(By.CLASS_NAME, "List-results-items")

    journals = journals[:2]

    enf_of_recherche = False
    next_page = 2
    
    accept_cookies()

    for journal in journals:
        
        authors_tmp  = get_author(journal)
        title_tmp = get_title(journal)
        publisher_tmp,  year_tmp = get_journal_info(journal)
        journal_link_tmp = get_journal_link(journal)
        

        dico_journal = {"title":title_tmp,"publisher":publisher_tmp , "year":year_tmp , "article_link":journal_link_tmp} 
        
        all_journals.append(dico_journal)
    for journal in all_journals :
        driver.get(journal["article_link"])
        abstract_tmp = get_abstract()
        doi_tmp=get_doi()
        issn_tmp=get_issn()
        date_publication_tmp = get_date_publication()
        journal_name_tmp = get_journal_name()
        total_usage__tmp = get_total_usage()
        authors_details_tmp = get_authors_details()
        keywords__tmp = get_keywords()
        journal["journal_name"] = journal_name_tmp
        journal["abstract"] = abstract_tmp
        journal["doi"] = doi_tmp
        journal["issn"] = issn_tmp
        journal["date_publication"] = date_publication_tmp
        journal["total_usage"] = total_usage__tmp
        journal["keywords"] = keywords__tmp
        journal["authors"] = authors_details_tmp


    print("current page",current_page)

    driver.close()
    
    current_page += 1
    
    if(dico_journal == {} or current_page == 15 ):
        turn_it = False
    turn_it = False

write_scraped_data_json("scraped_data.json")

driver.close()


