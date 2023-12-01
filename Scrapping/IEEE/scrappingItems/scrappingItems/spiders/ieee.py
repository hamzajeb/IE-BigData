import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
import requests
from urllib.parse import urlencode
from selenium import webdriver
from scrapy.selector import Selector
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import ActionChains
from time import sleep


# When scraping or crawling getting a Scrapy 503 Service Unavailable Error is a common and confusing error as it often isn't 100% 
# clear what is causing the error.
# A Scrapy 503 Service Unavailable Error is logged when the backend server your spider is trying to connect to returns a 503 HTTP 
# status code.
# Meaning the server is currently unable to handle incoming requests. Either because the server is down for maintainence or is too 
# overloaded with incoming requests and can't handle anymore.
# However, oftentimes when your spider gets this error you can connect to the target website normally with your browser. This means
#  that the server is likely returning the 503 HTTP status code on purpose to your scraper.
# Most likely because the server believes you are a scraper and is blocking you.
# If the server is live, but you are getting Scrapy 503 Service Unavailable Errors then it is likely that the website is flagging 
# your spider as a scraper and blocking your requests.
# To avoid getting detected we need to optimise our spiders to bypass anti-bot countermeasures by:
# Using Fake User Agents
# Optimizing Request Headers
# Using Proxies
API_KEY = 'fe101ea8-9861-4ac8-a7c5-490186738375'

def get_scrapeops_url(url):
    payload = {'api_key': API_KEY, 'url': url}
    proxy_url = 'https://proxy.scrapeops.io/v1/?' + urlencode(payload)
    return proxy_url


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
def click_journal(journal,driver):
    #Cliking the link
    try:
        tile_object = journal.find_element(By.CSS_SELECTOR,'h3')
        titleToclick = tile_object.find_element(By.CSS_SELECTOR,'a')
        ActionChains(driver).move_to_element(titleToclick).perform()
        titleToclick.click()
        sleep(1)
    except:
        print("Nothing to clik")

#getting abstract
def get_abstract(driver):
    try:
        absract_div = driver.find_element(By.CLASS_NAME , "row.document-main-body")
        abstract_div2 = absract_div.find_element(By.CLASS_NAME,"u-mb-1")
        abstract_text = abstract_div2.find_element(By.XPATH,"./div[1]").text
    except:
        abstract_text = None
        print("abstract not found")

    return abstract_text


#getting date
def get_date_publication(driver):
    try:
        date = driver.find_element(By.CLASS_NAME , "u-pb-1.doc-abstract-pubdate").text.replace("Date of Publication: ", "")
    except:
        date = None
        print("date publication not found")

    return date


#getting doi
def get_doi(driver):
    try:
        doi_div2 = driver.find_element(By.CLASS_NAME,"u-pb-1.stats-document-abstract-doi")
        doi = doi_div2.find_element(By.CSS_SELECTOR,'a').text
    except:
        doi = None
        print("doi not found")
    return doi

#getting total_usage
def get_total_usage(driver):
    try:
        keywords_dropdown = driver.find_element(By.ID,"metrics")
        ActionChains(driver).move_to_element(keywords_dropdown).perform()
        keywords_dropdown.click()

        sleep(1)
        # total_div = driver.find_element(By.CLASS_NAME,"accordion-body.collapse.show")
        # This code incorporates an explicit wait using WebDriverWait. If the element is not immediately available when the page 
        # loads, an explicit wait ensures that the script waits for it to become available.
        wait = WebDriverWait(driver, 10)
        element = wait.until(EC.presence_of_element_located((By.XPATH, '//span[contains(@class, "green-text")]')))
        total=element.text
    except:
        total = None
        print("total use not found")
    return total

#getting journal name
def get_journal_name(driver):
    try:
        doi_div2 = driver.find_element(By.CLASS_NAME,"u-pb-1.stats-document-abstract-publishedIn")
        journal_name = doi_div2.find_element(By.CSS_SELECTOR,'a').text
    except:
        journal_name = None
        print("journal_name not found")
    return journal_name

#getting issn
def get_issn(driver):
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




def get_keywords(driver):
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

def get_authors_details(driver):
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

#event to click coockies 
#accepting cookies to destroy the overlay
def accept_cookies(driver):
    cookies_btn = driver.find_element(By.CLASS_NAME, "cc-btn.cc-dismiss")
    driver.execute_script("arguments[0].click();", cookies_btn)



class IeeeSpider(scrapy.Spider):
    name = 'ieee'
    topic = None

    payload = {
        'queryText': None,
        'refinements': None,
        'pageNumber' : None
    }

    def start_requests(self):
        urls = [
            'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=blockchains&highlight=true&returnFacets=ALL&returnType=SEARCH&matchPubs=false&refinements=ContentType:Journals&pageNumber=2',
        ]
        for url in urls:
            yield scrapy.Request(url=get_scrapeops_url(url), callback=self.parse )

    # def __init__(self, topic=None, content_type='Journals'):
    def __init__(self,keyword=None, topic='Blockchains', content_type='Journals',page_number=5, *args, **kwargs):
        super(IeeeSpider, self).__init__(*args, **kwargs)
        self.topic = topic
        self.driver = webdriver.Chrome()
        self.payload['queryText'] = topic
        self.payload['pageNumber'] = page_number
        self.payload['refinements'] = 'ContentType:'+content_type



    def parse(self, response):
        print(response.text)
        # If the data you want to extract from a website is generated dynamically using JavaScript, Scrapy might not be the best 
        # tool for the job since it primarily focuses on parsing static HTML content. To scrape data from websites with dynamically 
        # generated content, you'll typically need to use a headless browser automation tool like Selenium or Puppeteer. These tools 
        # can interact with the webpage and execute JavaScript to retrieve data that is not available in the initial HTML source.
        self.driver.get('https://ieeexplore.ieee.org/search/searchresult.jsp?queryText='+self.payload['queryText']+'&highlight=true&returnType=SEARCH&matchPubs=true&refinements=ContentType:Journals&returnFacets=ALL&pageNumber='+self.payload['pageNumber'])
        sleep(10)
        all_journals = list()
        
        journals = self.driver.find_elements(By.CLASS_NAME, "List-results-items")

        accept_cookies(self.driver)
        for journal in journals:
        
            authors_tmp  = get_author(journal)
            title_tmp = get_title(journal)
            publisher_tmp,  year_tmp = get_journal_info(journal)
            journal_link_tmp = get_journal_link(journal)

            # abstract_tmp = click_article(journal,self.driver)

            dico_journal = {"title":title_tmp,"publisher":publisher_tmp , "year":year_tmp , "article_link":journal_link_tmp} 
        
            all_journals.append(dico_journal)
        for journal in all_journals :
            self.driver.get(journal["article_link"])
            abstract_tmp = get_abstract(self.driver)
            doi_tmp=get_doi(self.driver)
            issn_tmp=get_issn(self.driver)
            date_publication_tmp = get_date_publication(self.driver)
            journal_name_tmp = get_journal_name(self.driver)
            total_usage__tmp = get_total_usage(self.driver)
            authors_details_tmp = get_authors_details(self.driver)
            keywords__tmp = get_keywords(self.driver)
            journal["journal_name"] = journal_name_tmp
            journal["abstract"] = abstract_tmp
            journal["doi"] = doi_tmp
            journal["issn"] = issn_tmp
            journal["date_publication"] = date_publication_tmp
            journal["total_usage"] = total_usage__tmp
            journal["keywords"] = keywords__tmp
            journal["authors"] = authors_details_tmp
            yield journal
        
