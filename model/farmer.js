const mongoose=require('mongoose')

const farmerDataSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    commenting_persons:{
        type:String,
        required:true,
    }
}
)

module.exports=mongoose.model('farmerData',farmerDataSchema)