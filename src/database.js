const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://juliandg34:j1a9n91996@cluster0-owv7k.mongodb.net/test?retryWrites=true', {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));