const mongoose = require('mongoose');

mongoose.connect('mongodb://juliandg34:j1a9n91996@cluster0-shard-00-00-owv7k.mongodb.net:27017,cluster0-shard-00-01-owv7k.mongodb.net:27017,cluster0-shard-00-02-owv7k.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));