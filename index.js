import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the API");
})


//Get all players score

app.get("/players-scores", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT Players.name, Games.title, Scores.score 
            FROM Scores 
            INNER JOIN Players ON Scores.player_id = Players.id 
            INNER JOIN Games ON Scores.game_id = Games.id;
        `)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
        
    }
})

//Get top players

app.get("/top-players", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT Players.name, 
            SUM(Scores.score) AS total_score 
            FROM Scores 
            INNER JOIN Players ON Scores.player_id = Players.id 
            GROUP BY Players.name 
            ORDER BY total_score 
            DESC LIMIT 3;`)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
        
    }
})


// Players Who Didn’t Play Any Games
app.get("/inactive-players", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT Games.genre, 
            COUNT(Scores.id) AS games_played 
            FROM Scores 
            INNER JOIN Games ON Scores.game_id = Games.id 
            GROUP BY Games.genre 
            ORDER BY games_played 
            DESC LIMIT 1;`)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
})

// Find Popular Genre

app.get("/popular-genres", async(req, res) => {
    try {
        const result = await pool.query(`
            SELECT Games.genre, 
            COUNT(Scores.id) AS time_played 
            FROM Scores 
            INNER JOIN Games ON Scores.game_id = Games.id 
            GROUP BY Games.genre 
            ORDER BY time_played 
            DESC LIMIT 3;`)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
        
    }
})

//Recently Joined Players
app.get("/recent-players", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT Players.name, Players.join_date 
            FROM Players 
            WHERE Players.join_date >= CURRENT_DATE - INTERVAL '30 days';`)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
})

//Favorite-games

app.get("/favorite-games", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT Players.name, Games.title, 
            COUNT(Scores.id) AS times_played 
            FROM Scores 
            INNER JOIN Players ON Scores.player_id = Players.id 
            INNER JOIN Games ON Scores.game_id = Games.id 
            GROUP BY Players.name, Games.title 
            ORDER BY times_played DESC;`)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
})

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
})