const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Database connection simulation
const getDatabaseData = () => {
    return new Promise((resolve) => {
        // Chaos Testing me network delay daalenge toh ye response time badhega
        setTimeout(() => {
            resolve({ status: "Connected", data: ["User1", "User2", "User3"] });
        }, 50); 
    });
};

app.get('/api/data', async (req, res) => {
    try {
        const dbResponse = await getDatabaseData();
        res.json({ message: "Hello from Backend!", database: dbResponse });
    } catch (error) {
        res.status(500).json({ error: "Database internal error" });
    }
});

// Chaos testing me Liveness/Readiness probe check karne ke liye health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));