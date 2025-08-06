const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    catogery:String,
    price:Number,
    countInStock:Number,
    rating:Number,
    numReviews:Number
},{timestamps:true});

module.exports=mongoose.model('product',productSchema);