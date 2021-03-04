const mongoose = require('mongoose')

const uri = 'mongodb+srv://admin:admin@cluster0-t5ohc.mongodb.net/auth_db?retryWrites=true&w=majority';

mongoose.connect(uri, function (err) {
    if (err) {
        console.log('Some problem with the connection ' + err)
    }
    else {
        console.log('connected to db')
    }
})

exports.module = mongoose