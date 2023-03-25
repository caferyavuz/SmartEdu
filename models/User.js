const mongoose = require('mongoose')
const slugify  = require('slugify')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:["student","teacher","admin"],
        default:"student"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

UserSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcrypt.hash(user.password,10,(error,hash) =>{
            user.password = hash
            next()
        })
    }
    next()
})

const User = mongoose.model('User',UserSchema)
module.exports = User