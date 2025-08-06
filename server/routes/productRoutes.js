const express=require('express')
const router=express.Router()
const Product=require('../models/product')

router.get('/',async(req,res)=>{
    const products=await Product.find();
    res.json(products)
});

router.get('/:id',async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        res.json({product});
    } else{
        res.status(404).json({message:"Product not found"})
    }

});
module.exports=router;