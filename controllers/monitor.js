const farmerData=require('../model/farmer')
module.exports={
    getMonitorPage:async(req,res)=>{

        try{
            console.log(req.user.id)
            const farmer_data=await farmerData.find({ userId: req.user.id})
            console.log(farmer_data)
            // const comment=farmer_data[0].comment
            // const persons_list=farmer_data[0].commenting_persons
            res.render('monitor.ejs',{comments:farmer_data})
        }
        catch(error){
            console.log(error)
        }
    }
    
}