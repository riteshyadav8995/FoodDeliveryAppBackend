const mongoose=require('mongoose');
const { applyTimestamps } = require('./userSchema');

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"Product name is required"],
        minlength:[5,"product name must be atleast 5 charaters"],
        trim:true
    },
    description:{
        type:String,
        minlength:[5,"product description must be atleast 5 characters"],

    },
    productImage:{
        type:String,
    },
    price:{
        type:Number,
        required:[true,"product price must be required"],
    },
    category:{
        type:String,
        enum:["veg","non-veg","drinks","sides"],
        default:'veg',
    },
    inStock:{
        type:Boolean,
        required:[true,"In stock status is required"],
        default:true,
    }
},{
    timestamps:true,
});

const Product=mongoose.model("Product",productSchema);

module.exports=Product;
