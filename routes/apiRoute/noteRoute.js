const router = require('express').Router(); 
var notes = require('../../db/db.json');
const fs = require('fs');

router.get('/notes', (req, res) => {
    console.log(notes);
    res.json(notes); 
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length + 1;
    var newNote = req.body;
    notes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log(err)
            return;
        }
    });
    res.send(notes);
});

router.delete('/notes/:id', (req, res) => {
    console.log("error");
    let id = req.params.id;
    let newNotes = []
    for (let i = 0; i < notes.length; i++) {
    if (notes[i].id != id) {
        newNotes.push(notes[i])
    }
    }
    notes = newNotes;
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log(err)
            return;
        }
    });
    res.json(notes);
});
module.exports = router;