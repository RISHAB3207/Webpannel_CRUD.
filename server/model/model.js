const mongoose =require('mongoose');
var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    
})

const EmpDB=mongoose.model('empdb',schema);

module.exports=EmpDB;