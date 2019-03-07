const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/electivas-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));