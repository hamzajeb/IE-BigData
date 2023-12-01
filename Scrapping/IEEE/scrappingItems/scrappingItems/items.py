# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ArticleScrappingItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

    # Article
    title = scrapy.Field()
    topic = scrapy.Field()
    doi = scrapy.Field()
    date_publication = scrapy.Field()
    abstract = scrapy.Field()
    citation = scrapy.Field()
    keywords = scrapy.Field()
    metrics = scrapy.Field()  # Usage includes PDF downloads and HTML views exist in IEEE
    #downloadCount = scrapy.Field()

    # Authors
    authors_name = scrapy.Field()
    authors_university = scrapy.Field()
    authors_country = scrapy.Field()

    #Journal
    publisher = scrapy.Field() #pas statique comme mega sont des journales
    issn = scrapy.Field() #pas statique comme mega


    pass
