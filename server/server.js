require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();

const { knex } = require('./knex');

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

app.get('/api/notes', (_, res) => {
  console.log('Got a ping on the Endpoint all notes');
  
  knex('notes').select('*').then((data) => {
    console.log(`Received from DB: ${JSON.stringify(data)}`);
    res.status(201).send(data);
  }).catch((error) => {
    console.log(`Error in the DB fetch ${error}`);
    res.status(500).end();
  })
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Success - server listening on port ${port}`);
})
