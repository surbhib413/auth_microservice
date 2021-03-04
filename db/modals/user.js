const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const schema = new mongoose.Schema({
    user_id: { type: String },
    password: { type: String },
    role: { type: String },
    profile_name:{ type:String },
    profile_url:{ type:String }
})

module.exports = mongoose.model('USER', schema)