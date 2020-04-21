const util = require("util");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    read(){
        return readFileAsync("db/db.json", "utf8")
    }

    write(note){
        return writeFileAsync("db/db.json",JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(notes => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes));
            } 
            catch (err) {
                parseNotes = [];
            }
            return parseNotes;
        })

    }

    addNotes(notes) {
        const {title, text} = notes;
        if (!title || !text){
            throw new Err ("fields cannot be blank.")
        }
        const newNote = {
            title, text, id: uuidv4()
        }

        return this.getNotes().then(note => {
            [...note, newNote]
        }).then(updatedNotes => this.write(updatedNotes)).then(()=>newNote)

    }

    removeNote(id) {
        return this.getNotes().then(notes=>notes.filter(note => note.id !== id)).then(filteredNotes => this.write(filteredNotes))

    }
}

module.exports = new Storage ();