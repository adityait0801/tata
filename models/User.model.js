const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : { type : String, required : true}, 
    p5_balance : { type : Number, default : 100}, 
    rewards_balance : { type : Number, default : 100 }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel };