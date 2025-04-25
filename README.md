Introduction to the Assignment:

The assignment involves working at a game studio where you are asked to create an API that provides data for a dashboard. 
Connect to a PostgreSQL database, query the data, and return the results as JSON.

Assignment Overview:
You are building an API for a game studio. This API will have routes (URLs) that perform queries on the database to provide specific data related to the studio's operations.
The data will be returned in a JSON format (which is a lightweight data format commonly used in APIs).

1 - Database Structure:
The assignment involves interacting with three tables in the database:
Players: Contains data about the players.
Games: Contains data about the games.
Scores: Contains data about players' scores in each game.

2 - Steps to Complete the Assignment:
Step 1: Setting Up
This includes initializing a new Node.js project, installing required dependencies 
(like express, pg for PostgreSQL, and dotenv for handling environment variables), setting up a PostgreSQL database, and creating a basic Express server that connects to the database.

The API Challenges

This section lists the tasks you need to complete by creating different API endpoints (routes). 
Each task involves writing SQL queries and using them in the API to fetch data from the PostgreSQL database:
Task 1: Fetch a list of players and their scores.
Task 2: Get the top 3 players with the highest scores.
Task 3: Get players who haven't played any games.
Task 4: Find the most popular game genres.
Task 5: List players who joined in the last 30 days.
Bonus Task: Fetch each player's favorite game based on the most played game.
