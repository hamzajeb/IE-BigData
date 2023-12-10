from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
from pyspark.sql import SparkSession
import math
from collections import Counter
from flask import json
from flask import jsonify
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


@router.get("/bestJournals/")
@has_role("superadmin")
def get_best_journals(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load().filter("journal_name is not null")
    pandas_df = (
        df.groupBy("journal_name")
        .count()
        .sort("count", ascending=True)
        .toPandas()
        .tail(15)
    )
    result_df = pandas_df[pandas_df['journal_name'].notnull()]  
    result_json = result_df.to_json(orient='records').replace('count', 'value').replace('journal_name', 'name')
    return result_json

@router.get("/years/")
@has_role("superadmin")
def get_journals_of_each_year(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    df = df.withColumn("publication_year", substring(col("date_publication"), -4, 4).cast("integer"))
    result_df = (
        df.groupBy("publication_year")
        .agg(count("*").alias("item_count"))
        .orderBy("publication_year")  # Sort by publication_year in ascending order
    )
    result_pandas = result_df.toPandas()
    result_json = result_pandas.to_json(orient='records')
    return result_json

@router.get("/keywords/")
@has_role("superadmin")
def get_most_repeated_keywords(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    df = df.select("keywords").withColumn("keyword", explode(col("keywords")))
    keyword_counts = df.groupBy("keyword").count()
    top_keywords = keyword_counts.orderBy("count", ascending=False).limit(10)
    result_df = top_keywords.toPandas()
    result_json = result_df.to_json(orient='records').replace('count', 'value').replace('keyword', 'name')
    return result_json


@router.get("/bestAuthor/")
@has_role("superadmin")
def get_top_authors(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    # Éclater le tableau d'auteurs pour avoir une ligne par auteur
    df = df.select("authors").withColumn("author", explode(col("authors")))
    # Explode authors array to have one row per author
    df = df.withColumn("author", explode("authors"))
    # Extract author names
    df = df.withColumn("author_name", col("author.Name"))
    # Group by author name and count the number of articles
    author_counts = df.groupBy("author_name").count()
    # Show the top authors based on the number of articles published
    top_keywords = author_counts.orderBy("count", ascending=False).limit(10)
    result_df = top_keywords.toPandas()
    result_json = result_df.to_json(orient='records').replace('count', 'value').replace('author_name', 'name')
    return result_json



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


    return {"articles":num_articles,"journals" :num_journals,"publisher":num_publisher,"auteurs": num_authors,"Q1":num_journals_Q1,"Q2":num_journals_Q2,"Q3":num_journals_Q3,"Q4":num_journals_Q4}

from fastapi.responses import JSONResponse
@router.get("/articles/")
@has_role("superadmin")
def get_articles(current_user: UserDB = Depends(get_current_user)):
    df = spark.read.format("mongo").load()
    pandas_df = df.toPandas()

    # Convertir le Pandas DataFrame en JSON
    json_data = pandas_df.to_json(orient="records")

    # Retourner les données JSON
    return JSONResponse(content=json_data)

# https://chat.openai.com/share/14740996-83ad-42fe-af87-4de349f2b930