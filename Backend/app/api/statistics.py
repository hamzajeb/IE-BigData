
from fastapi.responses import JSONResponse
from pyspark.sql import SparkSession
import  json
import math
from collections import Counter
from app.core.security import has_role, get_current_user
from pyspark import SparkContext
from fastapi import APIRouter, Depends, HTTPException
import pyspark
from pyspark.sql import SQLContext  # run sql queries using pyspqrk
from app.models.user import UserCreate, UserDB, UserUpdate
from pyspark.sql.types import StructType, StructField, StringType, IntegerType
from pyspark.sql.functions import substring, col, count,explode,countDistinct
spark = SparkSession.builder.appName("myApp") \
.config("spark.mongodb.input.uri",
"mongodb://127.0.0.1/ScrappingItems.allItemsWithQuartiles") \
.config("spark.mongodb.output.uri",
"mongodb://127.0.0.1/ScrappingItems.allItemsWithQuartiles") \
.config('spark.jars.packages',
'org.mongodb.spark:mongo-spark-connector_2.12:2.4.2') \
.getOrCreate()

router = APIRouter()
statistics ={}
def get_sum():
    df = spark.read.format("mongo").load()
    # Number of articles
    num_articles = df.select("_id").distinct().count()

    # Number of journals
    num_journals = df.select("journal_name").distinct().count()

    num_publisher = df.select("publisher").distinct().count()

    filtered_df_Q1 = df.filter(df["Quartile"] == "Q1")
    num_journals_Q1 = filtered_df_Q1.select("journal_name").distinct().count()
    filtered_df_Q2 = df.filter(df["Quartile"] == "Q2")
    num_journals_Q2 = filtered_df_Q2.select("journal_name").distinct().count()
    filtered_df_Q3 = df.filter(df["Quartile"] == "Q3")
    num_journals_Q3 = filtered_df_Q3.select("journal_name").distinct().count()
    filtered_df_Q4 = df.filter(df["Quartile"] == "Q4")
    num_journals_Q4 = filtered_df_Q4.select("journal_name").distinct().count()

    # Éclater le tableau d'auteurs pour avoir une ligne par auteur
    df = df.withColumn("author", explode("authors"))
    # Extract author names
    df = df.withColumn("author_name", col("author.Name"))
    # Number of unique authors
    num_authors = df.select(countDistinct("author_name")).collect()[0][0]
    global statistics
    statistics= {"articles":num_articles,"journals" :num_journals,"publisher":num_publisher,"auteurs": num_authors,"Q1":num_journals_Q1,"Q2":num_journals_Q2,"Q3":num_journals_Q3,"Q4":num_journals_Q4}
get_sum()

journals0={}
def bestJournals():
    df = spark.read.format("mongo").load().filter("journal_name is not null")
    pandas_df = df.groupBy("journal_name").count().limit(10)
    global journals0
    journals0 = pandas_df.toJSON().collect()
    journals0 = [json.loads(row) for row in journals0]
bestJournals()
@router.get("/bestJournals/")
@has_role("superadmin")
def get_best_journals(current_user: UserDB = Depends(get_current_user)):
    global journals0
    return journals0


journalYears={}

def get_journals_year():
    df = spark.read.format("mongo").load()
    df = df.withColumn("publication_year", substring(col("date_publication"), -4, 4).cast("integer"))
    result_df = df.groupBy("publication_year").agg(count("*").alias("item_count")).orderBy("publication_year")  # Sort by publication_year in ascending ordery
    global journalYears
    journalYears = result_df.toJSON().collect()
    journalYears = [json.loads(row) for row in journalYears]
get_journals_year()
@router.get("/years/")
@has_role("superadmin")
def get_journals_of_each_year(current_user: UserDB = Depends(get_current_user)):
    global journalYears
    return journalYears

keywords={}

def get_keywords():
    df = spark.read.format("mongo").load()
    df = df.select("keywords").withColumn("keyword", explode(col("keywords")))
    keyword_counts = df.groupBy("keyword").count()
    top_keywords = keyword_counts.orderBy("count", ascending=False).limit(10)
    global keywords
    keywords = top_keywords.toJSON().collect()
get_keywords()
@router.get("/keywords/")
@has_role("superadmin")
def get_most_repeated_keywords(current_user: UserDB = Depends(get_current_user)):
    global keywords
    result_list = [json.loads(row) for row in keywords]
    return result_list
authors0={}
def get_Authors():
    df = spark.read.format("mongo").load()
    # Éclater le tableau d'auteurs pour avoir une ligne par auteur
    df = df.select("authors").withColumn("author", explode(col("authors")))
    # Explode authors array to have one row per author
    df = df.withColumn("author", explode("authors"))
    # Extract author names
    df = df.withColumn("author_name", col("author.Name"))
    # Group by author name and count the number of articles
    author_counts = df.groupBy("author_name").count().limit(10)
    # Show the top authors based on the number of articles published
    global authors0
    authors0 = author_counts.toJSON().collect()
    authors0 = [json.loads(row) for row in authors0]
get_Authors()
@router.get("/bestAuthor/")
@has_role("superadmin")
def get_top_authors(current_user: UserDB = Depends(get_current_user)):
    global authors0
    return authors0



@router.get("/averageAuthors/")
@has_role("superadmin")
def calculate_average_authors_per_article(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    # Éclater le tableau d'auteurs pour avoir une ligne par auteur
    df = df.withColumn("author", explode("authors"))
    # Extract author names
    df = df.withColumn("author_name", col("author.Name"))
    # Extract author names
    df = df.withColumn("author_name", col("author.Name"))
    # Group by title and count the number of authors for each article
    author_counts_per_article = df.groupBy("title").agg({"author_name": "count"})

    # Calculate the average number of authors across all articles
    average_authors = author_counts_per_article.agg({"count(author_name)": "avg"}).collect()[0][0]
    decimal_part = average_authors - int(average_authors)
    
    if decimal_part >= 0.5:
        x= math.ceil(average_authors)
    else:
        x= math.floor(average_authors)
    return {"nombre moyen d'auteurs par article":x}

@router.get("/count/")
@has_role("superadmin")
def get_articles_journals_authors_statistics_with_sum(current_user: UserDB = Depends(get_current_user)):
    global  statistics
    return statistics


items={}

def get_items(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    pandas_df = df.toPandas()
    # Convertir le Pandas DataFrame en JSON
    json_data = pandas_df.to_json(orient="records")
    # Retourner les données JSON
    global items
    items= JSONResponse(content=json_data)
get_items()
import json
@router.get("/articles/")
@has_role("superadmin")
def get_articles(current_user: UserDB = Depends(get_current_user)):
    global items
    return items
countries_set = {'Pakistan', 'South Korea', 'Portugal', 'China', 'Denmark', 'Canada', 'Australia', 'Netherlands', 'United States', 'United Kingdom', 'Switzerland'}
from pyspark.sql.functions import countDistinct
Country_with_Q1={}
def country_with_Q1(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    filtered_df = df.filter(df.Quartile == "Q1")
    global Country_with_Q1
    Country_with_Q1 = filtered_df.groupBy("country").agg(countDistinct("journal_name").alias("sum_journals"),countDistinct("_id").alias("sum_articles"))
    Country_with_Q1= Country_with_Q1.toJSON().collect()
    Country_with_Q1 = [json.loads(row) for row in Country_with_Q1]
    for country in countries_set:
        # Vérifier si le pays existe dans le tableau d'objets
        country_exists = any(item["country"] == country for item in Country_with_Q1)

        # Si le pays n'existe pas, l'ajouter avec sum_journals et sum_articles égaux à 0
        if not country_exists:
            Country_with_Q1.append({"country": country, "sum_journals": 0, "sum_articles": 0})    
country_with_Q1()

@router.get("/articles/Q1")
@has_role("superadmin")
def get_country_with_Q1(current_user: UserDB = Depends(get_current_user)):
    global Country_with_Q1
    return Country_with_Q1




Country_with_Q2={}
def country_with_Q2(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    filtered_df = df.filter(df.Quartile == "Q2")
    global Country_with_Q2
    Country_with_Q2 = filtered_df.groupBy("country").agg(countDistinct("journal_name").alias("sum_journals"),countDistinct("_id").alias("sum_articles"))
    Country_with_Q2= Country_with_Q2.toJSON().collect()
    Country_with_Q2 = [json.loads(row) for row in Country_with_Q2]
    for country in countries_set:
        # Vérifier si le pays existe dans le tableau d'objets
        country_exists = any(item["country"] == country for item in Country_with_Q2)

        # Si le pays n'existe pas, l'ajouter avec sum_journals et sum_articles égaux à 0
        if not country_exists:
            Country_with_Q2.append({"country": country, "sum_journals": 0, "sum_articles": 0})    
country_with_Q2()

@router.get("/articles/Q2")
@has_role("superadmin")
def get_country_with_Q2(current_user: UserDB = Depends(get_current_user)):
    global Country_with_Q2
    return Country_with_Q2


Country_with_Q3={}
def country_with_Q3(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    filtered_df = df.filter(df.Quartile == "Q3")
    global Country_with_Q3
    Country_with_Q3 = filtered_df.groupBy("country").agg(countDistinct("journal_name").alias("sum_journals"),countDistinct("_id").alias("sum_articles"))
    Country_with_Q3= Country_with_Q3.toJSON().collect()
    Country_with_Q3 = [json.loads(row) for row in Country_with_Q3]
    for country in countries_set:
        # Vérifier si le pays existe dans le tableau d'objets
        country_exists = any(item["country"] == country for item in Country_with_Q3)

        # Si le pays n'existe pas, l'ajouter avec sum_journals et sum_articles égaux à 0
        if not country_exists:
            Country_with_Q3.append({"country": country, "sum_journals": 0, "sum_articles": 0})
country_with_Q3()

@router.get("/articles/Q3")
@has_role("superadmin")
def get_country_with_Q3(current_user: UserDB = Depends(get_current_user)):
    global Country_with_Q3

    return Country_with_Q3


Country_with_Q4={}
def country_with_Q4(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    filtered_df = df.filter(df.Quartile == "Q4")
    global Country_with_Q4
    Country_with_Q4 = filtered_df.groupBy("country").agg(countDistinct("journal_name").alias("sum_journals"),countDistinct("_id").alias("sum_articles"))
    Country_with_Q4= Country_with_Q4.toJSON().collect()
    Country_with_Q4 = [json.loads(row) for row in Country_with_Q4]
    for country in countries_set:
        # Vérifier si le pays existe dans le tableau d'objets
        country_exists = any(item["country"] == country for item in Country_with_Q4)

        # Si le pays n'existe pas, l'ajouter avec sum_journals et sum_articles égaux à 0
        if not country_exists:
            Country_with_Q4.append({"country": country, "sum_journals": 0, "sum_articles": 0})
country_with_Q4()

@router.get("/articles/Q4")
@has_role("superadmin")
def get_country_with_Q4(current_user: UserDB = Depends(get_current_user)):
    global Country_with_Q4
    return Country_with_Q4

# Show the result
# https://chat.openai.com/share/14740996-83ad-42fe-af87-4de349f2b930