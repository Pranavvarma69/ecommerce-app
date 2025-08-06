const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    orderItems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
            qty:number
        }
    ],
    shippingaddress:{
        address:String,
        city:String,
        postalCode:Number,
        country:String
    },
    paymentmethod:String,
    totalPrice:Number,
    isPaid:{type:Boolean,default:false},
    paidAt:Date,
    isDelivered:{type:Boolean,default:false},
    deliveredAt:Date

},{timestamps:true});
module.exports=mongoose.model('order',orderSchema);