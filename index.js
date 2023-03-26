const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();


/* middleware */

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.khb8i.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://task-cart:W6MsCDx1M2ZTd8mA@cluster0.khb8i.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();

        const bookingCollection = client.db('tasks_cart').collection('bookings');

        app.get('/booking', async (req, res) => {
            const query = {};
            const cursor = bookingCollection.find(query);
            const bookings = await cursor.toArray();
            res.send(bookings);
        });

        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })

    }
    finally {
        // console.log("from finally")
    }

}

run().catch(console.log)







app.get('/', async (req, res) => {
    res.send('server is workimg')
})

app.listen(port, () => {
    console.log(`don't worry I am here ${port}`)
})