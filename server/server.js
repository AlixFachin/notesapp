require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();

const { knex } = require('./knex');

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

// READ ALL NOTES
app.get('/api/notes', (_, res) => {
  knex('notes').select('*').orderBy('id','desc').then((data) => {
    res.status(201).send(data);
  }).catch((error) => {
    console.log(`Error in the DB fetch ${error}`);
    res.status(500).end();
  })
});

// READ ONE NOTE
app.get('/api/note/:id', (req, res) => {
  const noteId = req.params.id;
  if (noteId && !isNaN(Number(noteId))) {
    knex('notes').select('*').where('id',noteId).then((data) => {
      console.log(`Received data ${JSON.stringify(data)}`)
      if (data.length === 0) {
        res.status(404).send('Note not found');
      } else {
        res.send(data);
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send(`Error in the database`);
    })
  } else {
    res.status(400).send(`Error in HTTP request parameter syntax`);
  }
});

// CREATE A NOTE
app.post('/api/note', (req, res) => {
  const newNoteMessage = req.body.message;
  const newNoteSummary = req.body.summary;
  if (newNoteMessage && newNoteSummary) {
    knex('notes').insert({message: newNoteMessage, summary: newNoteSummary }, ['id', 'message', 'summary'])
    .then( (data) => {
      console.log(`Successful CREATE of record - returned ${data}`);
      res.status(201).send(data);
    }).catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(400).send('Bad POST request body');
  }
});

// UPDATE A NOTE
app.patch('/api/note/:id', (req, res) => {
  const noteId = req.params.id;
  const newMessage = req.body.message;
  const newSummary = req.body.summary;
  if (noteId && !isNaN(Number(noteId)) && newMessage && newSummary) {
    knex('notes').where('id',noteId).update({ message : newMessage, summary: newSummary }, ['id', 'message', 'summary'])
    .then((data) => {
      if (data.length === 0 ) {
        res.status(404).send(`Note ${noteId} not found in DB`);
      } else {
        console.log(`Successful UPDATE of record ${noteId} - returned ${data}`);
        res.send(data);
      }
    }).catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(400).send('Bad PATCH request body syntax');
  }
});

// DELETE A NOTE
app.delete('/api/note/:id', (req, res) => {
  const noteId = req.params.id;
  if (noteId && !isNaN(Number(noteId))) {
    knex('notes').where('id', noteId).del().then((data) => {
      console.log(`DELETION success - ${JSON.stringify(data)}`);
      if (data === 0) {
        res.status(404).send(`Note ${noteId} not found in DB`);
      } else {
        res.status(201).send(`Successfully deleted ${data} records`);
      }
    }).catch((err)=> {
      res.status(500).send('Server error');
    })
  } else {
    res.status(400).send('Bad DELETE request syntax');
  }
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Success - server listening on port ${port}`);
})
