const mongoose = require('mongoose')
const slugify  = require('slugify')

const Schema = mongoose.Schema

const CourseShema = new Schema({
    name : {
        type: String,
        unique: true,
        required: true
    },
    desc : {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    slug : {
        type:String,
        unique: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
})

CourseShema.pre('validate', function(next){
    this.slug = slugify(this.name,{
        lower:true,
        strict:true
    })
    next()
})

const Course = mongoose.model('Course',CourseShema)
module.exports = Course