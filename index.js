const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jfvuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('bookShop');
        const userCollection = database.collection('users');

        // fetch by name
        app.get('/get_name', async (req, res) => {
            const email = req.query.name;
            const query = { name: name }
            const cursor = userCollection.find(query);
            const buy = await cursor.toArray();
            res.json(buy);
        });
        //save name
        app.post('/save_user', async (req, res) => {
            const cursor = req.body;
            const result = await userCollection.insertOne(cursor);
            res.json(result);
        });
    }
    finally {
        //a
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server Start');
});
app.listen(port, () => {
    console.log('Listening to port', port)
})


