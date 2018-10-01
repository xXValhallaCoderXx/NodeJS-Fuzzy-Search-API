# Introduction

- This project utilizes using elastic search via a node REST API to provide fast, fuzzy result parameters.

## Setup
- Ensure you have docker on your system
- In the project root run: `docker-compose up --build`
- In a different cli in root run: `docker exec finance-api "node" "server/elasticsearch/init_db.js"` 
- This will enter the data into ES temp storage ready to be searched

## Live Endpoint

- http://104.248.150.190:3000/api/people-like-you?age=25

`Eg. // GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false`