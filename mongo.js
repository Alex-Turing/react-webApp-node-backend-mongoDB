const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://alexander:${password}@cluster0.9dxup.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//     content: "HTML is easy",
//     date: new Date(Date.now()),
//     important: true,
// });

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close();
})